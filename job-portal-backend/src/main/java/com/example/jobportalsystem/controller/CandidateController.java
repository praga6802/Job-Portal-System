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


    // view applications
    @GetMapping("/applications")
    public ResponseEntity<?> viewAppliedJobs(@AuthenticationPrincipal MyUserDetails userDetails) {
        return candidateService.viewAppliedJobs(userDetails.getUserId());
    }

    // view selected applications
    @GetMapping("/applications/selected")
    public ResponseEntity<?> viewSelectedApplications(@AuthenticationPrincipal MyUserDetails userDetails) {
        return candidateService.viewSelectedApplications(userDetails.getUserId());
    }

    // view rejected applications
    @GetMapping("/applications/rejected")
    public ResponseEntity<?> viewRejectedApplications(@AuthenticationPrincipal MyUserDetails userDetails) {
        return candidateService.viewRejectedApplications(userDetails.getUserId());
    }

    // view shortlisted applications
    @GetMapping("/applications/shortlisted")
    public ResponseEntity<?> viewShortlistedApplications(@AuthenticationPrincipal MyUserDetails userDetails) {
        return candidateService.viewShortlistedApplications(userDetails.getUserId());
    }

    // view under-review applications
    @GetMapping("/applications/under-review")
    public ResponseEntity<?> viewUnderReviewApplications(@AuthenticationPrincipal MyUserDetails userDetails) {
        return candidateService.viewUnderReviewApplications(userDetails.getUserId());
    }

    @GetMapping("/applied-jobs-count")
    public ResponseEntity<?> viewAppliedJobsCount(@AuthenticationPrincipal MyUserDetails userDetails) {
        System.out.println("User ID:"+userDetails.getUserId());
        return candidateService.viewAppliedJobsCount(userDetails.getUserId());
    }

    @GetMapping("/selected-count")
    public ResponseEntity<?> viewSelectedCount(@AuthenticationPrincipal MyUserDetails userDetails) {
        System.out.println("User ID:"+userDetails.getUserId());
        return candidateService.viewSelectedCount(userDetails.getUserId());
    }

    @GetMapping("/rejected-count")
    public ResponseEntity<?> viewRejectedCount(@AuthenticationPrincipal MyUserDetails userDetails) {
        System.out.println("User ID:"+userDetails.getUserId());
        return candidateService.viewRejectedCount(userDetails.getUserId());
    }

    @GetMapping("/shortlisted-count")
    public ResponseEntity<?> viewShortlistedCount(@AuthenticationPrincipal MyUserDetails userDetails) {
        System.out.println("User ID:"+userDetails.getUserId());
        return candidateService.viewShortlistedCount(userDetails.getUserId());
    }

    @GetMapping("/under-review-count")
    public ResponseEntity<?> viewUnderReviewCount(@AuthenticationPrincipal MyUserDetails userDetails) {
        System.out.println("User ID:"+userDetails.getUserId());
        return candidateService.viewUnderReviewCount(userDetails.getUserId());
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
