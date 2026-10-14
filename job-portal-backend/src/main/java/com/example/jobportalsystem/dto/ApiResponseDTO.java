package com.example.jobportalsystem.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponseDTO {

    private String status;
    private String message;
    private LocalDateTime timestamp;

    private Object data;

    public ApiResponseDTO(LocalDateTime timestamp, String status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
    }

    public ApiResponseDTO(LocalDateTime timestamp, String status, String message, Object data) {
        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
        this.data = data;
    }

}
