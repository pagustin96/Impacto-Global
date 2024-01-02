package com.example.irm2.recursosHumanos.controller.Others;

import com.example.irm2.recursosHumanos.model.Usuarios;
import com.example.irm2.recursosHumanos.repository.UsuariosRepository;
import com.example.irm2.recursosHumanos.service.EmailSender.EmailSenderService;
import com.example.irm2.recursosHumanos.service.UsuarioService;
import com.example.irm2.recursosHumanos.token.TokenForGotpwd;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ForgetCController implements WebMvcConfigurer {

    @Autowired
    private UsuariosRepository usuarioRepository; // Asegúrate de tener tu repositorio de usuarios
    private final UsuarioService usuarioService;
    private final EmailSenderService emailSenderService;
    private final TokenForGotpwd tokenForGotpwd;
    private final AuthController authController;


    public ForgetCController(@Qualifier("usuarioService") UsuarioService usuarioService,
                             EmailSenderService emailSenderService,
                             TokenForGotpwd tokenForGotpwd,AuthController authController) {
        this.usuarioService = usuarioService;
        this.emailSenderService= emailSenderService;
        this.tokenForGotpwd= tokenForGotpwd;
        this.authController = authController;
    }

    @Value("${FORGOT_TOKEN_SECRET}")
    private String FORGOT_TOKEN_SECRET;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenForGotpwd).addPathPatterns("/cambioPwd/**");
    }
     @PutMapping("/cambioPwd")
    public ResponseEntity CambioC(@RequestBody Usuarios usuarios, HttpServletResponse response, HttpServletRequest request){
        String pwd = usuarios.getPwd();
        Cookie[] cookies = request.getCookies();
        String userToken = null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("forgot_token")) {
                userToken = cookie.getValue();
                break;
            }
        }
        Long id = getUserIdFromTokenForget(userToken);
        if(usuarioService.updatePwd(id,pwd)) {
            Cookie cookie = new Cookie("forgot_token", null);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setMaxAge(0); // Expira inmediatamente
            cookie.setPath("/");
            response.addCookie(cookie);

            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "Contraseña cambiada con exito");
            return ResponseEntity.ok(responseBody);
        }else {
            return ResponseEntity.badRequest().body("Error");
        }

    }
    @PostMapping("/olvidoPwd")
    public Map<String, String> OlvidoC(@RequestBody Usuarios usuario, HttpServletResponse response) {
        String email = usuario.getEmail();

        if (email == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return null;
        }

        Usuarios foundUser = usuarioService.findUsuarioByEmail(email);
        if (foundUser == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "email no encontrado");
            return responseBody;
        }
        if (!foundUser.getActivo()) {
            response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "Usuario inexistente o inactivo");
            return responseBody;
        }

        String forgetToken = createTokenForget(foundUser.getId()); // Pasar el correo electrónico
        addTokenCookieForget(response, forgetToken);
        String newPwd = RandomStringUtils.randomAlphanumeric(6);
        emailSenderService.sendEmail(usuario.getEmail(), "CAMBIO DE CONTRASEÑA", "contraseña nueva: "+ newPwd +"\n TENES QUE CAMBIARLA CUANDO INGRESES");
        usuarioService.updatePwd(foundUser.getId(),newPwd);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Mail enviado correctamente");
        responseBody.put("forgot_token", forgetToken);
        responseBody.put("id_user", String.valueOf(foundUser.getId()));
        return responseBody;
    }
    public String createTokenForget (Long userId){
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutos de validez


        return Jwts.builder()
                .setSubject(Long.toString(userId))
                .claim("userId", userId)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, FORGOT_TOKEN_SECRET)
                .compact();
    }
    public void addTokenCookieForget (HttpServletResponse response, String token){
        Cookie cookie = new Cookie("forgot_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Cambia a false si no estás utilizando HTTPS
        cookie.setMaxAge(5 * 60); // 5 minutos en segundos
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    public Long getUserIdFromTokenForget (String token){
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(FORGOT_TOKEN_SECRET)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // Obtiene el ID del usuario desde la claim personalizada "userId"
            return Long.parseLong(claims.get("userId").toString());
        } catch (Exception e) {
            return null; // El token es inválido o no contiene la claim esperada
        }
    }

}
