package com.example.irm2.recursosHumanos.repository;

import com.example.irm2.recursosHumanos.model.Entrevistas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EntrevistasRepository extends JpaRepository <Entrevistas, Long> {
    @Query(value = "SELECT descripcion FROM entrevistas " +
            " WHERE id=:id", nativeQuery = true)
    String findDescripcionById(@Param("id") Long id);
    @Query(value =
            "SELECT e.ID, e.DESCRIPCION, e.TECNOLOGIA, e.FECHA, e.SALARIO, e.DNI_CANDIDATO, e.ID_PAIS_CANDIDATO, e.ID_VACANTE " +
                    "FROM entrevistas e INNER JOIN candidatos c ON e.DNI_CANDIDATO = c.DNI " +
                    "AND e.ID_PAIS_CANDIDATO = c.ID_PAIS " +
                    "WHERE c.ID_RECLUTADORA = :idReclutadora", nativeQuery = true)
    List<Entrevistas> findEntrevistasxReclutadora(@Param("idReclutadora") Long idReclutadora);

}
