package com.example.jobportalsystem.exception;


public class BusinessException extends RuntimeException {

    private final Object data;

    public BusinessException(String message) {
        super(message);
        this.data = null;
    }

    public BusinessException(String message, Object data) {
        super(message);
        this.data = data;
    }

    public Object getData() {
        return data;
    }
}

