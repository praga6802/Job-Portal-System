package com.example.jobportalsystem.exception;

public class UnAuthorizedException extends RuntimeException{

    public UnAuthorizedException(String fieldName, String value){
        super(fieldName+" "+value+" is UnAuthorized");
    }
}
