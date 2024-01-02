package com.example.irm2.recursosHumanos.exception;

public class UsuarioNotFoundException extends RuntimeException{

    public UsuarioNotFoundException(Long id){
        super("could not find user with id: " + id);
    }
}
