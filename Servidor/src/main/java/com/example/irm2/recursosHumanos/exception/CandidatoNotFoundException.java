package com.example.irm2.recursosHumanos.exception;

public class CandidatoNotFoundException extends RuntimeException{

    public CandidatoNotFoundException(Integer dni ,Long id_pais){
        super("could not find candidate with dni: " + dni + " and id_pais: " + id_pais);
    }
}
