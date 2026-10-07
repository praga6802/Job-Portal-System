package com.example.jobportalsystem.repository;

import com.example.jobportalsystem.entity.Verification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationRepository extends JpaRepository<Verification, Integer> {


    Optional<Verification> findByEmailAndOtpAndIsUsedFalse(String email, String otp);

    Optional<Verification> findByOtpAndIsUsedFalse(String otp);
}
