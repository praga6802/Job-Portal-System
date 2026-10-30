package com.example.jobportalsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostQueryDTO {
    private String fullName;
    private String email;
    private String contact;
    private String message;
}
