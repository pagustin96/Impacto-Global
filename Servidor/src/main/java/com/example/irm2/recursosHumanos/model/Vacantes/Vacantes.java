package com.example.irm2.recursosHumanos.model.Vacantes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Vacantes {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "vacante_seq")
    @SequenceGenerator(name = "vacante_seq", sequenceName = "hibernate_sequence_vacante", allocationSize = 1)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String nombre;
    private String seniority;
    private Integer cantidad;
    private Integer rate;
    private Date comienzo;
    private Date cierre;
    private String skills;
    private String computadora;
    @Column(name = "id_cliente")
    private Long idCliente;
    @Column(name = "id_compania")
    private Long idCompania;
    @Column(name = "id_idioma")
    private Long idIdioma;
    private String modulo;
    private String urgencia;
}

