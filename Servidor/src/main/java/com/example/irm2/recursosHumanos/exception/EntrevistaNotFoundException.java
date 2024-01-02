package com.example.irm2.recursosHumanos.exception;

public class EntrevistaNotFoundException extends RuntimeException{

    public EntrevistaNotFoundException(Long id){
        super("could not find entrevista with id: " + id);
    }
}
