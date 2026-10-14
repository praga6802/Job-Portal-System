package com.example.jobportalsystem.dto;

import com.example.jobportalsystem.entity.Job;
import com.example.jobportalsystem.enums.JobType;
import com.example.jobportalsystem.enums.WorkMode;
import lombok.Data;

import java.time.LocalDate;

@Data
public class JobResponseDTO {


    private Integer jobId;
    private String company;
    private String title;
    private String description;
    private String skills;
    private String location;
    private JobType jobType;
    private Double minSalary;
    private Double maxSalary;
    private String minExperience;
    private String maxExperience;
    private String openings;
    private WorkMode workMode;
    private String category;
    private LocalDate postedAt;
    private LocalDate deadline;


    public JobResponseDTO(Job job) {
        this.company=job.getCompany().getName();
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

    }

}
