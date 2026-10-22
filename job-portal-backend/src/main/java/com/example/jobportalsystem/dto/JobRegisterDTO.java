package com.example.jobportalsystem.dto;

import com.example.jobportalsystem.entity.Job;
import com.example.jobportalsystem.enums.JobType;
import com.example.jobportalsystem.enums.WorkMode;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.jdbc.Work;

import java.time.LocalDate;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class JobRegisterDTO {

    private String title;
    private String description;
    private String skills;
    private String category;
    private JobType jobType;
    private WorkMode workMode;
    private String location;
    private Double minSalary;
    private Double maxSalary;
    private Integer minExperience;
    private Integer maxExperience;
    private String openings;
    private LocalDate deadline;

    public JobRegisterDTO(Job job) {
        this.title = job.getTitle();
        this.description = job.getDescription();
        this.skills = job.getSkills();
        this.category = job.getCategory();
        this.jobType = job.getJobType();
        this.workMode = job.getWorkMode();
        this.location = job.getLocation();
        this.minSalary = job.getMinSalary();
        this.maxSalary = job.getMaxSalary();
        this.minExperience = job.getMinExperience();
        this.maxExperience = job.getMaxExperience();
        this.openings = job.getOpenings();
        this.deadline = job.getDeadline();
    }
}