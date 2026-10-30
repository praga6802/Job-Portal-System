package com.example.jobportalsystem.controller;

import com.example.jobportalsystem.dto.*;
import com.example.jobportalsystem.entity.Users;
import com.example.jobportalsystem.pojo.MyUserDetails;
import com.example.jobportalsystem.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    // register admin
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AdminRegisterDTO admin){
        return adminService.register(admin);
    }

    // update admin
    @PutMapping("/update")
    public ResponseEntity<?> updateAdmin(@AuthenticationPrincipal MyUserDetails userDetails, @RequestBody AdminRegisterDTO admin){
        return adminService.updateAdmin(userDetails.getUserId(),admin);
    }

    @GetMapping("/current")
    public ResponseEntity<ApiResponseDTO> getCurrentAdmin(@AuthenticationPrincipal MyUserDetails userDetails){
        return adminService.getCurrentAdmin(userDetails);
    }

    // get all Admins
    @GetMapping("/admins")
    public ResponseEntity<?> getAdmins(){
        return adminService.getAdmins();
    }


    // get all Candidates
    @GetMapping("/candidates")
    public ResponseEntity<?> getCandidates(){
        return adminService.getCandidates();
    }


    // get all Companies
    @GetMapping("/companies")
    public ResponseEntity<?> getCompanies(){
        return adminService.getCompanies();
    }


    //get Admin details by ID
    @GetMapping("/admin/{id}")
    public ResponseEntity<?> getAdmin(@PathVariable Integer id){
        return adminService.getAdmin(id);
    }


    //get Candidate details by ID
    @GetMapping("/candidate/{id}")
    public ResponseEntity<?> getCandidate(@PathVariable Integer id){
        return adminService.getCandidate(id);
    }

    //get Company details by ID
    @GetMapping("/company/{id}")
    public ResponseEntity<?> getCompany(@PathVariable Integer id){
        return adminService.getCompany(id);
    }

    // Delete Candidate by ID
    @DeleteMapping("/delete/candidate/{candidateId}")
    public ResponseEntity<?> deleteCandidate(@PathVariable Integer candidateId){
        return adminService.deleteCandidate(candidateId);
    }

    // Delete Company by ID
    @DeleteMapping("/delete/company/{companyId}")
    public ResponseEntity<?> deleteCompany(@PathVariable Integer companyId){
        return adminService.deleteCompany(companyId);
    }

    // Delete Admin By ID
    @DeleteMapping("/delete/admin/{adminId}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Integer adminId, Authentication authentication){
        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
        Integer currentAdminId=userDetails.getUserId();

        return adminService.deleteAdmin(adminId, currentAdminId);
    }
    
    // Delete all Admins
    @DeleteMapping("/delete/admins")
    public ResponseEntity<?> deleteAdmins(@AuthenticationPrincipal Users user){
        return adminService.deleteAdmins(user.getUserId());
    }

    // Delete all Candidates
    @DeleteMapping("/delete/candidates")
    public ResponseEntity<?> deleteCandidates(){
        return adminService.deleteCandidates();
    }

    // Delete all Companies
    @DeleteMapping("/delete/companies")
    public ResponseEntity<?> deleteCompanies(){
        return adminService.deleteCompanies();
    }

    // Pending Jobs
    @GetMapping("/jobs")
    public ResponseEntity<?> getJobs(){
        return adminService.getJobs();
    }

    // Pending Jobs
    @GetMapping("/pending-jobs")
    public ResponseEntity<?> getPendingJobs(){
        return adminService.getPendingJobs();
    }

    // Approved Jobs
    @GetMapping("/approved-jobs")
    public ResponseEntity<?> getApprovedJobs(){
        return adminService.getApprovedJobs();
    }

    // Rejected Jobs
    @GetMapping("/rejected-jobs")
    public ResponseEntity<?> getRejectedJobs(){
        return adminService.getRejectedJobs();
    }


    // Approve Job
    @PutMapping("/approve-job/{jobId}")
    public ResponseEntity<?> approveJob(@PathVariable Integer jobId){
        return adminService.approveJob(jobId);
    }


    //reject job by id
   @PutMapping("/reject-job/{jobId}")
   public ResponseEntity<?> rejectJob(@PathVariable Integer jobId){
       return adminService.rejectJob(jobId);
   }

    //reject job by id
    @PutMapping("/pending-job/{jobId}")
    public ResponseEntity<?> pendingJob(@PathVariable Integer jobId){
        return adminService.pendingJob(jobId);
    }


   // --- ADMIN STATISTICS ---
    //Applications per job
    @GetMapping("/applications-per-job")
    public ResponseEntity<?> getApplicationsPerJob(){
        return adminService.getApplicationsPerJob();
    }

    // get applications count per company
    @GetMapping("/applications-per-company")
    public ResponseEntity<?> getApplicationsPerCompany(){
        return adminService.getApplicationsPerCompany();
    }

    // get applications count
    @GetMapping("/applications-count")
    public ResponseEntity<?> getTotalApplications(){
        return adminService.getTotalApplications();
    }

    // get companies count
    @GetMapping("/companies-count")
    public ResponseEntity<?> getTotalCompanies(){
        System.out.println("reached..");
        return adminService.getTotalCompanies();
    }

    // get candidates count
    @GetMapping("/candidates-count")
    public ResponseEntity<?> getTotalCandidates(){
        return adminService.getTotalCandidates();
    }

    // get admins count
    @GetMapping("/admins-count")
    public ResponseEntity<?> getAdminsCount(@AuthenticationPrincipal MyUserDetails userDetails){
        return adminService.getAdminsCount(userDetails.getUsername());
    }

    // get jobs count
    @GetMapping("/jobs-count")
    public ResponseEntity<?> getJobsCount(){
        return adminService.getJobsCount();
    }


    // get approved jobs count
    @GetMapping("/approved-count")
    public ResponseEntity<?> getApprovedJobsCount(){
        return adminService.getApprovedJobsCount();
    }


    // get rejected jobs count
    @GetMapping("/rejected-count")
    public ResponseEntity<?> getRejectedJobsCount(){
        return adminService.getRejectedJobsCount();
    }


    // get pending jobs count
    @GetMapping("/pending-count")
    public ResponseEntity<?> getPendingJobsCount(){
        return adminService.getPendingJobsCount();
    }

    @GetMapping("/queries")
    public ResponseEntity<?> getQueries(){
        return adminService.getQueries();
    }
}
