package com.example.irm2.recursosHumanos.controller;
import com.example.irm2.recursosHumanos.model.Usuarios;
import com.example.irm2.recursosHumanos.token.TokenMiddleware;
import org.springframework.http.ResponseEntity;
import com.example.irm2.recursosHumanos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/usuario")
public class UsuarioController implements WebMvcConfigurer {

    private final UsuarioService usuarioService;
    private final TokenMiddleware tokenMiddleware;

    @Autowired
    public UsuarioController(@Qualifier("usuarioService") UsuarioService usuarioService, TokenMiddleware tokenMiddleware) {
        this.usuarioService = usuarioService;
        this.tokenMiddleware = tokenMiddleware;
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenMiddleware).addPathPatterns("/usuario/**");
    }
    /*----------------------------------GETS------------------------------------------*/
    @GetMapping("/{id}")
    public Optional<Usuarios> findUsuarioById(@PathVariable("id")Long id){
        return usuarioService.findUsuarioById(id);
    }
    @GetMapping("/verify-email/{email}")
    public ResponseEntity<Usuarios> verifyEmailExists(@PathVariable("email") String email) {
        return usuarioService.verifyEmail(email);
    }
    /*----------------------------------PUTS------------------------------------------*/
    @PutMapping("/update/{id}")
    public Optional<Usuarios> updateUsuario(@PathVariable("id")Long id, @RequestBody Usuarios usuarios) {
            return usuarioService.updateUsuario(usuarios, id);
    }
    /*------------------------------------ADMIN-------------------------------------*/
    @GetMapping("/admin/all")
    public List<Usuarios> findAllUsuarios() {
        return usuarioService.findAllUsuarios();
    }
    @GetMapping("/admin/allA")
    public List<Usuarios> findAllUsuarioActives() {
        return usuarioService.findAllUsuariosA();
    }

    @GetMapping("/admin/allB")
    public List<Usuarios> findAllUsuarioB() {
        return usuarioService.findAllUsuariosB();
    }
    @PutMapping("/admin/update/{id}")
    public Optional<Usuarios> updateUsuarioAdmin(@PathVariable("id")Long id, @RequestBody Usuarios usuarios) {
        return usuarioService.updateUsuarioAdmin(usuarios, id);
    }
    @PutMapping("/admin/delete/{id}")
    public ResponseEntity deleteUsuario(@PathVariable("id")Long id){
        return usuarioService.deleteUsuario(id);
    }
}
