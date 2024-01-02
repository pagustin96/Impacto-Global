package com.example.irm2.recursosHumanos.controller.Others;

import com.example.irm2.recursosHumanos.repository.CandidatosRepository;
import com.example.irm2.recursosHumanos.token.TokenMiddleware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/function")
public class FuncionesBaseFront implements WebMvcConfigurer {
    private final CandidatosRepository candidatosRepository;
    private final TokenMiddleware tokenMiddleware;
    @Autowired
    public FuncionesBaseFront(CandidatosRepository candidatosRepository, TokenMiddleware tokenMiddleware) {
        this.candidatosRepository = candidatosRepository;
        this.tokenMiddleware = tokenMiddleware;
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenMiddleware).addPathPatterns("/function/**");
    }
    @GetMapping("/idiomas")
    public ArrayList findAllIdiomas(){return candidatosRepository.findAllIdiomas();}
    @GetMapping("/estados")
    public ArrayList findAllEstados(){return candidatosRepository.findAllEstados();}
    @GetMapping("/clientes")
    public ArrayList findAllClientes(){return candidatosRepository.findAllClientes();}
    @GetMapping("/reclutadoras")
    public ArrayList findAllReclutadoras(){return candidatosRepository.findAllReclutadoras();}
    @GetMapping("/provincias")
    public ArrayList findAllProvincias(){return candidatosRepository.findAllProvincias();}
    @GetMapping("/paises")
    public ArrayList findAllPaises(){return candidatosRepository.findAllPaises();}
    @GetMapping("/companias")
    public ArrayList finAllCompanias(){return candidatosRepository.findAllCompanias();}
}
