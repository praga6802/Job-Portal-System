package com.example.jobportalsystem.controller;


import com.example.jobportalsystem.dto.*;
import com.example.jobportalsystem.pojo.MyUserDetails;
import com.example.jobportalsystem.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/auth/candidate")
public class CandidateController {


    @Autowired
    private CandidateService candidateService;

    // candidate registration
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody CandidateRegisterDTO candidate){
        System.out.println("Password: "+ candidate.getPassword());
        return candidateService.register(candidate);
    }

    // current candidate
    @GetMapping("/current")
    public ResponseEntity<ApiResponseDTO> getCurrentCandidate(@AuthenticationPrincipal MyUserDetails userDetails){
        return candidateService.getCurrentCandidate(userDetails);
    }

    // update candidate details
    @PutMapping("/update")
    public  ResponseEntity<?> updateCandidate(@AuthenticationPrincipal MyUserDetails userDetails, @RequestBody CandidateRegisterDTO candidate){
        System.out.println("Log in candidate: "+userDetails.getUsername());
        return candidateService.updateCandidate(userDetails.getUserId(),candidate);
    }


    //  ---- JOB Application Features --------
    // apply job
    @PostMapping("/apply/job/{jobId}")
    public ResponseEntity<?> applyJob(@PathVariable Integer jobId, @AuthenticationPrincipal MyUserDetails userDetails){
        return candidateService.applyJob(jobId, userDetails.getUserId());
    }


    // get job by company
    @GetMapping("/jobs/{companyId}")
    public ResponseEntity<?> getJobsByCompany(@PathVariable String companyId) {
        return candidateService.getJobsByCompany(companyId);
    }


    // view applied jobs
    @GetMapping("/applied-jobs")
    public ResponseEntity<?> viewAppliedJobs(@AuthenticationPrincipal MyUserDetails userDetails) {
        return candidateService.viewAppliedJobs(userDetails.getUserId());
    }


    // ----------------------- RESUME features ---------------------------
    // upload resume
    @PostMapping("/upload-resume")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal MyUserDetails candidate) throws IOException {
        return candidateService.uploadResume(file, candidate.getUserId());
    }

    //delete resume
    @DeleteMapping("/delete-resume")
    public ResponseEntity<?> deleteResume(@AuthenticationPrincipal MyUserDetails candidate) throws IOException {
        return candidateService.deleteResume(candidate.getUserId());
    }

    //view resume
    @GetMapping("/view-resume")
    public ResponseEntity<?> viewResume(@AuthenticationPrincipal MyUserDetails candidate) throws Exception{
        return candidateService.viewResume(candidate.getUserId());
    }

    //download resume
    @GetMapping("/download-resume")
    public ResponseEntity<?> downloadResume(@AuthenticationPrincipal MyUserDetails candidate) throws Exception{
        return candidateService.downloadResume(candidate.getUserId());
    }

    // ----------------------- EMAIL verification ---------------------------

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody CandidateRegistrationVerificationDTO candidate) {
        return candidateService.verifyOtp(candidate.getEmail(),candidate.getOtp());
    }

    @PostMapping("/verify-email-update")
    public ResponseEntity<?> verifyEmailUpdate(@RequestBody OTPRequestDTO otp, @AuthenticationPrincipal MyUserDetails userDetails){
        System.out.println(userDetails.getEmail()+" "+userDetails.getUsername());
        return candidateService.verifyEmailUpdate(otp.getOtp(),userDetails.getUserId());
    }

}
