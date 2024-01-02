package com.example.irm2.recursosHumanos.controller;

import com.example.irm2.recursosHumanos.model.Candidatos.Candidatos;
import com.example.irm2.recursosHumanos.model.Vacantes.VacanteClienteDTO;
import com.example.irm2.recursosHumanos.model.Vacantes.VacanteCompaniaDTO;
import com.example.irm2.recursosHumanos.model.Vacantes.Vacantes;
import com.example.irm2.recursosHumanos.service.CandidatoService;
import com.example.irm2.recursosHumanos.service.VacanteService;
import com.example.irm2.recursosHumanos.token.TokenMiddleware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/vacantes")
public class VacanteController implements WebMvcConfigurer {

    private final VacanteService vacanteService;
    private final TokenMiddleware tokenMiddleware;
    private final CandidatoService candidatoService;


    @Autowired
    public VacanteController(@Qualifier("vacanteService") VacanteService vacanteService,
                             TokenMiddleware tokenMiddleware, CandidatoService candidatoService) {
        this.vacanteService = vacanteService;
        this.tokenMiddleware = tokenMiddleware;
        this.candidatoService = candidatoService;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenMiddleware).addPathPatterns("/vacantes/**");
    }

    /*----------------------------------GETS------------------------------------------*/
    @GetMapping("/id_cliente/{id_cliente}")
    public List<Vacantes> findVacanteByIdCliente(@PathVariable("id_cliente")Long id_cliente){
        return vacanteService.findVacanteByIdCliente(id_cliente);
    }
    @GetMapping("/all")
    public List<Vacantes> findAllVacantes() {
        return vacanteService.findAllVacantes();
    }

    @GetMapping("/allA")
    public List<Vacantes> findAllVacanteActives() {
        return vacanteService.findAllVacantesA();
    }
    @GetMapping("/allC")
    public List<Vacantes> findAllVacanteC() {
        return vacanteService.findAllVacantesC();
    }
    @GetMapping("/allF")
    public List<Vacantes> findAllVacanteF() {
        return vacanteService.findAllVacantesF();
    }
    @GetMapping("/urgenciaAlta")
    public List<Vacantes> findAllVacantesUAlta(){return vacanteService.findAllVacantesUAlta();}
    @GetMapping("/justificacion/{id}")
    public ResponseEntity<String> findJustificacionVacante(@PathVariable("id")Long id) {
        return vacanteService.findJustificacionEstado(id);}
    @GetMapping("/allCandidatos/{id}")
    public List<Candidatos> findCandidatosXVacante(@PathVariable("id")Long id){
        return vacanteService.findCandidatosXVacante(id);
    }
    @GetMapping("/{id}")
    public ResponseEntity findById(@PathVariable("id") Long id){
        return vacanteService.findById(id);
    }

    /*----------------------------------POSTS------------------------------------------*/
    @PostMapping("/add")  //si el front verifica que hay idCliente entonces viene pa esta ruta
    public ResponseEntity addVacanteLocal(@RequestBody VacanteClienteDTO vacanteClienteDTO){
        return vacanteService.addVacanteLocal(vacanteClienteDTO);
    }

    @PostMapping("/add/compania") //pero si ve que no tiene idCliente
    public ResponseEntity addVacanteExterior(@RequestBody VacanteCompaniaDTO vacanteCompaniaDTO ) {
        return vacanteService.addVacanteConConpania(vacanteCompaniaDTO);
    }

    @PostMapping("/add/candidato/{dni_candidato}/{id_pais}/{id_vacante}")
    public ResponseEntity addCandidatoVacante(@PathVariable("dni_candidato")Integer dni,@PathVariable("id_pais")Long idPais, @PathVariable("id_vacante")Long idVacante){
        return candidatoService.agregarPostulacionCandidato(dni,idPais,idVacante,false);
    }

    /*----------------------------------DELETES------------------------------------------*/

    /*----------------------------------PUTS------------------------------------------*/
    @PutMapping("/update/{id}")
    public Optional<Vacantes> updateVacante(@PathVariable("id")Long id, @RequestBody Vacantes vacantes) {
            return vacanteService.updateVacante(vacantes, id);
    }
    @PutMapping("/cancelar/{id}")
    public ResponseEntity cancelarVacante(@PathVariable("id")Long id, @RequestBody String justificacion){
        return vacanteService.cancelarVacante(id, justificacion);
    }

    /*----------------------------------FILTROS------------------------------------------*/
    @GetMapping("/filter")
    public List<Vacantes> filterVacante(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Long id_idioma,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) Long id_pais,
            @RequestParam(required = false) Long id_cliente,
            @RequestParam(required = false) Integer cantidad,
            @RequestParam(required = false) Integer rate,
            @RequestParam(required = false) String seniority,
            @RequestParam(required = false) String urgencia
    ) {
        Vacantes vacante = new Vacantes();
        vacante.setNombre(nombre);
        vacante.setIdIdioma(id_idioma);
        vacante.setSkills(skills);
        vacante.setIdCliente(id_cliente);
        vacante.setCantidad(cantidad);
        vacante.setRate(rate);
        vacante.setSeniority(seniority);
        vacante.setUrgencia(urgencia.toLowerCase());
        return vacanteService.filterVacante(vacante);
    }
}
