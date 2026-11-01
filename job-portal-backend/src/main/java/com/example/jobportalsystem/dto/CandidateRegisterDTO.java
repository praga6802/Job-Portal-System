package com.example.jobportalsystem.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateRegisterDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String contact;
    private String location;
    private LocalDate dob;
    private String skills;
    private String experience;
}
