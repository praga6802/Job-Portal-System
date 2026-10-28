package com.example.jobportalsystem.dto;

import com.example.jobportalsystem.entity.Job;
import com.example.jobportalsystem.entity.JobApplication;
import com.example.jobportalsystem.enums.ApplicationStatus;
import com.example.jobportalsystem.enums.JobStatus;
import com.example.jobportalsystem.enums.JobType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationStatusDTO {

    private String title;
    private String company;
    private String location;
    private JobType jobType;
    private Double minSalary;
    private Double maxSalary;
    private ApplicationStatus status;
    private Integer minExperience;
    private Integer maxExperience;
    private boolean isActive;
    private LocalDateTime appliedAt;


    public ApplicationStatusDTO(JobApplication application){

        this.title=application.getJob().getTitle();
        this.jobType=application.getJob().getJobType();
        this.company=application.getCompany().getName();
        this.minSalary=application.getJob().getMinSalary();
        this.maxSalary=application.getJob().getMaxSalary();
        this.location=application.getJob().getLocation();
        this.status=application.getStatus();
        this.minExperience=application.getJob().getMinExperience();
        this.maxExperience = application.getJob().getMaxExperience();
        this.isActive=application.getJob().isActive();
        this.appliedAt=application.getAppliedAt();
    }

}
