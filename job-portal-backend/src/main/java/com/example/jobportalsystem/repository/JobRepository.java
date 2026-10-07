package com.example.jobportalsystem.repository;

import com.example.jobportalsystem.entity.Company;
import com.example.jobportalsystem.entity.Job;
import com.example.jobportalsystem.enums.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job,Integer> {


    List<Job> findByCompany(Company company);

    List<Job> findByStatus(JobStatus status);


    List<Job> findByStatusAndActive(JobStatus jobStatus, boolean b);

    List<Job> findByCompanyAndStatusAndActive(Company company, JobStatus jobStatus, boolean b);

    List<Job> findByCompanyAndStatus(Company company, JobStatus jobStatus);

    List<Job> findByCompanyAndActive(Company company, boolean b);
}
