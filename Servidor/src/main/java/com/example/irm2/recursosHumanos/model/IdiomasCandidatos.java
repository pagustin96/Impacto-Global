package com.example.irm2.recursosHumanos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class IdiomasCandidatos {
    private Integer dni;
    private Long idPais;
    private String idioma;
    private String nivel;
}
