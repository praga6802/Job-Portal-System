package com.example.jobportalsystem.dto;

import com.example.jobportalsystem.entity.Candidate;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CandidateResponseDTO {

    private Integer candidateId;
    private String firstname;
    private String lastname;
    private String email;
    private String contact;
    private LocalDate dob;
    private String skills;
    private String experience;
    private String location;


    public CandidateResponseDTO(Candidate candidate){
        this.candidateId=candidate.getCandidateId();
        this.firstname=candidate.getFirstname();
        this.lastname=candidate.getLastname();
        this.email=candidate.getEmail();
        this.contact=candidate.getContact();
        this.dob=candidate.getDateOfBirth();
        this.skills=candidate.getSkills();
        this.experience=candidate.getExperience();
        this.location=candidate.getLocation();

    }

}
