package com.example.irm2.recursosHumanos.repository;

import com.example.irm2.recursosHumanos.model.Candidatos.Candidatos;
import com.example.irm2.recursosHumanos.model.IdiomasCandidatos;
import com.example.irm2.recursosHumanos.model.Vacantes.Vacantes;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface CandidatosRepository extends JpaRepository <Candidatos, Long> {

    @Query(value = "SELECT * FROM candidatos c, historial_candidatos h " +
            " WHERE c.dni = h.dni_candidato AND c.id_pais = h.pais_candidato " +
            "AND c.activo = :activo" +
            " AND h.fecha_cambio = (SELECT MAX(fecha_cambio) " +
            "                       FROM historial_candidatos " +
            "                       WHERE dni_candidato = c.dni" +
            "                       AND pais_candidato = c.id_pais)" +
            " ORDER BY h.fecha_cambio DESC",
            nativeQuery = true)
    List<Candidatos> findAllByActivo(@Param("activo") Boolean activo);

    Optional<Candidatos> findByIdDniAndIdIdPais(Integer dni, Long idPais);

    @Query(value = "SELECT p.nombre FROM paises p WHERE p.id = :idPais", nativeQuery = true)
    String findPais(@Param("idPais") Long idPais);

    @Query(value = "SELECT c.id_direccion FROM candidatos c WHERE c.dni = :dni AND c.id_pais = :idPais", nativeQuery = true)
    Long findIdDireccion(@Param("dni") Integer dni, @Param("idPais") Long idPais);

    @Query(value = "SELECT estado_actual_candidatoXpostulacion(:dni,:idPais,:idPostulacion) FROM dual", nativeQuery = true)
    Long EstadoActual(Integer dni, Long idPais, Long idPostulacion);

    @Query(value = "SELECT h.id_estado FROM historial_candidatos h, candidatos c " +
            "WHERE c.id_pais = h.pais_candidato " +
            "AND c.dni = h.dni_candidato " +
            "AND c.dni = :dni " +
            "AND c.id_pais = :idPais " +  // Agrega el parámetro idPais en la consulta
            "AND h.fecha_cambio = (SELECT MAX(fecha_cambio) " +
            "FROM historial_candidatos " +
            "WHERE dni_candidato = c.dni " +
            "AND pais_candidato = c.id_pais)", nativeQuery = true)
    Long findEstadoCandidato(@Param("dni") Integer dni,
                             @Param("idPais") Long idPais);

    @Query(value = "SELECT e.nombre FROM estados_candidatos e WHERE :idEstado=e.id ", nativeQuery = true)
    String findEstadoCandidatosString(@Param("idEstado") Long idEstado);


    @Query(value = "SELECT  i.nombre, ic.nivel  FROM candidatos c, idiomas_candidatos ic, idiomas i " +
            " WHERE c.id_pais = ic.pais_candidato AND c.dni = ic.dni AND ic.id_idioma = i.id " +
            "  AND c.dni = :dni AND c.id_pais = :id_pais ", nativeQuery = true)
    List findIdioma(@Param("dni") Integer dni, @Param("id_pais") Long id_pais);

    @Query(value = "SELECT c.nombre FROM idiomas_candidatos i, candidatos c " +
            " WHERE c.id_pais = i.pais_candidato AND c.dni = i.dni_candidato AND i.id_idioma = :id_idioma " +
            "  AND i.nivel = :nivel AND c.dni = :dni AND c.id_pais = :id_pais", nativeQuery = true)
    String findCxIdiomayNivel(@Param("dni") Integer dni, @Param("id_pais") Long id_pais, @Param("id_idioma") Long id_idioma, @Param("nivel") String nivel);
    @Query(value = "SELECT c.nombre FROM idiomas_candidatos i, candidatos c " +
            " WHERE c.id_pais = i.pais_candidato AND c.dni = i.dni_candidato AND i.id_idioma = :id_idioma " +
            "  AND i.dni_candidato = :dni AND i.pais_candidato = :id_pais", nativeQuery = true)
    String findCxIdioma(@Param("dni") Integer dni, @Param("id_pais") Long id_pais, @Param("id_idioma") Long id_idioma);
    @Query(value = "SELECT c.dni FROM historial_candidatos h, candidatos c " +
            "WHERE c.id_pais = h.pais_candidato AND c.dni = h.dni_candidato AND h.id_estado = :id_estado " +
            "  AND c.dni = :dni AND c.id_pais = :id_pais  AND h.fecha_cambio = (SELECT MAX(fecha_cambio) " +
            "                                                                   FROM historial_candidatos " +
            "                                                                   WHERE dni_candidato = c.dni" +
            "                                                                   AND pais_candidato = c.id_pais)", nativeQuery = true)
    Integer findCxEstado(@Param("dni") Integer dni, @Param("id_pais") Long id_pais, @Param("id_estado") Long id_estado);

    @Query(value = "SELECT * FROM candidatos c, historial_candidatos h " +
            " WHERE c.dni = h.dni_candidato AND c.id_pais = h.pais_candidato " +
            " AND h.fecha_cambio = (SELECT MAX(fecha_cambio) " +
            "                       FROM historial_candidatos " +
            "                       WHERE dni_candidato = c.dni" +
            "                       AND pais_candidato = c.id_pais)" +
            " ORDER BY h.fecha_cambio DESC",
            nativeQuery = true)
    List<Candidatos> findAllCandidatosXFecha();

    @Query(value = "SELECT * FROM candidatos c, historial_candidatos h" +
            " WHERE c.id_pais = h.pais_candidato AND c.dni = h.dni_candidato " +
            "AND c.activo = 1 " +
            "AND h.id_postulacion IS NOT NULL " +
            "AND h.fecha_cambio = (SELECT MAX(fecha_cambio) " +
            "                      FROM historial_candidatos " +
            "                      WHERE dni_candidato = c.dni" +
            "                      AND pais_candidato = c.id_pais)" +
            "AND h.id_estado NOT IN (1, 2, 3)" +
            "ORDER BY h.fecha_cambio DESC",
            nativeQuery = true)
    List<Candidatos> findCandidatosaActivosConPostulacion(Pageable pageable);

    @Query(value = "SELECT count(*) FROM candidatos c, historial_candidatos h " +
            "WHERE c.id_pais = h.pais_candidato AND c.dni = h.dni_candidato " +
            "AND c.activo = 1 " +
            "AND h.id_postulacion IS NOT NULL " +
            "AND h.fecha_cambio >= TRUNC(SYSDATE, 'MONTH') " +
            "AND h.fecha_cambio <= LAST_DAY(TRUNC(SYSDATE, 'MONTH')) " +
            "AND h.id_estado NOT IN (1, 2, 3)",
            nativeQuery = true)
    Integer countPostulacion();


    @Query(value = "SELECT * FROM candidatos c, historial_candidatos h " +
            " WHERE c.dni = h.dni_candidato AND c.id_pais = h.pais_candidato " +
            " AND c.activo = 1 " +
            " AND h.fecha_cambio = (SELECT MAX(fecha_cambio) " +
            "                       FROM historial_candidatos " +
            "                       WHERE dni_candidato = c.dni" +
            "                       AND pais_candidato = c.id_pais)" +
            " AND h.id_estado = 1 " +
            " ORDER BY h.fecha_cambio DESC",
            nativeQuery = true)
    List<Candidatos> findCandidatosContratados(Pageable pageable);

    @Query(value = "SELECT count(*) FROM candidatos c, historial_candidatos h " +
            "WHERE c.id_pais = h.pais_candidato AND c.dni = h.dni_candidato " +
            "AND c.activo = 1 " +
            "AND h.id_postulacion IS NOT NULL " +
            "AND h.fecha_cambio >= TRUNC(SYSDATE, 'MONTH') " +
            "AND h.fecha_cambio <= LAST_DAY(TRUNC(SYSDATE, 'MONTH')) " +
            "AND h.id_estado = 1",
            nativeQuery = true)
    Integer countContratados();

    @Query(value = "SELECT * FROM candidatos c, historial_candidatos h " +
            " WHERE c.dni = h.dni_candidato AND c.id_pais = h.pais_candidato " +
            " AND c.activo = 1 " +
            " AND h.fecha_cambio = (SELECT MAX(fecha_cambio) " +
            "                       FROM historial_candidatos " +
            "                       WHERE dni_candidato = c.dni" +
            "                       AND pais_candidato = c.id_pais)" +
            " AND h.id_estado = 4 " +
            " ORDER BY h.fecha_cambio DESC",
            nativeQuery = true)
    List<Candidatos> findCandidatosEnEspera(Pageable pageable);

    @Query(value = "SELECT count(*) FROM candidatos c, historial_candidatos h " +
            "WHERE c.id_pais = h.pais_candidato AND c.dni = h.dni_candidato " +
            "AND c.activo = 1 " +
            "AND h.id_postulacion IS NOT NULL " +
            "AND h.fecha_cambio >= TRUNC(SYSDATE, 'MONTH') " +
            "AND h.fecha_cambio <= LAST_DAY(TRUNC(SYSDATE, 'MONTH')) " +
            "AND h.id_estado = 4",
            nativeQuery = true)
    Integer countEnEspera();

    @Query(value = "SELECT * FROM candidatos c, historial_candidatos h " +
            " WHERE c.dni = h.dni_candidato AND c.id_pais = h.pais_candidato " +
            " AND c.activo = 1 " +
            " AND h.fecha_cambio = (SELECT MAX(fecha_cambio) " +
            "                       FROM historial_candidatos " +
            "                       WHERE dni_candidato = c.dni" +
            "                       AND pais_candidato = c.id_pais)" +
            " AND h.id_estado = 2 " +
            " ORDER BY h.fecha_cambio DESC",
            nativeQuery = true)
    List<Candidatos> findCandidatosRechazados(Pageable pageable);

    @Query(value = "SELECT count(*) FROM candidatos c, historial_candidatos h " +
            "WHERE c.id_pais = h.pais_candidato AND c.dni = h.dni_candidato " +
            "AND c.activo = 1 " +
            "AND h.id_postulacion IS NOT NULL " +
            "AND h.fecha_cambio >= TRUNC(SYSDATE, 'MONTH') " +
            "AND h.fecha_cambio <= LAST_DAY(TRUNC(SYSDATE, 'MONTH')) " +
            "AND h.id_estado = 2",
            nativeQuery = true)
    Integer countRechazados();


    @Procedure(name = "update_estado_candidato")
    void update_estado_candidato(Integer p_dni, Long p_idPais, Long p_idPostulacion, Long p_idNewEstado, String p_justificacion);

    @Procedure(name = "nueva_postulacion")
    void nueva_postulacion(Long p_idVacante);

    @Procedure(name = "p_insertar_direccion_completa")
    void p_insertar_direccion_completa(String p_calle, Integer p_numero, String p_barrio, Integer p_cp, String p_ciudad, String p_provincia, Long p_idPais);

    @Procedure(name = "p_delete_direccion")
    void p_delete_direccion(String p_calle,
                            Integer p_numero,
                            String p_barrio,
                            Integer p_cp,
                            String p_ciudad,
                            String p_provincia,
                            Long p_idPais,
                            Long p_idDireccion);

    @Query(value = "SELECT f_obtener_id_direccion(:calle,:numero) FROM dual", nativeQuery = true)
    Long obtenerIdDireccion(String calle, Integer numero);

    @Query(value = "SELECT f_obtener_ultimo_id_postulacion(:idVacante) FROM dual", nativeQuery = true)
    Long obtenerIdPostulacion(Long idVacante);

    @Query(value = "SELECT * " +
            "FROM candidatos c " +
            "WHERE (c.dni, c.id_pais) IN (" +
            "SELECT h.dni_candidato, h.pais_candidato " +
            "FROM historial_candidatos h, postulaciones p, vacantes v " +
            "WHERE h.id_postulacion = p.id AND p.id_vacante = v.id AND v.id = :idVacante)"
            , nativeQuery = true)
    List<Candidatos> findCandidatosXVacante(@Param("idVacante") Long idVacante);

    /*@Query(value = "SELECT v.nombre, cl.nombre, e.nombre " +
            "FROM vacantes v, clientes cl, estados_candidatos e, postulaciones p, historial_candidatos h " +
            "WHERE h.pais_candidato = :idPais AND h.dni_candidato = :dni AND h.id_estado = e.id" +
            " AND h.id_postulacion = p.id AND h.fecha_cambio = (SELECT MAX(fecha_cambio) " +
            "                                                   FROM historial_candidatos " +
            "                                                   WHERE dni_candidato = :dni" +
            "                                                   AND pais_candidato = :idPais)", nativeQuery = true)
    List<?> findPostulacionesXC(@Param("dni")Integer dni,@Param("idPais") Long idPais);
*/
    @Procedure(name = "p_insertar_idioma_candidato")
    void p_insertar_idioma_candidato(Integer p_dni, Long p_idPais, String p_idioma, String p_nivel);

    /*---------------------------FUNCIONES FRONT-------------------------------*/
    @Query(value = "SELECT  *  FROM idiomas ", nativeQuery = true)
    ArrayList findAllIdiomas();

    @Query(value = "SELECT  *  FROM estados_candidatos ", nativeQuery = true)
    ArrayList findAllEstados();

    @Query(value = "SELECT  *  FROM clientes", nativeQuery = true)
    ArrayList findAllClientes();

    @Query(value = "SELECT  id, nombre, apellido  FROM reclutadoras ", nativeQuery = true)
    ArrayList findAllReclutadoras();

    @Query(value = "SELECT  *  FROM paises ", nativeQuery = true)
    ArrayList findAllPaises();

    @Query(value = "SELECT  *  FROM provincias ", nativeQuery = true)
    ArrayList findAllProvincias();

    @Query(value = "SELECT  *  FROM companias ", nativeQuery = true)
    ArrayList findAllCompanias();

    @Query(value = "INSERT INTO idiomas_candidatos VALUES (:dni,:id_pais,:idioma,:nivel)", nativeQuery = true)
    void insertIdioma(@Param("dni") Integer dni,@Param("id_pais") Long idPais,@Param("idioma") int i,@Param("nivel") String bajo);
}

