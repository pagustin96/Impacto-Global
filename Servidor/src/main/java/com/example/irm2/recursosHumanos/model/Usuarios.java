package com.example.irm2.recursosHumanos.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_seq")
    @SequenceGenerator(name = "usuario_seq", sequenceName = "hibernate_sequence_usuario", allocationSize = 1)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String email;
    private String pwd;
    private String rol;
    private Boolean activo;
}

