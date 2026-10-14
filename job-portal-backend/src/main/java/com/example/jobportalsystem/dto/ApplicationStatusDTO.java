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

    private String title;
    private String company;
    private String location;
    private String jobType;
    private Double minSalary;
    private Double maxSalary;
    private JobStatus status;
    private String minExperience;
    private String maxExperience;
    private boolean isActive;
    private LocalDateTime appliedAt;


    public ApplicationStatusDTO(JobApplication application){
        Job job = application.getJob();
        this.title=job.getTitle();
        this.company=job.getCompany().getName();
        this.minSalary=job.getMinSalary();
        this.maxSalary=job.getMaxSalary();
        this.location=job.getLocation();
        this.status=job.getStatus();
        this.minExperience=job.getMinExperience();
        this.maxExperience = job.getMaxExperience();
        this.isActive=application.getJob().isActive();
        this.appliedAt=application.getAppliedAt();
    }

}
