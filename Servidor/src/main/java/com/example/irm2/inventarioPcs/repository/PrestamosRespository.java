package com.example.irm2.inventarioPcs.repository;

import com.example.irm2.inventarioPcs.model.Prestamos;
import com.example.irm2.recursosHumanos.model.Candidatos.Candidatos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrestamosRespository extends JpaRepository<Prestamos, Long> {
}
