package com.example.irm2.recursosHumanos.controller.Others;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/")
public class ErrorController {

    @RequestMapping("/**")
    public ResponseEntity<String> paginaError() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Página no encontrada");
    }
}
