package com.example.irm2.recursosHumanos.exception;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String email) {
        super("The email " + email + " has already exits");
    }
}

