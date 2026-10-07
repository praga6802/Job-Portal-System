package com.example.jobportalsystem.dto;

import com.example.jobportalsystem.entity.Job;
import com.example.jobportalsystem.entity.JobApplication;
import com.example.jobportalsystem.enums.JobStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationStatusDTO {

    private String jobTitle;
    private String companyName;
    private Double salary;
    private String location;
    private JobStatus status;
    private String experience;
    private boolean isActive;
    private LocalDateTime appliedAt;


    public ApplicationStatusDTO(JobApplication application){
        Job job = application.getJob();
        this.jobTitle=job.getTitle();
        this.companyName=job.getCompany().getName();
        this.salary=job.getSalary();
        this.location=job.getLocation();
        this.status=job.getStatus();
        this.experience=job.getExperience();
        this.isActive=application.getJob().isActive();
        this.appliedAt=application.getAppliedAt();
    }

}
