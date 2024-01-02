package com.example.irm2.recursosHumanos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Clientes {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cliente_seq")
    @SequenceGenerator(name = "cliente_seq", sequenceName = "hibernate_sequence_cliente", allocationSize = 1)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String nombre;
}
