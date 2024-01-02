package com.example.irm2.recursosHumanos.controller;

import com.example.irm2.recursosHumanos.model.Candidatos.Candidatos;
import com.example.irm2.recursosHumanos.model.Entrevistas;
import com.example.irm2.recursosHumanos.service.HomeService;
import com.example.irm2.recursosHumanos.token.TokenMiddleware;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/home")
public class HomeController implements WebMvcConfigurer {

    private final HomeService homeService;
    private final TokenMiddleware tokenMiddleware;

    public HomeController(@Qualifier("homeService") HomeService homeService,
                          TokenMiddleware tokenMiddleware) {
        this.homeService = homeService;
        this.tokenMiddleware = tokenMiddleware;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenMiddleware).addPathPatterns("/home/**");
    }

    /*----------------------------------GETS------------------------------------------*/
    @GetMapping("/last10Postulados")
    public List<Candidatos> getCandidatosaActivosPostulados() {
        return homeService.findLast10CandidatosaActivosPostulados();
    }

    @GetMapping("/last10Contratados")
    public List<Candidatos> findLast10Contratados() {
        return homeService.findLast10Contratados();
    }

    @GetMapping("/last10EnEspera")
    public List<Candidatos> findLast10EnEspera() {
        return homeService.findLast10EnEspera();
    }

    @GetMapping("/last10Rechazados")
    public List<Candidatos> findLast10Rechazados() {
        return homeService.findLast10Rechazados();
    }

    @GetMapping("/allEntrevistas")
    public List<Entrevistas> findAllEntrevistas() {
        return homeService.findAllEntrevistas();
    }
    @GetMapping("/entrevistas/descripcion/{id}")
    public String DescripcionEId(@PathVariable("id")Long id){
        return homeService.DescripcionEId(id);
    }
    @GetMapping("/entrevistas/filter/{idReclutadora}")
    public List<Entrevistas> findEntrevistasxReclutadora(@PathVariable("idReclutadora")Long idReclutadora){return homeService.findEntrevistasXReclutadora(idReclutadora);}

    @GetMapping("/conteoCards")
    public Map<String, Integer> findCountCandidatos(){return homeService.findCountCandidatos();}
    @PostMapping("/entrevistas/add")
    public Entrevistas agregarEntrevista(@RequestBody Entrevistas entrevista) {
        return homeService.agregarEntrevista(entrevista);
    }
    @PutMapping("/entrevistas/update/{id}")
    public Optional<Entrevistas> updateEntrevista( @PathVariable("id")Long id, @RequestBody Entrevistas entrevistas) {
        return homeService.updateEntrevista(entrevistas,id);
    }
}
