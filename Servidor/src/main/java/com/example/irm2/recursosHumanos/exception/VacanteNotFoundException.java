package com.example.irm2.recursosHumanos.exception;

public class VacanteNotFoundException extends RuntimeException{

    public VacanteNotFoundException(Long id) {
        super("could not find vacante with id: " + id);
    }

    public VacanteNotFoundException(String name) {
        super("could not find vacante with name: " + name);
    }
}



