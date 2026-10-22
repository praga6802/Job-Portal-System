package com.example.jobportalsystem.entity;


import com.example.jobportalsystem.enums.JobStatus;
import com.example.jobportalsystem.enums.JobType;
import com.example.jobportalsystem.enums.WorkMode;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name="jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer jobId;

    @Column(nullable = false, name = "title")
    private String title;

    @Column(nullable = false,length = 2000, name = "description")
    private String description;

    @Column(nullable = false, name = "skills")
    private String skills;

    @Column(nullable = false)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WorkMode workMode;

    @Column(nullable = false, name = "location")
    private String location;

    @Column(nullable = false)
    private Double minSalary;

    @Column(nullable = false)
    private Double maxSalary;

    @Column(nullable = false)
    private Integer minExperience;

    @Column(nullable = false)
    private Integer maxExperience;

    @Column(nullable = false)
    private String openings;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private JobStatus status= JobStatus.PENDING;

    @Column(name="active")
    private boolean active=false;

    @Column(nullable = false)
    private LocalDate deadline;

    @Column(nullable = false, updatable = false)
    private LocalDate postedAt = LocalDate.now();

    @ManyToOne
    @JoinColumn(name="company_id",nullable = false)
    private Company company;

}
