package com.example.irm2.recursosHumanos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Companias {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "compania_seq")
    @SequenceGenerator(name = "compania_seq", sequenceName = "hibernate_sequence_compania", allocationSize = 1)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String nombre;
    @Column(name = "id_pais")
    private Long idPais;
}
