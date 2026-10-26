package com.example.jobportalsystem.dto;

import com.example.jobportalsystem.entity.JobApplication;
import com.example.jobportalsystem.enums.ApplicationStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JobApplicationResponseDTO {
    private Integer applicationId;

    // job details
    private Integer jobId;
    private String jobTitle;


    // Candidate details
    private Integer candidateId;
    private String firstname;
    private String lastname;
    private String email;
    private String contact;
    private String skills;
    private String experience;
    private ApplicationStatus status;

    private LocalDateTime appliedAt;

    public JobApplicationResponseDTO(JobApplication jobApplication) {

        this.appliedAt=jobApplication.getAppliedAt();
        this.applicationId=jobApplication.getId();
        this.firstname=jobApplication.getCandidate().getFirstname();
        this.candidateId=jobApplication.getCandidate().getCandidateId();
        this.lastname=jobApplication.getCandidate().getLastname();
        this.email=jobApplication.getCandidate().getEmail();
        this.contact=jobApplication.getCandidate().getContact();
        this.skills=jobApplication.getCandidate().getSkills();
        this.experience=jobApplication.getCandidate().getExperience();
        this.jobId=jobApplication.getJob().getJobId();
        this.jobTitle=jobApplication.getJob().getTitle();
        this.status= jobApplication.getStatus();
    }
}
