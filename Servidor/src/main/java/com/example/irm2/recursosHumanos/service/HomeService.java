package com.example.irm2.recursosHumanos.service;

import com.example.irm2.recursosHumanos.exception.EntrevistaNotFoundException;
import com.example.irm2.recursosHumanos.model.Candidatos.Candidatos;
import com.example.irm2.recursosHumanos.model.Entrevistas;
import com.example.irm2.recursosHumanos.repository.EntrevistasRepository;
import com.example.irm2.recursosHumanos.repository.CandidatosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service("homeService")
@Transactional
public class HomeService {
    private final CandidatosRepository candidatosRepository;
    private final EntrevistasRepository entrevistasRepository;

    @Autowired
    public HomeService(CandidatosRepository candidatosRepository, EntrevistasRepository entrevistasRepository) {
        this.candidatosRepository = candidatosRepository;
        this.entrevistasRepository = entrevistasRepository;
    }

    /* ------------------------------ FIND ----------------------------- */
    public List<Candidatos> findLast10CandidatosaActivosPostulados() {
        Pageable pageable = PageRequest.of(0, 10);
        return candidatosRepository.findCandidatosaActivosConPostulacion(pageable);
    }

    public List<Candidatos> findLast10Contratados() {
        Pageable pageable = PageRequest.of(0, 10);
        return candidatosRepository.findCandidatosContratados(pageable);
    }

    public List<Candidatos> findLast10EnEspera() {
        Pageable pageable = PageRequest.of(0, 10);
        return candidatosRepository.findCandidatosEnEspera(pageable);
    }

    public List<Candidatos> findLast10Rechazados() {
        Pageable pageable = PageRequest.of(0, 10);
        return candidatosRepository.findCandidatosRechazados(pageable);
    }

    public String DescripcionEId(Long id) {
        return entrevistasRepository.findDescripcionById(id);
    }
    public List<Entrevistas> findAllEntrevistas() {
        return entrevistasRepository.findAll();
    }

    public Entrevistas agregarEntrevista(Entrevistas entrevista) {
        // Aquí puedes agregar lógica adicional si es necesario antes de guardar la entrevista en la base de datos
        return entrevistasRepository.save(entrevista);
    }

    public Optional<Entrevistas> updateEntrevista(Entrevistas NewEntrevista, Long id) {
            Optional<Entrevistas> updateEntrevista = entrevistasRepository.findById(id);
            if ((updateEntrevista.isEmpty())) throw new EntrevistaNotFoundException(id);
            else {
                return updateEntrevista.map(entrevista -> {
                    entrevista.setDescripcion(NewEntrevista.getDescripcion());
                    entrevista.setFecha(NewEntrevista.getFecha());
                    entrevista.setDniCandidato(NewEntrevista.getDniCandidato());
                    entrevista.setIdVacante(NewEntrevista.getIdVacante());
                    entrevista.setTecnologia(NewEntrevista.getTecnologia());
                    entrevista.setSalario(NewEntrevista.getSalario());
                    entrevista.setIdPaisCandidato(NewEntrevista.getIdPaisCandidato());
                    return entrevistasRepository.save(entrevista);

                });
            }
    }

    public List<Entrevistas> findEntrevistasXReclutadora(Long idReclutadora) {
        return entrevistasRepository.findEntrevistasxReclutadora(idReclutadora);
    }

    public Map<String, Integer> findCountCandidatos() {
        Integer postulados = candidatosRepository.countPostulacion();
        Integer enEspera = candidatosRepository.countEnEspera();
        Integer contratados = candidatosRepository.countContratados();
        Integer rechazados = candidatosRepository.countRechazados();

        // Crear un mapa para almacenar los valores
        Map<String, Integer> resultados = new HashMap<>();
        resultados.put("postulado", postulados);
        resultados.put("en_espera", enEspera);
        resultados.put("contratados", contratados);
        resultados.put("rechazados", rechazados);

        return resultados;
    }

}


