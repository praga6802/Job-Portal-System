package com.example.jobportalsystem.repository;

import com.example.jobportalsystem.entity.OTPVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationRepository extends JpaRepository<OTPVerification, Integer> {


    Optional<OTPVerification> findByNewEmailAndOtpAndPurposeAndIsUsedFalse(String email, String otp, String purpose);
}
