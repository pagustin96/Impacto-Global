package com.example.irm2.inventarioPcs.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UsuariosPc {
    @Id
    private Long id;
    private String nombre;
    private String apellido;
    @Column(name = "usuario_pc")
    private String usuarioPc;
    @Column(name = "id_cliente")
    private Long idCliente;
    @Column(name = "id_area")
    private Long idArea;
}
