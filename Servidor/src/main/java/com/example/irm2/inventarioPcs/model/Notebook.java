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
public class Notebook {
    @Id
    private Long id;
    @Column(name = "id_usuario")
    private Long idUsuario;
    @Column(name = "id_marca")
    private Long idMarca;
    @Column(name = "id_tipo")
    private Long idTipo;
    @Column(name = "capacidad_disco")
    private Integer capacidadDisco;
    @Column(name = "memoria_ram")
    private Integer memoriaRam;
    private String procesador;
    @Column(name = "numero_serie")
    private String nroSerie;
    private Float valuacion;
}