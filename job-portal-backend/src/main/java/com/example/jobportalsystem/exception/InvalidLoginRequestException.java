package com.example.jobportalsystem.exception;

public class InvalidLoginRequestException extends RuntimeException {
    public InvalidLoginRequestException(String message) {
        super(message);
    }
}
