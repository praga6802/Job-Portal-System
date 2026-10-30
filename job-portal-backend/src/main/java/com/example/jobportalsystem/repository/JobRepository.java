package com.example.jobportalsystem.repository;

import com.example.jobportalsystem.dto.JobCategoryDTO;
import com.example.jobportalsystem.entity.Company;
import com.example.jobportalsystem.entity.Job;
import com.example.jobportalsystem.enums.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    Long countByCompany(Company company);

    Long countByCompanyAndStatus(Company company, JobStatus jobStatus);

    Long countByStatus(JobStatus status);


    List<Job> findByCompanyAndActiveAndStatus(Company company, boolean b, JobStatus jobStatus);

    Long countByCompanyAndActiveAndStatus(Company company, boolean b, JobStatus jobStatus);


    List<Job> findByCompanyAndActiveFalseAndStatusIn(Company company, List<JobStatus> rejected);

    Long countByCompanyAndActiveFalseAndStatusIn(Company company, List<JobStatus> rejected);

    @Query("""
    SELECT new com.example.jobportalsystem.dto.JobCategoryDTO(
        j.category,
        COUNT(j)
    )
    FROM Job j
    WHERE j.status = com.example.jobportalsystem.enums.JobStatus.APPROVED
    AND j.active = true
    AND j.deadline > CURRENT_TIMESTAMP
    GROUP BY j.category
    ORDER BY COUNT(j) DESC
""")
    List<JobCategoryDTO> findJobCategoriesWithCount();
}
