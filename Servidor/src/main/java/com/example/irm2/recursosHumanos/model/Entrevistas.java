package com.example.irm2.recursosHumanos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Entrevistas {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "entrevista_seq")
    @SequenceGenerator(name = "entrevista_seq", sequenceName = "hibernate_sequence_entrevista", allocationSize = 1)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String descripcion;
    private String tecnologia;
    private Date fecha;
    private Integer salario;
    @Column(name = "dni_candidato")
    private Integer dniCandidato;
    @Column(name = "id_pais_candidato")
    private Long idPaisCandidato;
    @Column(name = "id_vacante")
    private Long idVacante;

}

