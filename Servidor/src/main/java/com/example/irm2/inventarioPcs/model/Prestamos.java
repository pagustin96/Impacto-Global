package com.example.irm2.inventarioPcs.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Prestamos {
    @Id
    private Long id;
    @Column(name = "id_notebook")
    private String idNotebook;
    @Column(name = "fecha_entrega")
    private Date fechaEntrega;
    @Column(name = "fecha_devolucion")
    private Date fechaDevolucion;
}
