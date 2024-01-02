package com.example.irm2.recursosHumanos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CiudadProvinciaDireccion {
    private String provincia;
    private String ciudad;
    private String calle;
    private Integer numero;
    private String barrio;
    private Integer cp;

}
