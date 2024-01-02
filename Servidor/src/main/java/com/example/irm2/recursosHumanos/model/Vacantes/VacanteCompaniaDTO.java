package com.example.irm2.recursosHumanos.model.Vacantes;

import com.example.irm2.recursosHumanos.model.Companias;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VacanteCompaniaDTO {
    private Vacantes vacante;
    private Companias compania;
}
