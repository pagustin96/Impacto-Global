package com.example.irm2.recursosHumanos.repository;

import com.example.irm2.recursosHumanos.model.Vacantes.Vacantes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface VacantesRepository extends JpaRepository <Vacantes, Long> {
    List<Vacantes> findByIdCliente(Long idCliente);
    List <Vacantes> findAllByUrgencia(String urgencia);


    @Query(value = "SELECT i.nombre FROM IDIOMAS i WHERE :idIdioma = i.id", nativeQuery = true)
    String findNombreIdioma(@Param("idIdioma")Long idIdioma);
    @Query(value = "SELECT p.nombre FROM PAISES p, COMPANIAS c WHERE :idCompania = c.id AND c.id_pais = p.id", nativeQuery = true)
    String findPaisExterior(@Param("idCompania")Long idCompania);
    @Procedure(name = "UPDATE_ESTADO")
    void update_estado(Long p_id_vacante);

    @Query(value = "SELECT estado_actual_vacante(:idVacante) FROM dual", nativeQuery = true)
    Long findEstadoVacante(Long idVacante);

    @Procedure(name = "update_estado_cancelado")
    void update_estado_cancelado(Long p_id_vacante,String p_justificacion);

    @Query(value = "SELECT obtener_justificacion_vacante_cancelada(:id) FROM dual", nativeQuery = true)
    String findJustificacionEstado(Long id);

    @Query(value = "SELECT * FROM VACANTES"+
            " WHERE estado_actual_vacante(id) = :idEstado", nativeQuery = true)
    List<Vacantes> findVacanteXEstado(@Param("idEstado")Long idEstado);

    @Procedure(name = "p_insertar_nueva_compania")
    void p_insertar_nueva_compania( String P_NOMBRE_VACANTE ,
                                    String P_SENIORITY ,
                                    Integer P_CANTIDAD ,
                                    Integer P_RATE ,
                                    Date P_COMIENZO ,
                                    Date P_CIERRE ,
                                    String P_SKILLS ,
                                    String P_COMPUTADORA ,
                                    Long P_ID_IDIOMA ,
                                    String P_MODULO ,
                                    String P_NOMBRE_COMPANIA ,
                                    Long P_idPais);

    @Procedure(name = "p_insertar_nuevo_cliente" )
    void p_insertar_nuevo_cliente (String P_NOMBRE_VACANTE ,
                                   String P_SENIORITY ,
                                   Integer P_CANTIDAD ,
                                   Integer P_RATE ,
                                   Date P_COMIENZO ,
                                   Date P_CIERRE ,
                                   String P_SKILLS ,
                                   String P_COMPUTADORA ,
                                   Long P_ID_IDIOMA ,
                                   String P_MODULO ,
                                   String P_NOMBRE_CLIENTE);


}
