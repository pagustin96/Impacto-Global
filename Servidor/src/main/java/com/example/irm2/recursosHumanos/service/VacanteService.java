package com.example.irm2.recursosHumanos.service;

import com.example.irm2.recursosHumanos.exception.VacanteNotFoundException;
import com.example.irm2.recursosHumanos.model.Candidatos.Candidatos;
import com.example.irm2.recursosHumanos.model.Clientes;
import com.example.irm2.recursosHumanos.model.Companias;
import com.example.irm2.recursosHumanos.model.Vacantes.VacanteClienteDTO;
import com.example.irm2.recursosHumanos.model.Vacantes.VacanteCompaniaDTO;
import com.example.irm2.recursosHumanos.model.Vacantes.Vacantes;
import com.example.irm2.recursosHumanos.repository.CandidatosRepository;
import com.example.irm2.recursosHumanos.repository.VacantesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("vacanteService")
@Transactional
public class VacanteService {

    private final VacantesRepository vacanteRepository;
    private final CandidatosRepository candidatoRepository;

    @Autowired
    public VacanteService(VacantesRepository vacantesRepository, CandidatosRepository candidatoRepository) {
        this.vacanteRepository = vacantesRepository;
        this.candidatoRepository = candidatoRepository;
    }

    /* ------------------------------ FIND ----------------------------- */
    public List<Vacantes> findAllVacantes(){

        return vacanteRepository.findAll();
    }
    public List<Vacantes> findAllVacantesA(){
        return vacanteRepository.findVacanteXEstado(0L);
    }
    public List<Vacantes> findAllVacantesC(){
        return vacanteRepository.findVacanteXEstado(1L);
    }
    public List<Vacantes> findAllVacantesF(){
        return vacanteRepository.findVacanteXEstado(2L);
    }
    public List<Vacantes> findVacanteByIdCliente(Long idCliente) {
        return vacanteRepository.findByIdCliente(idCliente);
    }
    public ResponseEntity findById(Long id) {
        Optional<Vacantes> opticalVacantes = vacanteRepository.findById(id);
        if (opticalVacantes.isPresent()) {
            return ResponseEntity.ok(opticalVacantes.get());
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro una vacantes con ese id");
        }

    }

    public ResponseEntity<String> findJustificacionEstado(Long id) {
        try {
            Optional<Vacantes> vacanteBuscada = vacanteRepository.findById(id);
            if (vacanteBuscada.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró la vacante con ese id");
            }
            return ResponseEntity.ok(vacanteRepository.findJustificacionEstado(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e);
        }

    }

    public List<Candidatos> findCandidatosXVacante(Long idVacante){
        return candidatoRepository.findCandidatosXVacante(idVacante);
    }
    public List<Vacantes> filterVacante(Vacantes vacantes) {
        List<Vacantes> allVacantes = vacanteRepository.findAll();
        return allVacantes.stream()
                .filter(v -> (vacantes.getNombre() == null || Objects.equals(v.getNombre(), vacantes.getNombre()))
                        && (vacantes.getIdIdioma() == null || Objects.equals(v.getIdIdioma(), vacantes.getIdIdioma()))
                        && (vacantes.getSkills() == null || Objects.equals(v.getSkills(), vacantes.getSkills()))
                        && (vacantes.getIdCliente() == null || Objects.equals(v.getIdCliente(), vacantes.getIdCliente()))
                        && (vacantes.getCantidad() == null || v.getCantidad()<=vacantes.getCantidad())
                        && (vacantes.getRate() == null || Objects.equals(v.getRate(), vacantes.getRate()) || Objects.equals(v.getRate(),vacantes.getRate()-1) || Objects.equals(v.getRate(),vacantes.getRate()+1))
                        && (vacantes.getSeniority() == null || Objects.equals(v.getSeniority(), vacantes.getSeniority()))
                        && (vacantes.getUrgencia() == null || Objects.equals(v.getUrgencia(), vacantes.getUrgencia())))
                .collect(Collectors.toList());
    }

    /* ------------------------------ CREATE ----------------------------- */
    public ResponseEntity addVacanteLocal(VacanteClienteDTO vacanteClienteDTO){
        Vacantes vacante = vacanteClienteDTO.getVacante();
        Clientes cliente = vacanteClienteDTO.getCliente();

        try {
            vacanteRepository.p_insertar_nuevo_cliente(vacante.getNombre(), vacante.getSeniority(),
                    vacante.getCantidad(), vacante.getRate(), vacante.getComienzo(), vacante.getCierre(),
                    vacante.getSkills(), vacante.getComputadora(), vacante.getIdIdioma(), vacante.getModulo(),
                    cliente.getNombre());
            return ResponseEntity.ok("Vacante guardada con éxito");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e);
        }
    }

    public ResponseEntity addVacanteConConpania(VacanteCompaniaDTO vacanteCompaniaDTO) {
        Companias compania = vacanteCompaniaDTO.getCompania();
        Vacantes vacante = vacanteCompaniaDTO.getVacante();

        vacanteRepository.p_insertar_nueva_compania(vacante.getNombre(), vacante.getSeniority(),
                vacante.getCantidad(), vacante.getRate(), vacante.getComienzo(), vacante.getCierre(),
                vacante.getSkills(), vacante.getComputadora(), vacante.getIdIdioma(), vacante.getModulo(),
                compania.getNombre(), compania.getIdPais());
        return ResponseEntity.ok("Vacante creada con exito");
    }

    /* ------------------------------ CANCELAR ----------------------------- */
    public ResponseEntity cancelarVacante(Long id, String justificacion) {
        try {
            Optional<Vacantes> vacanteBuscada = vacanteRepository.findById(id);
            Vacantes vacante = vacanteBuscada.get();
            System.out.println(vacante);
            if (vacanteBuscada.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro la vacante con ese id");
            } else {
                if(vacanteRepository.findEstadoVacante(id)==0) {
                    vacanteRepository.update_estado_cancelado(id, justificacion);
                    return ResponseEntity.ok("Vacante cancelada con éxito!");
                }else{
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("La vacante ya fue cancelada o finalizada");
                }
            }
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e);
        }
    }
    /* ------------------------------ UPDATE ----------------------------- */
    public Optional<Vacantes> updateVacante(Vacantes newVacantes, Long id) {
        Optional<Vacantes> updatedVacante = vacanteRepository.findById(id);
        if ((updatedVacante.isEmpty())) throw new VacanteNotFoundException(newVacantes.getIdCliente());
        else {
            return updatedVacante.map(vacantes -> {
                vacantes.setNombre(newVacantes.getNombre());
                vacantes.setSeniority(newVacantes.getSeniority());
                vacantes.setCantidad(newVacantes.getCantidad());
                vacantes.setRate(newVacantes.getRate());
                vacantes.setComienzo(newVacantes.getComienzo());
                vacantes.setCierre(newVacantes.getCierre());
                vacantes.setSkills(newVacantes.getSkills());
                vacantes.setComputadora(newVacantes.getComputadora());
                vacantes.setIdCliente(newVacantes.getIdCliente());
                vacantes.setIdCompania(newVacantes.getIdCompania());
                vacantes.setIdIdioma(newVacantes.getIdIdioma());
                return vacanteRepository.save(vacantes);
            });
        }
    }
    /*-------------------------------------VALIDACION ESTADO VACANTE------------------------------------*/
    public void verificarVacantesExpiradas() {
        List<Vacantes> vacantes = vacanteRepository.findAll();
        LocalDate localToday = LocalDate.now();
        // Convertir LocalDate a java.util.Date
        java.util.Date utilToday = java.util.Date.from(localToday.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        // Convertir java.util.Date a java.sql.Date
        Date sqlToday = new Date(utilToday.getTime());
        for (Vacantes vacante : vacantes) {
            try{
                if (vacante.getCierre() != null) {
                    Long id_estado = vacanteRepository.findEstadoVacante(vacante.getId());
                    if (id_estado == 0) {
                        Date fechaExpiracion = vacante.getCierre();
                        if (fechaExpiracion.before(sqlToday)) {
                            vacanteRepository.update_estado(vacante.getId());
                            vacanteRepository.save(vacante);
                        }
                    }
                }
            }catch (Exception e){
                throw new RuntimeException("Error: "+ e);
            }

        }
    }


    public List<Vacantes> findAllVacantesUAlta() {
        return vacanteRepository.findAllByUrgencia("alta");
    }


}
