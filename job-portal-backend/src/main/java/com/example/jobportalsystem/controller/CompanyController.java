package com.example.jobportalsystem.controller;


import com.example.jobportalsystem.dto.*;

import com.example.jobportalsystem.pojo.MyUserDetails;
import com.example.jobportalsystem.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth/company")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    // company registration
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody CompanyRegisterDTO company){
        return companyService.register(company);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCompany(@AuthenticationPrincipal MyUserDetails user, @RequestBody CompanyRegisterDTO company){
        return companyService.updateCompany(user.getUserId(),company);
    }

    @GetMapping("/current")
    public ResponseEntity<ApiResponseDTO> getCurrentCompany(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getCurrentCompany(userDetails);
    }

    // -------- JOB FEATURES ------------
    // post job
    @PostMapping("/post-job")
    public ResponseEntity<?> postJob(@RequestBody JobRegisterDTO job, @AuthenticationPrincipal MyUserDetails user){
        return companyService.postJob(job,user.getUserId());
    }

    //update job by id
    @PutMapping("/updateJob/{jobId}")
    public ResponseEntity<?> updateJob(@PathVariable Integer jobId, @RequestBody JobRegisterDTO job, @AuthenticationPrincipal MyUserDetails company){
        return companyService.updateJob(jobId,job,company.getUserId());
    }


    // delete job by ID
    @DeleteMapping("/deleteJob/{jobid}")
    public ResponseEntity<?> deleteJob(@PathVariable Integer jobId, @AuthenticationPrincipal MyUserDetails company){
        return companyService.deleteJob(jobId,company.getUserId());
    }


    // delete all jobs
    @DeleteMapping("/delete-jobs")
    public ResponseEntity<?> deleteJobs(@AuthenticationPrincipal MyUserDetails company){
        return companyService.deleteJobs(company.getUserId());
    }


    //get all jobs
    @GetMapping("/jobs")
    public ResponseEntity<?> getJobs(@AuthenticationPrincipal MyUserDetails company){
        return companyService.getJobs(company.getUsername());
    }

    //get job by id
    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<?> getJobById(@PathVariable Integer jobId, @AuthenticationPrincipal MyUserDetails company){
        return companyService.getJobById(jobId,company.getUserId());
    }


    // get total applicants by company
    @GetMapping("/applicants")
    public ResponseEntity<?> getAllApplicants(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getAllApplicants(userDetails.getUserId());
    }


 // get applicants by job ID
    @GetMapping("/applicants/{jobId}")
    public ResponseEntity<?> getApplicantsByJob(@PathVariable Integer jobId, @AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getApplicantsByJob(jobId,userDetails.getUserId());
    }



    // ------ JOB STATUS FEATURES ----
    @GetMapping("/approved-jobs")
    public ResponseEntity<?> getAllApprovedJobs(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getAllApprovedJobs(userDetails.getUserId());
    }

    @GetMapping("/rejected-jobs")
    public ResponseEntity<?> getAllRejectedJobs(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getAllRejectedJobs(userDetails.getUserId());
    }

    @GetMapping("/pending-jobs")
    public ResponseEntity<?> getAllPendingJobs(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getAllPendingJobs(userDetails.getUserId());
    }


    // ------- JOB ACTIVATE OR INACTIVATE FEATURES -------
    // activate the job
    @PutMapping("/jobs/activate/{jobId}")
    public ResponseEntity<?> activateJob(@PathVariable Integer jobId, @AuthenticationPrincipal MyUserDetails userDetails) {
        return companyService.activateJob(jobId, userDetails.getUserId());
    }

    // deactivate the job
    @PutMapping("/jobs/deactivate/{jobId}")
    public ResponseEntity<?> deactivateJob(@PathVariable Integer jobId, @AuthenticationPrincipal MyUserDetails userDetails) {
        return companyService.deactivateJob(jobId,userDetails.getUserId());
    }

    // get all active jobs
    @GetMapping("/active-jobs")
    public ResponseEntity<?> getActivateJobs(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getActivateJobs(userDetails.getUserId());
    }

   // get all expired jobs
    @GetMapping("/expired-jobs")
    public ResponseEntity<?> getDeactivateJobs(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getDeactivateJobs(userDetails.getUserId());
    }

    // ---- Application status features ---

    // Shortlist Application
    @PutMapping("/applications/shortlistApplication/{applicationId}")
    public ResponseEntity<?> shortlistApplication(@PathVariable Integer applicationId,@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.shortlistApplication(applicationId,userDetails.getUserId());
    }

    // Select Application
    @PutMapping("/applications/selectApplication/{applicationId}")
    public ResponseEntity<?> selectApplication(@PathVariable Integer applicationId,@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.selectApplication(applicationId,userDetails.getUserId());
    }

    // Reject Application
    @PutMapping("/applications/rejectApplication/{applicationId}")
    public ResponseEntity<?> rejectApplication(@PathVariable Integer applicationId,@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.rejectApplication(applicationId,userDetails.getUserId());
    }

    // get shortlisted applications
    @GetMapping("/shortlisted-applications")
    public ResponseEntity<?> getShortlistedApplications(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getShortlistedApplications(userDetails.getUserId());
    }

    // get selected applications
    @GetMapping("/selected-applications")
    public ResponseEntity<?> getSelectedApplications(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getSelectedApplications(userDetails.getUserId());
    }

    // get rejected applications
    @GetMapping("/rejected-applications")
    public ResponseEntity<?> getRejectedApplications(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getRejectedApplications(userDetails.getUserId());
    }


    // company dashboard
    @GetMapping("/job-count")
    public ResponseEntity<?> getJobCount(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getJobCount(userDetails.getUsername());
    }

    @GetMapping("/applicants-count")
    public ResponseEntity<?> getApplicantsCount(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getApplicantsCount(userDetails.getUsername());
    }

    @GetMapping("/approved-count")
    public ResponseEntity<?> getApprovedJobsCount(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getApprovedJobsCount(userDetails.getUsername());
    }

    @GetMapping("/rejected-count")
    public ResponseEntity<?> getRejectedJobsCount(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getRejectedJobsCount(userDetails.getUsername());
    }

    @GetMapping("/pending-count")
    public ResponseEntity<?> getPendingJobsCount(@AuthenticationPrincipal MyUserDetails userDetails){
        return companyService.getPendingJobsCount(userDetails.getUsername());
    }


}
