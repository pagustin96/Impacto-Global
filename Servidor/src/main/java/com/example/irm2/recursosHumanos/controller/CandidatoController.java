package com.example.irm2.recursosHumanos.controller;

import com.example.irm2.recursosHumanos.model.Candidatos.Candidatos;
import com.example.irm2.recursosHumanos.model.CiudadProvinciaDireccion;
import com.example.irm2.recursosHumanos.model.ContratoExterior;
import com.example.irm2.recursosHumanos.model.IdiomasCandidatos;
import com.example.irm2.recursosHumanos.model.Vacantes.Vacantes;
import com.example.irm2.recursosHumanos.repository.CandidatosRepository;
import com.example.irm2.recursosHumanos.service.CandidatoService;
import com.example.irm2.recursosHumanos.token.TokenMiddleware;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import javax.persistence.criteria.Predicate;
import java.io.IOException;
import java.util.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/candidatos")
public class CandidatoController implements WebMvcConfigurer {

    private final CandidatoService candidatoService;
    private final TokenMiddleware tokenMiddleware; // Agrega esta línea
    private final CandidatosRepository candidatosRepository;

    @Autowired
    public CandidatoController(
            @Qualifier("candidatoService") CandidatoService candidatoService,
            TokenMiddleware tokenMiddleware, CandidatosRepository candidatoRepository) { // Agrega TokenMiddleware como parámetro
        this.candidatoService = candidatoService;
        this.tokenMiddleware = tokenMiddleware; // Inyecta el middleware
        this.candidatosRepository = candidatoRepository;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenMiddleware).addPathPatterns("/candidatos/**");
    }
    /*----------------------------------GETS------------------------------------------*/

    @GetMapping("/all")
    public List<Candidatos> findAllCandidato() {
        return candidatosRepository.findAllCandidatosXFecha();
    }

    @GetMapping("/allA")
    public List<Candidatos> findAllCandidatoA() {
        return candidatoService.findAllCandidatosA();
    }

    @GetMapping("/allB")
    public List<Candidatos> findAllCandidatoB() {
        return candidatoService.findAllCandidatosB();
    }

    @GetMapping(path = "/id/{dni}/{id_pais}")
    public Optional<Candidatos> getUserById(@PathVariable("dni") Integer dni,@PathVariable("id_pais") Long id_pais){
        return candidatoService.findCandidatoById(dni,id_pais);
    }
    @GetMapping("/idiomas/{dni}/{id_pais}")
    public List findIdiomaDeCandidato(@PathVariable("dni") Integer dni,@PathVariable("id_pais") Long id_pais){
        return candidatosRepository.findIdioma(dni, id_pais);
    }
    @GetMapping("/curriculum/{idPais}/{dni}")
    public ResponseEntity<byte[]> obtenerCurriculum(@PathVariable Long idPais, @PathVariable Integer dni) {
        byte[] curriculumPdf = candidatoService.obtenerCurriculum(idPais, dni);

        if (curriculumPdf != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "curriculum.pdf"); // Cambia el nombre del archivo según tu necesidad
            return new ResponseEntity<>(curriculumPdf, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
   /* @GetMapping("/postulaciones/{dni}/{id_pais}")
    public ResponseEntity<List<?>> obtenerPostulaciones(@PathVariable("id_pais") Long idPais, @PathVariable("dni") Integer dni) {
        return candidatoService.obtenerPostulaciones(dni,idPais);
    }*/

    /*----------------------------------POSTS------------------------------------------*/
    @PostMapping("/add/{id_vacante}")
    public ResponseEntity addCandidato(@RequestBody Map<Object, Object> requestBody, @PathVariable("id_vacante") Long idVacante) {
        ObjectMapper objectMapper = new ObjectMapper();

        // Mapea el objeto "candidato" del mapa al tipo Candidatos
        Candidatos candidato = objectMapper.convertValue(requestBody.get("candidato"), Candidatos.class);

        // Mapea el objeto "cpd" del mapa al tipo CiudadProvinciaDireccion
        CiudadProvinciaDireccion cpd = objectMapper.convertValue(requestBody.get("cpd"), CiudadProvinciaDireccion.class);
        return candidatoService.addCandidato(candidato, idVacante, cpd);
    }

    @PostMapping("/add/contrato/{dni}/{id_pais}")
    public ResponseEntity addCandidatoExterior(@RequestBody ContratoExterior contrato, @PathVariable("dni") Integer dni, @PathVariable("id_pais") Long id_pais){
        return candidatoService.addCandidatoExterior(contrato, dni, id_pais);
    }

    @PostMapping("/add/postulacion/{dni}/{id_pais}/{id_vacante}")
    public ResponseEntity nuevaPostulacion(@PathVariable("dni") Integer dni, @PathVariable("id_pais") Long id_pais, @PathVariable("id_vacante") Long id_vacante){
        return candidatoService.agregarPostulacionCandidato(dni, id_pais, id_vacante, false);
    }

    @PostMapping("/add/idiomas")
    public ResponseEntity addIdiomaCandidato(@RequestBody ArrayList<IdiomasCandidatos> idiomasCandidatos) {
        // Crear una lista para almacenar las respuestas de cada llamada a la función
        List<ResponseEntity> responses = new ArrayList<>();

        // Recorrer el array y llamar a la función para cada objeto
        for (IdiomasCandidatos idiomaCandidato : idiomasCandidatos) {
            ResponseEntity response = candidatoService.addIdiomaCandidato(idiomaCandidato);
            responses.add(response);
        }
        return ResponseEntity.ok("Llamadas a addIdiomaCandidato completadas");
    }
    @PostMapping("/curriculum/add")
    public ResponseEntity<String> cargarCv(@RequestParam("file") MultipartFile file,
                                           @RequestParam("id_pais") Long idPais,
                                           @RequestParam("dni") Integer dni) {
        try {
            byte[] cvBytes = file.getBytes();
            return candidatoService.guardarCandidatoConCV(idPais, dni, cvBytes);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al cargar el curriculum.");
        }
    }

    /*----------------------------------DELETES------------------------------------------*/
    @PutMapping("/delete/{dni}/{id_pais}")
    public ResponseEntity deleteCandidatoById(@PathVariable("dni") Integer dni, @PathVariable("id_pais") Long id_pais){
        return candidatoService.deleteCandidato(dni, id_pais);
    }
    /*----------------------------------PUTS------------------------------------------*/
    @PutMapping("/update/{dni}/{id_pais}")
    public Optional<Candidatos> updateCandidato(@PathVariable("dni")Integer dni,@PathVariable("id_pais")Long id_pais, @RequestBody Candidatos candidato) {
            return candidatoService.updateCandidato(candidato, dni, id_pais);
    }
    @PutMapping("/update/direccion/{dni}/{id_pais}")
    public ResponseEntity updateCandidato(@PathVariable("dni")Integer dni,@PathVariable("id_pais")Long id_pais,@RequestBody CiudadProvinciaDireccion cpd){
        return candidatoService.updateDireccionCandidato(dni,id_pais,cpd);
    }
    @PutMapping("/update/estado/{dni}/{id_pais}/{id_postulacion}/{id_new_estado}")
    public ResponseEntity<?> updateEstadoCandidato
            (@PathVariable("dni")Integer dni,
             @PathVariable("id_pais")Long idPais,
             @PathVariable("id_postulacion") Long idPostulacion,
             @PathVariable("id_new_estado") Long idNewEstado,
             @RequestBody String justificacion){
        return candidatoService.updateEstadoCandidato(dni,idPais,idPostulacion,idNewEstado,justificacion);
    }

    /*-------------------------------------FILTROS----------------------------------------*/
  @GetMapping("/filter")
    public List<Candidatos> filterCandidato(
            @RequestParam(required = false) Long id_cliente,
            @RequestParam(required = false) Long id_reclutadora,
            @RequestParam(required = false) String perfil,
            @RequestParam(required = false) String seniority,
            @RequestParam(required = false) Long id_idioma,
            @RequestParam(required = false) String nivel,
            @RequestParam(required = false) Long id_estado
    ) {
        Candidatos candidato = new Candidatos();
        candidato.setId_cliente(id_cliente);
        candidato.setId_reclutadora(id_reclutadora);
        candidato.setPerfil(perfil);
        candidato.setSeniority(seniority);

        return candidatoService.filterCandidato(candidato, id_idioma, nivel, id_estado);
    }



}
