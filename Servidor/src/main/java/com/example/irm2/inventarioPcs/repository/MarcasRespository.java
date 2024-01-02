package com.example.irm2.inventarioPcs.repository;

import com.example.irm2.inventarioPcs.model.Marcas;
import com.example.irm2.recursosHumanos.model.Candidatos.Candidatos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcasRespository extends JpaRepository<Marcas, Long> {
}
