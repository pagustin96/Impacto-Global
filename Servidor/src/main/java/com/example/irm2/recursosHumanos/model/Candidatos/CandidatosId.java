package com.example.irm2.recursosHumanos.model.Candidatos;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
public class CandidatosId implements Serializable {
    private Integer dni;
    @Column(name = "id_pais")
    private Long idPais;
}
