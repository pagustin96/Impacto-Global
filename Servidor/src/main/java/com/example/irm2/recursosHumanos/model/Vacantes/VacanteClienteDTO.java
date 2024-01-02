package com.example.irm2.recursosHumanos.model.Vacantes;

import com.example.irm2.recursosHumanos.model.Clientes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VacanteClienteDTO {
    private Vacantes vacante;
    private Clientes cliente;
}
