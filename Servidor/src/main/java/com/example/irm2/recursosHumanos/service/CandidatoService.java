package com.example.irm2.recursosHumanos.service;

import com.example.irm2.recursosHumanos.exception.CandidatoNotFoundException;
import com.example.irm2.recursosHumanos.model.Candidatos.Candidatos;
import com.example.irm2.recursosHumanos.model.ContratoExterior;
import com.example.irm2.recursosHumanos.model.CiudadProvinciaDireccion;
import com.example.irm2.recursosHumanos.model.IdiomasCandidatos;
import com.example.irm2.recursosHumanos.model.Vacantes.Vacantes;
import com.example.irm2.recursosHumanos.repository.CandidatosRepository;
import com.example.irm2.recursosHumanos.repository.VacantesRepository;
import com.example.irm2.recursosHumanos.repository.ContratoExteriorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("candidatoService")
@Transactional
public class CandidatoService {

    private final CandidatosRepository candidatosRepository;
    private final VacantesRepository vacantesRepository;
    private final ContratoExteriorRepository contratoExteriorRepository;

    @Autowired
    public CandidatoService(CandidatosRepository CandidatosRepository, VacantesRepository vacantesRepository, ContratoExteriorRepository contratoExteriorRepository) {
        this.candidatosRepository = CandidatosRepository;
        this.vacantesRepository = vacantesRepository;
        this.contratoExteriorRepository = contratoExteriorRepository;
    }

    /* ------------------------------ FIND ----------------------------- */

    public List<Candidatos> findAllCandidatos(){
        return candidatosRepository.findAll();
    }
    public List<Candidatos> findAllCandidatosA() {
        return candidatosRepository.findAllByActivo(true);
    }

    public List<Candidatos> findAllCandidatosB(){
        return candidatosRepository.findAllByActivo(false);
    }

    public Optional<Candidatos> findCandidatoById(Integer dni, Long id_pais) {
        return candidatosRepository.findByIdDniAndIdIdPais(dni, id_pais);
    }

    public List<Candidatos> filterCandidato(Candidatos candidato, Long id_idioma, String nivel, Long id_estado) {
        List<Candidatos> allCandidatos = candidatosRepository.findAll();
        return allCandidatos.stream()
                .filter(v -> (candidato.getId_reclutadora() == null || Objects.equals(v.getId_reclutadora(), candidato.getId_reclutadora()))
                        && (candidato.getId_cliente() == null || Objects.equals(v.getId_cliente(), candidato.getId_cliente()))
                        && (candidato.getSeniority() == null || Objects.equals(v.getSeniority().toLowerCase(), candidato.getSeniority().toLowerCase()))
                        && (candidato.getPerfil() == null || Objects.equals(v.getPerfil().toLowerCase(), candidato.getPerfil().toLowerCase()))
                        && (id_idioma == null && nivel == null ||
                            nivel == null && Objects.nonNull(candidatosRepository.findCxIdioma(v.getId().getDni(), v.getId().getIdPais(),id_idioma))||
                            Objects.nonNull(candidatosRepository.findCxIdiomayNivel(v.getId().getDni(), v.getId().getIdPais(),id_idioma,nivel)))
                        && (id_estado == null || Objects.nonNull(candidatosRepository.findCxEstado(v.getId().getDni(),v.getId().getIdPais(),id_estado))))
                .collect(Collectors.toList());
    }

    /* ------------------------------ CREATE ----------------------------- */
    public ResponseEntity addCandidato(Candidatos candidato,Long idVacante, CiudadProvinciaDireccion cpd) {
        try {
            Optional<Candidatos> newCandidato = candidatosRepository.findByIdDniAndIdIdPais(candidato.getId().getDni(),candidato.getId().getIdPais());
            if (newCandidato.isEmpty()) {
                //GUARDA EL CANDIDATO
                candidato.setActivo(true);
                candidatosRepository.save(candidato);
                //AGREGA LA POSTULACION AL CANDIDATO GUARDADO RECIENTEMENTE
                agregarPostulacionCandidato(candidato.getId().getDni(),candidato.getId().getIdPais(),idVacante, true);
                //AGREGA LA DIRECCION DEL CANDIDATO
                candidatosRepository.p_insertar_direccion_completa(cpd.getCalle(),cpd.getNumero(),cpd.getBarrio(),cpd.getCp(),cpd.getCiudad(),cpd.getProvincia(),candidato.getId().getIdPais());
                //SETEA EL ID DIRRECION AL CANDIDATO DE LA DIRECCION AGREGADA
                Long id_direccion = candidatosRepository.obtenerIdDireccion(cpd.getCalle(), cpd.getNumero());
                candidato.setId_direccion(id_direccion);
                candidatosRepository.save(candidato);
                return ResponseEntity.ok("Candidato creado con éxito");
            }else{
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("El candidato ya se creó anteriormente");
            }
        }catch (Exception e){
            return ResponseEntity.badRequest().body("ERROR: " + e);
        }

    }

    public ResponseEntity addCandidatoExterior(ContratoExterior contrato, Integer dni, Long idPais) {
        ContratoExterior contratoGuardado = contratoExteriorRepository.save(contrato);
        Long idContratoExterior = contratoGuardado.getId();
        Optional<Candidatos> OCandidatoAgregado = candidatosRepository.findByIdDniAndIdIdPais(dni, idPais);
        Candidatos candidatoAgregado = OCandidatoAgregado.get();
        candidatoAgregado.setId_contrato_exterior(idContratoExterior);
        Long idDireccion = candidatosRepository.findIdDireccion(dni,idPais);
        contratoGuardado.setDireccionEnvio(idDireccion);
        contratoExteriorRepository.save(contratoGuardado);
        candidatosRepository.save(candidatoAgregado);
        return ResponseEntity.ok("Contrato exterior creado con éxito");
    }
    public ResponseEntity addIdiomaCandidato(IdiomasCandidatos idiomasCandidatos) {
        try {
            candidatosRepository.p_insertar_idioma_candidato(idiomasCandidatos.getDni(),idiomasCandidatos.getIdPais(),idiomasCandidatos.getIdioma(),idiomasCandidatos.getNivel());
            return ResponseEntity.ok("Idioma de candidato agregado con exito!");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("ERROR: " + e);
        }
    }

    /* ------------------------------ DELETE ----------------------------- */
    public ResponseEntity deleteCandidato(Integer dni, Long id_pais) {
        try {
            Optional<Candidatos> deletedCandidatoOptional = findCandidatoById(dni, id_pais);
            if (deletedCandidatoOptional.isEmpty()) {
                throw new CandidatoNotFoundException(dni,id_pais);
            } else {
                Candidatos deletedCandidato = deletedCandidatoOptional.get();
                if (!deletedCandidato.getActivo()){
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("El candidato ya se borró anteriormente");
                }else {
                    deletedCandidato.setActivo(false);
                    candidatosRepository.save(deletedCandidato);
                    return ResponseEntity.ok("Candidato borrado con éxito");
                }
            }
        }catch (Exception e){
            return ResponseEntity.badRequest().body("ERROR: " + e);
        }

    }
    public ResponseEntity<?> agregarPostulacionCandidato(Integer dni, Long idPais, Long idVacante, Boolean a) {
        try {
            Optional<Candidatos> candidato = candidatosRepository.findByIdDniAndIdIdPais(dni,idPais);
            if(candidato.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró ese candidato");
            }else {
                //aca se crea una nueva postulacion el idVacante correspondiente  y despues se tiene que asignar
                // ese id_postulacion con la tabla historial_candidatos
                candidatosRepository.nueva_postulacion(idVacante);
                Long idPostulacion = candidatosRepository.obtenerIdPostulacion(idVacante);
                Long idNewEstado = 4L;
                if(vacantesRepository.findEstadoVacante(idVacante)==0) {
                    if (!a) {
                        updateEstadoCandidato(dni, idPais, idPostulacion, idNewEstado, "Nueva postulación");
                    } else {
                        updateEstadoCandidato(dni, idPais, idPostulacion, idNewEstado, "Nuevo Candidato");
                    }
                    return ResponseEntity.ok("Postulación agregada con éxito!");
                }else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Vacante finalizada o cancelada");
                }
            }
        }catch (Exception e){
            return ResponseEntity.badRequest().body("ERROR: " + e);
        }


    }
    /* ------------------------------ UPDATE ----------------------------- */
    public Optional<Candidatos> updateCandidato(Candidatos newCandidato, Integer dni,Long id_pais) {
        Optional<Candidatos> updatedCandidato = findCandidatoById(dni,id_pais);
        if ((updatedCandidato.isEmpty())) throw new CandidatoNotFoundException(dni, id_pais);
        else {
            return updatedCandidato.map(candidato -> {
                candidato.setNombre(newCandidato.getNombre());
                candidato.setApellido(newCandidato.getApellido());
                candidato.setPerfil(newCandidato.getPerfil());
                candidato.setSeniority(newCandidato.getSeniority());
                candidato.setLinkedin(newCandidato.getLinkedin());
                candidato.setEmail_personal(newCandidato.getEmail_personal());
                candidato.setTelefono(newCandidato.getTelefono());
                candidato.setNacionalidad(newCandidato.getNacionalidad());
                candidato.setNacimiento(newCandidato.getNacimiento());
                candidato.setExpSalarial(newCandidato.getExpSalarial());
                candidato.setId_reclutadora(newCandidato.getId_reclutadora());
                candidato.setId_cliente(newCandidato.getId_cliente());
                candidato.setId_contrato_exterior(newCandidato.getId_contrato_exterior());
                return candidatosRepository.save(candidato);
            });
        }
    }
    public ResponseEntity updateDireccionCandidato(Integer dni,Long idPais, CiudadProvinciaDireccion cpd) {
        try{
            Long OldIdDireccion = candidatosRepository.findIdDireccion(dni,idPais);
            candidatosRepository.p_delete_direccion(cpd.getCalle(),cpd.getNumero(),cpd.getBarrio(),cpd.getCp(),cpd.getCiudad(),cpd.getProvincia(),idPais,OldIdDireccion);
            Long id_direccion = candidatosRepository.obtenerIdDireccion(cpd.getCalle(), cpd.getNumero());
            Candidatos candidato = findCandidatoById(dni,idPais).get();
            candidato.setId_direccion(id_direccion);
            candidatosRepository.save(candidato);
            return ResponseEntity.ok("Dirreción actualizada con exito");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e);
        }
    }

    public ResponseEntity<?> updateEstadoCandidato(Integer dni, Long idPais,Long idPostulacion, Long idNewEstado, String justificacion) {
        try {
            Optional<Candidatos> candidato = candidatosRepository.findByIdDniAndIdIdPais(dni,idPais);
            if(candidato.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro ese candidato");
            }else {
                if(candidatosRepository.EstadoActual(dni,idPais,idPostulacion)==idNewEstado){
                    System.out.println(candidatosRepository.EstadoActual(dni,idPais,idPostulacion) + " " + idNewEstado);
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ese candidato ya tiene ese estado");
                }else {
                    candidatosRepository.update_estado_candidato(dni,idPais,idPostulacion,idNewEstado,justificacion);
                    return ResponseEntity.ok("Estado de candidato actualizado con exito!");
                }
            }

        }catch (Exception e){
            return ResponseEntity.badRequest().body("ERROR: " + e);
        }
    }

    public ResponseEntity guardarCandidatoConCV(Long idPais, Integer dni, byte[] cvBytes) {
        // Buscar el candidato por ID de país y DNI
        Optional<Candidatos> optionalCandidato = candidatosRepository.findByIdDniAndIdIdPais(dni, idPais);

        if (optionalCandidato.isPresent()) {
            Candidatos foundCandidato = optionalCandidato.get();

            // Actualizar el currículo del candidato con los nuevos datos
            foundCandidato.setCurriculum(cvBytes);

            // Guardar los cambios en el repositorio
            candidatosRepository.save(foundCandidato);
            return ResponseEntity.ok("cv cargado con exito");
        } else {
            // Manejar el caso en el que no se encuentra al candidato
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se encontró al candidato con ID de país " + idPais + " y DNI " + dni);
        }
    }

    public byte[] obtenerCurriculum(Long idPais, Integer dni) {
        // Buscar el candidato por ID de país y DNI
        Optional<Candidatos> optionalCandidato = candidatosRepository.findByIdDniAndIdIdPais(dni, idPais);
            Candidatos foundCandidato = optionalCandidato.get();
            return foundCandidato.getCurriculum();
    }

    /*public ResponseEntity<List<?>> obtenerPostulaciones(Integer dni, Long idPais) {
        List<?> postulaciones = candidatosRepository.findPostulacionesXC(dni,idPais);
        return ResponseEntity.ok(postulaciones);
    }*/

}
