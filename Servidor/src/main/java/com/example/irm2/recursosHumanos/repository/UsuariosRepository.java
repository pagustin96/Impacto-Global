package com.example.irm2.recursosHumanos.repository;

import com.example.irm2.recursosHumanos.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuariosRepository extends JpaRepository <Usuarios, Long> {
    Usuarios findByEmail(String email);
    List<Usuarios> findAllByActivo(Boolean activo);

}
