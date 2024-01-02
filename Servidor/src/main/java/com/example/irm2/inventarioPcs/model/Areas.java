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
public class Areas {
    @Id
    private Long id;
    private String nombre;
    @Column(name = "id_cliente")
    private Long idCliente;
}
