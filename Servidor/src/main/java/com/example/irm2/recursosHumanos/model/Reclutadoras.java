package com.example.irm2.recursosHumanos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Reclutadoras {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "contrato_exterior_seq")
    @SequenceGenerator(name = "contrato_exterior_seq", sequenceName = "hibernate_sequence_contrato_exterior", allocationSize = 1)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private Boolean activo;
}
