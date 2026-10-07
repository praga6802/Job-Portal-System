package com.example.jobportalsystem.exception;

public class AlreadyExistsException extends RuntimeException{


    public AlreadyExistsException(String fieldName, String value){
        super(fieldName+" "+value+" already Exists!");
    }
}
