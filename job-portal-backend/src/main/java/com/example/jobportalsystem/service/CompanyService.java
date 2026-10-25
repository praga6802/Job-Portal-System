package com.example.jobportalsystem.service;

import com.example.jobportalsystem.dto.*;
import com.example.jobportalsystem.entity.Company;
import com.example.jobportalsystem.entity.Job;
import com.example.jobportalsystem.entity.JobApplication;
import com.example.jobportalsystem.entity.Users;
import com.example.jobportalsystem.enums.ApplicationStatus;
import com.example.jobportalsystem.enums.JobStatus;
import com.example.jobportalsystem.enums.JobType;
import com.example.jobportalsystem.exception.NotFoundException;
import com.example.jobportalsystem.exception.UnAuthorizedException;
import com.example.jobportalsystem.pojo.MyUserDetails;
import com.example.jobportalsystem.repository.CompanyRepository;
import com.example.jobportalsystem.repository.JobApplicationRepository;
import com.example.jobportalsystem.repository.JobRepository;
import com.example.jobportalsystem.repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JWTService jwtService;

    // registration service
    public ResponseEntity<?> register(CompanyRegisterDTO company) {

        if (companyRepository.existsByEmail(company.getEmail()) || usersRepository.existsByEmail(company.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponseDTO(LocalDateTime.now(), "Failure", "Email already exists!"));
        }

        if (companyRepository.existsByContact(company.getContact())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponseDTO(LocalDateTime.now(), "Failure", "Mobile Number already exists!"));
        }

        if (companyRepository.existsByUrl(company.getUrl())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponseDTO(LocalDateTime.now(), "Failure", "URL already exists!"));
        }

        if (companyRepository.existsByGst(company.getGst())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponseDTO(LocalDateTime.now(), "Failure", "GST Number already exists!"));
        }

        Users user = new Users();
        if(company.getEmail()!=null && !company.getEmail().isEmpty()){
            user.setEmail(company.getEmail());
        }

        if(company.getPassword()!=null && !company.getPassword().isEmpty()){
            user.setPassword(passwordEncoder.encode(company.getPassword()));
        }

        user.setRole("COMPANY");
        usersRepository.save(user);

        Company c1 = new Company();
        if(company.getName()!=null && !company.getName().isEmpty()){
            c1.setName(company.getName());
        }
        if(company.getDescription()!=null && !company.getDescription().isEmpty()){
            c1.setDescription(company.getDescription());
        }
        if(company.getEmail()!=null && !company.getEmail().isEmpty()){
            c1.setEmail(company.getEmail());
        }

        if(company.getContact()!=null && !company.getContact().isEmpty()){
            c1.setContact(company.getContact());
        }
        if(company.getUrl()!=null && !company.getUrl().isEmpty()){
            c1.setUrl(company.getUrl());
        }

        if(company.getSize()!=null && !company.getSize().isEmpty()){
            c1.setSize(company.getSize());
        }
        if(company.getType()!=null && !company.getType().isEmpty()){
            c1.setType(company.getType());
        }

        if(company.getLocation()!=null && !company.getLocation().isEmpty()){
            c1.setLocation(company.getLocation());
        }
        if(company.getType()!=null && !company.getType().isEmpty()){
            c1.setType(company.getType());
        }

        if(company.getGst()!=null && !company.getGst().isEmpty()){
            c1.setGst(company.getGst());
        }

        c1.setUser(user);

        companyRepository.save(c1);

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(), "Success", "SignUp Successfully!"));
    }

    // update company details
    @Transactional
    public ResponseEntity<?> updateCompany(Integer userId, CompanyRegisterDTO company) {


        List<String> updatedFields = new ArrayList<>();
        String newToken = null;

        Users user = usersRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found!"));
        Company comp = companyRepository.findByUser_UserId(userId).orElseThrow(() -> new NotFoundException("Company not found!"));


        if (company.getName() != null && !company.getName().trim().isEmpty()) {
            if(!company.getName().equals(comp.getName())){
                comp.setName(company.getName());
                updatedFields.add("Name");
            }
        }

        if (company.getDescription() != null && !company.getDescription().trim().isEmpty()) {
            if (!comp.getDescription().equals(company.getDescription())) {
                comp.setDescription(company.getDescription());
                updatedFields.add("Description");
            }
        }

        if (company.getEmail() != null && !company.getEmail().trim().isEmpty()) {
            if (!company.getEmail().equals(comp.getEmail())) {
                if (companyRepository.existsByEmail(company.getEmail())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "Email already taken!"));
                }
                comp.setEmail(company.getEmail());
                user.setEmail(company.getEmail());
                updatedFields.add("Email");
                newToken = jwtService.generateToken(company.getEmail());
            }
        }

        if (company.getContact() != null && !company.getContact().trim().isEmpty()) {
            if (!comp.getContact().equals(company.getContact())) {
                if (companyRepository.existsByContact(company.getContact())) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "Contact already registered!"));
                }
                comp.setContact(company.getContact());
                updatedFields.add("Contact");
            }
        }


        if (company.getUrl() != null && !company.getUrl().trim().isEmpty()) {
            if (!comp.getUrl().equals(company.getUrl())) {
                if (companyRepository.existsByUrl(company.getUrl())) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "URL already registered!"));
                }
                comp.setUrl(company.getUrl());
                updatedFields.add("URL");
            }

        }

        if (company.getType() != null && !company.getType().trim().isEmpty()) {
            if (!comp.getType().equals(company.getType())) {
                comp.setType(company.getType());
                updatedFields.add("Type");
            }
        }

        if (company.getSize() != null && !company.getSize().trim().isEmpty()) {
            if (!comp.getSize().equals(company.getSize())) {
                comp.setSize(company.getSize());
                updatedFields.add("Size");
            }
        }

        if (company.getLocation() != null && !company.getLocation().trim().isEmpty()) {
            if (!comp.getLocation().equals(company.getLocation())) {
                comp.setLocation(company.getLocation());
                updatedFields.add("Location");
            }

        }

        if (company.getGst() != null && !company.getGst().trim().isEmpty()) {
            if (!comp.getGst().equals(company.getGst())) {
                if (companyRepository.existsByGst(company.getGst())) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "GST already registered!"));
                }
                comp.setGst(company.getGst());
                updatedFields.add("GST");
            }

        }

        companyRepository.save(comp);

        if (updatedFields.isEmpty()) {
            return ResponseEntity.ok(
                    new ApiResponseDTO(
                            LocalDateTime.now(),
                            "Success",
                            "No changes detected!"
                    )
            );
        }

        String message = "Company " + String.join(",", updatedFields) + " Updated Successfully!";
        if (newToken != null) {
            return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(), "Success", message, newToken));
        }
        return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(), "Success", message));
    }

    // post new job
    public ResponseEntity<?> postJob(JobRegisterDTO job, Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(() -> new NotFoundException("Company not found!"));
        Job j = new Job();
        j.setTitle(job.getTitle());
        j.setDescription(job.getDescription());
        j.setSkills(job.getSkills());
        j.setCategory(job.getCategory());
        j.setJobType(job.getJobType());
        j.setWorkMode(job.getWorkMode());
        j.setLocation(job.getLocation());
        j.setMinSalary(job.getMinSalary());
        j.setMaxSalary(job.getMaxSalary());
        j.setMinExperience(job.getMinExperience());
        j.setMaxExperience(job.getMaxExperience());
        j.setOpenings(job.getOpenings());
        j.setDeadline(job.getDeadline());
        j.setCompany(company);
        jobRepository.save(j);
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(), "Success", "Job Posted Successfully!"));
    }

    // update job details
    public ResponseEntity<?> updateJob(Integer jobId, JobRegisterDTO jobDTO, Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(() -> new NotFoundException("Company not found!"));

        Job job = jobRepository.findById(jobId).orElseThrow(() -> new NotFoundException("Job not found!"));

        List<String> updatedDetails = new ArrayList<>();

        if (job.getCompany().getCompanyId().equals(companyId)) {
            throw new UnAuthorizedException(company.getEmail(), jobDTO.getTitle());
        }

        if (jobDTO.getTitle() != null && !jobDTO.getTitle().isEmpty()) {
            job.setTitle(jobDTO.getTitle());
            updatedDetails.add("Title");
        }

        if (jobDTO.getDescription() != null && !jobDTO.getDescription().isEmpty()) {
            job.setDescription(jobDTO.getDescription());
            updatedDetails.add("Description");
        }

        if (jobDTO.getSkills() != null && !jobDTO.getSkills().isEmpty()) {
            job.setSkills(jobDTO.getSkills());
            updatedDetails.add("Skills");
        }

        if (jobDTO.getMinSalary() != null && jobDTO.getMinSalary() != 0.00) {
            job.setMinSalary(jobDTO.getMinSalary());
            updatedDetails.add("Min Salary");
        }

        if (jobDTO.getMaxSalary() != null && jobDTO.getMaxSalary() != 0.00) {
            job.setMaxSalary(jobDTO.getMaxSalary());
            updatedDetails.add("Max Salary");
        }

        if (jobDTO.getMinExperience() != null) {
            job.setMinExperience(jobDTO.getMinExperience());
            updatedDetails.add("Min Experience");
        }

        if (jobDTO.getMaxExperience() != null) {
            job.setMaxExperience(jobDTO.getMaxExperience());
            updatedDetails.add("Max Experience");
        }

        if (jobDTO.getLocation() != null && !jobDTO.getLocation().isEmpty()) {
            job.setLocation(jobDTO.getLocation());
            updatedDetails.add("Location");
        }

        if (jobDTO.getJobType() != null) {
            job.setJobType(jobDTO.getJobType());
            updatedDetails.add("Job Type");
        }

        if (jobDTO.getCategory() != null && !jobDTO.getCategory().isEmpty()) {
            job.setCategory(jobDTO.getCategory());
            updatedDetails.add("Category");
        }

        if (jobDTO.getWorkMode() != null) {
            job.setWorkMode(jobDTO.getWorkMode());
            updatedDetails.add("Work Mode");
        }

        if (jobDTO.getOpenings() != null && !jobDTO.getOpenings().isEmpty()) {
            job.setOpenings(jobDTO.getOpenings());
            updatedDetails.add("Openings");
        }

        jobRepository.save(job);

        String message = "Job " + String.join(",", updatedDetails) + " updated Successfully!";

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(), "Success", message));
    }

    // delete job by ID
    @Transactional
    public ResponseEntity<?> deleteJob(Integer jobId, Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(() -> new NotFoundException("Company not found with ID: " + companyId));

        Job job = jobRepository.findById(jobId).orElseThrow(() -> new NotFoundException("Job not found with ID: " + jobId));


        if (!job.getCompany().getCompanyId().equals(company.getCompanyId())) {
            throw new UnAuthorizedException(company.getEmail(), job.getTitle());
        }

        jobRepository.delete(job);
        return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(), "Success", "Job Deleted Successfully!"));

    }

    // delete all jobs
    public ResponseEntity<?> deleteJobs(Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(() -> new NotFoundException("Company not found!"));

        List<Job> jobs = jobRepository.findByCompany(company);

        if (jobs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No jobs were found!"));
        }
        jobRepository.deleteAll(jobs);
        return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(), "Success", "All jobs deleted Successfully"));
    }

    // get all jobs
    public ResponseEntity<?> getJobs(String email) {
        Company company = companyRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Company not found"));

        List<Job> jobs = jobRepository.findByCompany(company);
        if (jobs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No jobs found!"));
        }

        List<JobResponseDTO> jobList = jobs.stream().map(JobResponseDTO::new).toList();

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Jobs Fetched Successfully",jobList));
    }

    // get job by ID
    public ResponseEntity<?> getJobById(Integer jobId, Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(() -> new NotFoundException("Company not found with id: " + companyId));

        Job job = jobRepository.findById(jobId).orElseThrow(() -> new NotFoundException("Job not found with id: " + jobId));

        if (!job.getCompany().getCompanyId().equals(company.getCompanyId())) {
            throw new UnAuthorizedException(company.getEmail(), job.getTitle());
        }

        return ResponseEntity.ok(new JobResponseDTO(job));
    }

    //get status of job posted by company
    public ResponseEntity<?> getAdminJobStatus(Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(() -> new NotFoundException("Company not found with ID: " + companyId));

        List<Job> companyJobs = jobRepository.findByCompany(company);
        if (companyJobs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No jobs were found!"));
        }

        List<JobResponseDTO> statusList = companyJobs.stream().map(JobResponseDTO::new).toList();
        return ResponseEntity.ok(statusList);
    }

    // get all applicants
    public ResponseEntity<?> getAllApplicants(Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(() -> new NotFoundException("Company not found with ID: " + companyId));
        List<JobApplication> jobApplications = jobApplicationRepository.findByJob_Company(company);

        if (jobApplications.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No Applicants were found!"));
        }

        List<JobApplicationResponseDTO> applicantsList = jobApplications.stream().map(application -> {
            return new JobApplicationResponseDTO(application.getAppliedAt(), application.getCandidate().getFirstname(),
                    application.getCandidate().getLastname(), application.getCandidate().getEmail(),
                    application.getCandidate().getContact(), application.getCandidate().getSkills(), application.getCandidate().getExperience(),
                    application.getJob().getJobId(), application.getJob().getTitle());
        }).toList();

        return ResponseEntity.ok(applicantsList);
    }


    // get applicants by job ID
    public ResponseEntity<?> getApplicantsByJob(Integer jobId, Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(() -> new NotFoundException("Company not found with ID: " + companyId));
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new NotFoundException("Job not found with ID: !" + jobId));

        if (!job.getCompany().getCompanyId().equals(company.getCompanyId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "You are not authorized to view this job's applicants!"));
        }

        List<JobApplication> jobApplications = jobApplicationRepository.findByJob(job);

        if (jobApplications.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No Applicants were found!"));
        }
        List<JobApplicationResponseDTO> applicantsList = jobApplications.stream().map(application -> {
            return new JobApplicationResponseDTO(
                    application.getAppliedAt(),
                    application.getCandidate().getFirstname(),
                    application.getCandidate().getLastname(),
                    application.getCandidate().getEmail(),
                    application.getCandidate().getContact(),
                    application.getCandidate().getSkills(),
                    application.getCandidate().getExperience());
        }).toList();

        return ResponseEntity.ok(applicantsList);


    }


    // update job as activate
    public ResponseEntity<?> activateJob(Integer jobId, Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(() -> new NotFoundException("Company not found with this ID: " + companyId));
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new NotFoundException("Job not found with this ID: " + jobId));

        if (job.getCompany().getCompanyId().equals(company.getCompanyId())) {
            if (job.getStatus() != JobStatus.APPROVED) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),
                        "Failure", "Only approved jobs can be activated!"));
            }

            if (job.isActive()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "Already it is activated!"));
            }
            job.setActive(true);
            jobRepository.save(job);
            return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(), "Success", "Job Activated Successfully"));
        }
        else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","You are not allowed to set active status!"));
        }
    }

    // update job as deactivate
    public ResponseEntity<?> deactivateJob(Integer jobId, Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(() -> new NotFoundException("Company not found with this ID: " + companyId));
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new NotFoundException("Job not found with this ID: " + jobId));

        if (job.getCompany().getCompanyId().equals(company.getCompanyId())) {

            if (job.getStatus() != JobStatus.APPROVED) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),
                        "Failure", "Only approved jobs can be deactivated!"));
            }

            if (!job.isActive()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "Already it is deactivated!"));
            }

            job.setActive(false);
            jobRepository.save(job);
            return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(), "Success", "Job Deactivated Successfully"));
        }
        else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","You are not allowed to set active status!"));
        }
    }

    // shortlist application
    public ResponseEntity<?> shortlistApplication(Integer applicationId, Integer companyId) {
        JobApplication jobApplication =jobApplicationRepository.findById(applicationId).orElseThrow(()-> new NotFoundException("Application not found with ID: "+applicationId));
        Company company =companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found with ID: ",companyId));

        if(!jobApplication.getJob().getCompany().getCompanyId().equals(company.getCompanyId())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","You cannot SHORTLIST this application"));
        }

        if(jobApplication.getStatus()!=ApplicationStatus.APPLIED){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","Only with Status:Applied can be shortlisted!"));
        }

        jobApplication.setStatus(ApplicationStatus.SHORTLISTED);
        jobApplicationRepository.save(jobApplication);
        return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(),"Success","Application with ID: "+applicationId+" has been SHORTLISTED Successfully!"));
    }


    // select application
    public ResponseEntity<?> selectApplication(Integer applicationId, Integer companyId) {
        JobApplication jobApplication =jobApplicationRepository.findById(applicationId).orElseThrow(()-> new NotFoundException("Application not found with ID: "+applicationId));
        Company company =companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found with ID: ",companyId));

        if(!jobApplication.getJob().getCompany().getCompanyId().equals(company.getCompanyId())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","You cannot SELECT this application"));
        }

        if(jobApplication.getStatus()!=ApplicationStatus.SHORTLISTED){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","Only with Status:Shortlisted can be Selected!"));
        }

        jobApplication.setStatus(ApplicationStatus.SELECTED);
        jobApplicationRepository.save(jobApplication);
        return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(),"Success","Application with ID: "+applicationId+" has been SELECTED Successfully!"));
    }

    // reject application
    public ResponseEntity<?> rejectApplication(Integer applicationId, Integer companyId) {
        JobApplication jobApplication =jobApplicationRepository.findById(applicationId).orElseThrow(()-> new NotFoundException("Application not found with ID: "+applicationId));
        Company company =companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found with ID: ",companyId));

        if(!jobApplication.getJob().getCompany().getCompanyId().equals(company.getCompanyId())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","You cannot REJECT this application"));
        }

        if(jobApplication.getStatus()==ApplicationStatus.SELECTED || jobApplication.getStatus()==ApplicationStatus.REJECTED){
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new LoginResponseDTO(LocalDateTime.now(),"Failure","Application cannot be rejected when status is: "+jobApplication.getStatus()));
        }

        jobApplication.setStatus(ApplicationStatus.REJECTED);
        jobApplicationRepository.save(jobApplication);
        return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(),"Success","Application with ID: "+applicationId+" has been REJECTED Successfully!"));
    }

    // get all approved jobs by admin
    public ResponseEntity<?> getAllApprovedJobs(Integer companyId) {
        Company company= companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found with this ID: "+companyId));

        List<Job> approvedJobs= jobRepository.findByCompanyAndStatus(company, JobStatus.APPROVED);

        if(approvedJobs.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","No jobs found!"));
        }

        List<JobResponseDTO> jobList = approvedJobs.stream().map(JobResponseDTO::new).toList();
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Approved Jobs Fetched Successfully",jobList));
    }

    // get all rejected status jobs by admin
    public ResponseEntity<?> getAllRejectedJobs(Integer companyId) {
        Company company= companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found with this ID: "+companyId));

        List<Job> rejectedJobs= jobRepository.findByCompanyAndStatus(company, JobStatus.REJECTED);

        if(rejectedJobs.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","No jobs found!"));
        }

        List<JobResponseDTO> jobList = rejectedJobs.stream().map(JobResponseDTO::new).toList();
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Rejected Jobs Fetched Successfully",jobList));
    }

    // get all pending status jobs by admin
    public ResponseEntity<?> getAllPendingJobs(Integer companyId) {
        Company company= companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found with this ID: "+companyId));

        List<Job> pendingJobs= jobRepository.findByCompanyAndStatus(company, JobStatus.PENDING);

        if(pendingJobs.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","No jobs were pending!"));
        }

        List<JobResponseDTO> jobList = pendingJobs.stream().map(JobResponseDTO::new).toList();
        return ResponseEntity.ok(jobList);
    }


    // all activate jobs
    public ResponseEntity<?> getActiveJobs(Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found with this ID: "+companyId));
        List<Job> jobs = jobRepository.findByCompanyAndActiveAndStatus(company,true,JobStatus.APPROVED);

        if(jobs.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","No jobs were active"));
        }

        List<JobResponseDTO> jobList = jobs.stream().map(JobResponseDTO::new).toList();
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Active Jobs Fetched Successfully",jobList));
    }


    // all deactivate jobs
    public ResponseEntity<?> getExpiredJobs(Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found with this ID: "+companyId));
        List<Job> jobs = jobRepository.findByCompanyAndActiveAndStatus(company,false, JobStatus.REJECTED);

        if(jobs.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","No jobs were Expired"));
        }

        List<JobResponseDTO> jobList = jobs.stream().map(JobResponseDTO::new).toList();
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Expired Jobs Fetched Successfully",jobList));
    }

    public ResponseEntity<?> getAwaitingReviewJobs(Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found with this ID: "+companyId));
        List<Job> jobs = jobRepository.findByCompanyAndActiveAndStatus(company,false, JobStatus.PENDING);

        if(jobs.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","No jobs were Awaiting Review"));
        }

        List<JobResponseDTO> jobList = jobs.stream().map(JobResponseDTO::new).toList();
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Awaiting Review Jobs Fetched Successfully",jobList));
    }

    // get shortlisted applications
    public ResponseEntity<?> getShortlistedApplications(Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found!"));
        List<JobApplication> jobApplications = jobApplicationRepository.findByStatusAndJob_Company(ApplicationStatus.SHORTLISTED,company);

        if(jobApplications.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","No applications were shortlisted!"));
        }
        List<JobApplicationStatusDTO> jobApplicationList = jobApplications.stream().map(JobApplicationStatusDTO::new).toList();
        return ResponseEntity.ok(jobApplicationList);
    }

    // get selected applications
    public ResponseEntity<?> getSelectedApplications(Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found!"));
        List<JobApplication> jobApplications = jobApplicationRepository.findByStatusAndJob_Company(ApplicationStatus.SELECTED,company);

        if(jobApplications.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","No applications were selected!"));
        }
        List<JobApplicationStatusDTO> jobApplicationList = jobApplications.stream().map(JobApplicationStatusDTO::new).toList();
        return ResponseEntity.ok(jobApplicationList);
    }

    // get rejected applications
    public ResponseEntity<?> getRejectedApplications(Integer companyId) {
        Company company = companyRepository.findByUser_UserId(companyId).orElseThrow(()-> new NotFoundException("Company not found!"));
        List<JobApplication> jobApplications = jobApplicationRepository.findByStatusAndJob_Company(ApplicationStatus.REJECTED,company);

        if(jobApplications.isEmpty()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","No applications were rejected!"));
        }
        List<JobApplicationStatusDTO> jobApplicationList = jobApplications.stream().map(JobApplicationStatusDTO::new).toList();
        return ResponseEntity.ok(jobApplicationList);
    }

    public ResponseEntity<ApiResponseDTO> getCurrentCompany(MyUserDetails userDetails) {
        Company company = companyRepository.findByEmail(userDetails.getUsername()).orElseThrow(()-> new NotFoundException("Session Expired! Please login again"));

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Company Fetched Successfully",new CompanyResponseDTO(company)));
    }


    // company analytics
    public ResponseEntity<?> getJobCount(String email) {
        Company company = companyRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Company Not found"));

        Long jobCount = jobRepository.countByCompany(company);
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success", "Fetched Successfully",jobCount));
    }


    public ResponseEntity<?> getApplicantsCount(String email) {
        Company company = companyRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Company Not found"));

        Long jobCount = jobApplicationRepository.countByCompany(company);
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success", "Fetched Successfully",jobCount));
    }

    public ResponseEntity<?> getApprovedJobsCount(String email) {
        Company company = companyRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Company Not found"));

        Long approvedJobsCount = jobRepository.countByCompanyAndStatus(company, JobStatus.APPROVED);
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success", "Fetched Successfully",approvedJobsCount));
    }

    public ResponseEntity<?> getRejectedJobsCount(String email) {
        Company company = companyRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Company Not found"));

        Long rejectedJobsCount = jobRepository.countByCompanyAndStatus(company, JobStatus.REJECTED);
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success", "Fetched Successfully",rejectedJobsCount));
    }

    public ResponseEntity<?> getPendingJobsCount(String email) {
        Company company = companyRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Company Not found"));

        Long pendingJobsCount = jobRepository.countByCompanyAndStatus(company, JobStatus.PENDING);
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success", "Fetched Successfully",pendingJobsCount));
    }

    public ResponseEntity<?> getActiveJobsCount(String email) {
        Company company = companyRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Company Not found"));

        Long activeJobsCount = jobRepository.countByCompanyAndActiveAndStatus(company, true, JobStatus.APPROVED);
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success", "Active Jobs count Fetched Successfully",activeJobsCount));
    }

    public ResponseEntity<?> getExpiredJobsCount(String email) {
        Company company = companyRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Company Not found"));

        Long expiredJobsCount = jobRepository.countByCompanyAndActiveAndStatus(company, false, JobStatus.REJECTED);
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success", "Expired Jobs count Fetched Successfully",expiredJobsCount));
    }

    public ResponseEntity<?> getAwaitingReviewJobsCount(String email) {
        Company company = companyRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Company Not found"));

        Long awaitingJobsCount = jobRepository.countByCompanyAndActiveAndStatus(company, false, JobStatus.PENDING);
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success", "Awaiting Jobs count Fetched Successfully",awaitingJobsCount));
    }
}

