package com.example.irm2.recursosHumanos.model.Candidatos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Candidatos implements Serializable {
    @EmbeddedId
    private CandidatosId id;
    private String nombre;
    private String apellido;
    private String perfil;
    private String seniority;
    private String linkedin;
    private String email_personal;
    private String telefono;
    private String nacionalidad;
    private Date nacimiento;
    private Integer expSalarial;
    private Boolean activo;
    private Long id_direccion;
    private Long id_reclutadora;
    private Long id_cliente;
    private Long id_contrato_exterior;
    @Lob
    private byte[] curriculum;
}

