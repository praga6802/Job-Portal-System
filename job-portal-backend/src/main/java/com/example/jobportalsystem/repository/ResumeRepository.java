package com.example.jobportalsystem.repository;

import com.example.jobportalsystem.entity.Candidate;
import com.example.jobportalsystem.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Integer> {


    Optional<Resume> findByCandidate(Candidate candidate);

    Optional<Resume> findByCandidate_CandidateId(Integer candidateId);
}
