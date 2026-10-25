package com.example.jobportalsystem.dto;

import com.example.jobportalsystem.entity.Job;
import com.example.jobportalsystem.enums.JobStatus;
import com.example.jobportalsystem.enums.JobType;
import com.example.jobportalsystem.enums.WorkMode;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class JobResponseDTO {


    private Integer jobId;
    private String company;
    private String title;
    private String description;
    private String skills;
    private JobStatus status;
    private String location;
    private JobType jobType;
    private Double minSalary;
    private Double maxSalary;
    private Integer minExperience;
    private Integer maxExperience;
    private String openings;
    private WorkMode workMode;
    private String category;
    private LocalDate postedAt;
    private LocalDateTime deadline;
    private boolean active;


    public JobResponseDTO(Job job) {
        this.company=job.getCompany().getName();
        this.status=job.getStatus();
        this.jobId = job.getJobId();
        this.title = job.getTitle();
        this.description = job.getDescription();
        this.skills = job.getSkills();
        this.location = job.getLocation();
        this.jobType=job.getJobType();
        this.minSalary=job.getMinSalary();
        this.maxSalary=job.getMaxSalary();
        this.minExperience=job.getMinExperience();
        this.maxExperience=job.getMaxExperience();
        this.openings=job.getOpenings();
        this.workMode=job.getWorkMode();
        this.category=job.getCategory();
        this.postedAt=job.getPostedAt();
        this.deadline=job.getDeadline();
        this.active=job.isActive();

    }

}
