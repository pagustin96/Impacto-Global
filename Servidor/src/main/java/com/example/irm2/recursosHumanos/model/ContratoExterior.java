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
@Table(name = "contrato_exterior")
public class ContratoExterior {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "contrato_exterior_seq")
    @SequenceGenerator(name = "contrato_exterior_seq", sequenceName = "hibernate_sequence_contrato_exterior", allocationSize = 1)
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(name = "fecha_inicio")
    private Date fechaInicio;
    @Column(name = "direccion_envio")
    private Long direccionEnvio;
    private Long cpf;
    private Long rg;
    @Column(name = "nombre_madre")
    private String madre;
    @Column(name = "nombre_padre")
    private String padre;
    @Column(name = "skype_id")
    private Long skypeId;
}
