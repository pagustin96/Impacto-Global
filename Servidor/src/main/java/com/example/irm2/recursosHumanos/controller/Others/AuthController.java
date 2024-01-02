package com.example.irm2.recursosHumanos.controller.Others;

import com.example.irm2.recursosHumanos.model.Reclutadoras;
import com.example.irm2.recursosHumanos.model.Usuarios;
import com.example.irm2.recursosHumanos.repository.UsuariosRepository;
import com.example.irm2.recursosHumanos.service.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UsuariosRepository userRepository; // Asegúrate de tener tu repositorio de usuarios
    private final UsuarioService usuarioService;

    public AuthController(@Qualifier("usuarioService") UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Value("${ACCESS_TOKEN_SECRET}")
    private String ACCESS_TOKEN_SECRET;
    @Value("${REFRESH_TOKEN_SECRET}")
    private String REFRESH_TOKEN_SECRET;


    @GetMapping("/logout")
    public ResponseEntity<Map<String, String>> handleLogout(HttpServletResponse response) {
        // Aquí realizas las acciones necesarias para el logout

        // Elimina la cookie del token
        Cookie cookie = new Cookie("access_token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(0); // Expira inmediatamente
        cookie.setPath("/");
        response.addCookie(cookie);

        Cookie cookie2 = new Cookie("refresh_token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(0); // Expira inmediatamente
        cookie.setPath("/");
        response.addCookie(cookie2);

        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Cierre de sesión exitoso");
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/login")
    public Map<String, String> handleLogin(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
        String email = credentials.get("email");
        String password = credentials.get("pwd");

        if (email == null || password == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return null;
        }

        Usuarios foundUser = userRepository.findByEmail(email);
        if (foundUser == null || !BCrypt.checkpw(password, foundUser.getPwd())) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "Usuario o contraseña incorrectos");
            return responseBody;
        }
        if (!foundUser.getActivo()) {
            response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("message", "Usuario inexistente o inactivo");
            return responseBody;
        }

        String accessToken = createToken(foundUser.getId(), email); // Pasar el correo electrónico
        addTokenCookie(response, accessToken);
        String refreshToken = createRefreshToken(foundUser.getId(), email);
        addRefreshTokenCookie(response, refreshToken);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Inicio de sesión exitoso");
        responseBody.put("access_token", accessToken);
        responseBody.put("refresh_token", refreshToken);
        responseBody.put("id_user", String.valueOf(foundUser.getId()));
        return responseBody;
    }

    private String createToken(Long userId, String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 30 * 60 * 1000); // 30min
        Usuarios founduser = usuarioService.findUsuarioByEmail(email);
        String role = founduser.getRol().toLowerCase();

        return Jwts.builder()
                .setSubject(Long.toString(userId))
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, ACCESS_TOKEN_SECRET)
                .compact();
    }

    private String createRefreshToken(Long userId, String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 60 * 60 * 1000); // 60 minutos de validez

        Usuarios founduser = usuarioService.findUsuarioByEmail(email);
        String role = founduser.getRol().toLowerCase();

        return Jwts.builder()
                .setSubject(Long.toString(userId))
                .claim("role", role) // Agregar el rol al claim del token
                .claim("userId", userId)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, REFRESH_TOKEN_SECRET)
                .compact();
    }


    private void addTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("access_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(30 * 60); // 30 minutos en segundos
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    private void addRefreshTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("refresh_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(60 * 60); // 60 minutos en segundos
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    @PostMapping("/register")
    public ResponseEntity addUsuario(@RequestBody Map<Object, Object> requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        Usuarios usuario = objectMapper.convertValue(requestBody.get("usuario"), Usuarios.class);
        Reclutadoras reclutadora = objectMapper.convertValue(requestBody.get("reclutadora"), Reclutadoras.class);

        return usuarioService.addUsuario(usuario, reclutadora);
    }

    @PostMapping("/refresh")
    public Map<String, String> refreshToken(@CookieValue(name = "refresh_token", required = false) String refreshToken, HttpServletResponse response) throws IOException {
        if (refreshToken == null) {
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "El token es incorrecto");
            return null;
        } else {
            Claims claims = Jwts.parser()
                    .setSigningKey(REFRESH_TOKEN_SECRET)
                    .parseClaimsJws(refreshToken)
                    .getBody();
            // Obtiene el usuario asociado al refresh token
            Long Iduser = claims.get("userId", Long.class);
            Usuarios founduser = usuarioService.findUsuarioById(Iduser).get();
            String email = founduser.getEmail();

            // Genera un nuevo access token
            String newAccessToken = createToken(Iduser, email);
            addTokenCookie(response, newAccessToken);

            // Devuelve el nuevo access token
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("access_token", newAccessToken);
            return responseBody;
        }
    }

    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.getWriter().write(message);
    }

}




