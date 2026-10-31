package com.example.jobportalsystem.service;

import com.example.jobportalsystem.dto.*;
import com.example.jobportalsystem.entity.*;
import com.example.jobportalsystem.enums.ApplicationStatus;
import com.example.jobportalsystem.enums.JobStatus;
import com.example.jobportalsystem.exception.NotFoundException;
import com.example.jobportalsystem.pojo.MyUserDetails;
import com.example.jobportalsystem.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private VerificationRepository verificationRepository;

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

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerifyCandidateRepository verifyCandidateRepository;

    @Autowired
    private EmailUpdateRepository emailUpdateRepository;


    // candidate registration
    public ResponseEntity<?> register(CandidateRegisterDTO candidate) {

        if (candidateRepository.existsByEmail(candidate.getEmail()) || usersRepository.existsByEmail(candidate.getEmail()) || verifyCandidateRepository.existsByEmail(candidate.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponseDTO(LocalDateTime.now(), "Failure", "Email already exists!"));
        }

        if (candidateRepository.existsByContact(candidate.getContact()) || verifyCandidateRepository.existsByContact(candidate.getContact())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponseDTO(LocalDateTime.now(), "Failure", "Mobile Number already exists!"));
        }

        //storing candidate temporarily
        VerifyCandidate verifyCandidate = new VerifyCandidate();
        if (candidate.getFirstname() != null && !candidate.getFirstname().isBlank()) {
            verifyCandidate.setFirstname(candidate.getFirstname().trim());
        }

        if (candidate.getLastname() != null && !candidate.getLastname().isBlank()) {
            verifyCandidate.setLastname(candidate.getLastname().trim());
        }

        if (candidate.getEmail() != null && !candidate.getEmail().isBlank()) {
            verifyCandidate.setEmail(candidate.getEmail().trim().toLowerCase());
        }

        if (candidate.getPassword() != null && !candidate.getPassword().isBlank()) {
            verifyCandidate.setPassword(passwordEncoder.encode(candidate.getPassword().trim()));
        }

        if (candidate.getContact() != null && !candidate.getContact().isBlank()) {
            verifyCandidate.setContact(candidate.getContact().trim());
        }

        if (candidate.getLocation() != null && !candidate.getLocation().isBlank()) {
            verifyCandidate.setLocation(candidate.getLocation().trim());
        }

        if (candidate.getDob() != null) {
            verifyCandidate.setDateOfBirth(candidate.getDob());
        }

        if (candidate.getExperience() != null && !candidate.getExperience().isBlank()) {
            verifyCandidate.setExperience(candidate.getExperience().trim());
        }

        if (candidate.getSkills() != null && !candidate.getSkills().isBlank()) {
            verifyCandidate.setSkills(candidate.getSkills().trim());
        }

        verifyCandidate.setCreatedAt(LocalDateTime.now());
        verifyCandidateRepository.save(verifyCandidate);

        return verifyEmail(candidate.getEmail());
    }

    // Update Candidate Details
    @Transactional
    public ResponseEntity<?> updateCandidate(Integer userId, CandidateRegisterDTO candidate) {
        List<String> updatedFields = new ArrayList<>();
        String newToken = null;

        Candidate cand = candidateRepository.findByUser_UserId(userId).orElseThrow(() -> new NotFoundException("Candidate not found!"));


        if (candidate.getFirstname() != null && !candidate.getFirstname().trim().isEmpty()) {
            cand.setFirstname(candidate.getFirstname().trim());
            updatedFields.add("First name");
        }

        if (candidate.getLastname() != null && !candidate.getLastname().trim().isEmpty()) {
            cand.setLastname(candidate.getLastname().trim());
            updatedFields.add("Last name");
        }

        if (candidate.getEmail() != null && !candidate.getEmail().trim().isEmpty()) {
            if (candidateRepository.existsByEmailAndCandidateIdNot(candidate.getEmail(), cand.getCandidateId()) || usersRepository.existsByEmailAndUserIdNot(candidate.getEmail(), cand.getUser().getUserId())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "Email already taken!"));
            }
            VerifyCandidate verifyCandidate = verifyCandidateRepository.findByEmail(candidate.getEmail()).orElseGet(VerifyCandidate::new);
            verifyCandidate.setEmail(candidate.getEmail());
            verifyCandidateRepository.save(verifyCandidate);

            return verifyEmail(candidate.getEmail());
        }

        if (candidate.getContact() != null && !candidate.getContact().trim().isEmpty()) {

            if (candidateRepository.existsByContactAndCandidateIdNot(candidate.getContact(),cand.getCandidateId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "Contact already registered!"));
            }
            cand.setContact(candidate.getContact().trim());
            updatedFields.add("Contact");
        }

        if (candidate.getDob() != null) {
            cand.setDateOfBirth(candidate.getDob());
            updatedFields.add("Date of Birth");
        }

        if (candidate.getExperience() != null && !candidate.getExperience().trim().isEmpty()) {
            cand.setExperience(candidate.getExperience().trim());
            updatedFields.add("Experience");
        }

        if (candidate.getSkills() != null && !candidate.getSkills().trim().isEmpty()) {
            cand.setSkills(candidate.getSkills().trim());
            updatedFields.add("Skills");
        }

        if (candidate.getLocation() != null && !candidate.getLocation().trim().isEmpty()) {
            cand.setLocation(candidate.getSkills().trim());
            updatedFields.add("Location");
        }
        candidateRepository.save(cand);


        String message = "Candidate " + String.join(",", updatedFields) + " Updated Successfully!";
        if (newToken != null) {
            return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(), "Success", message, newToken));
        }
        return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(), "Success", message));
    }


    // apply job
    public ResponseEntity<?> applyJob(Integer jobId, Integer userId) {
        Candidate candidate = candidateRepository.findByUser_UserId(userId).orElseThrow(()-> new NotFoundException("Candidate not found"));
        Integer candidateId =candidate.getCandidateId();

        Resume resume = resumeRepository.findByCandidate_CandidateId(candidateId).orElseThrow(() -> new NotFoundException("No resume found, upload Resume to apply job"));
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new NotFoundException("Job not found with id: " + jobId));


        if (job.getStatus() != JobStatus.APPROVED) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "Job is not approved by admin!"));
        }
        if (!job.isActive()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No longer accepting applications!"));
        }

        if (jobApplicationRepository.existsByCandidate_CandidateIdAndJob_JobId(candidate.getCandidateId(), job.getJobId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "You have already applied for this job!"));
        }

        JobApplication jobApplication = new JobApplication();
        jobApplication.setCandidate(candidate);
        jobApplication.setJob(job);
        jobApplication.setResume(resume);
        jobApplication.setCompany(job.getCompany());
        jobApplicationRepository.save(jobApplication);

        emailService.sendEmail(
                new EmailRequestDTO(
                        candidate.getEmail(),
                        "Job Application Submitted - Job Portal",
                        "Hello, " + candidate.getFirstname() + " " + candidate.getLastname()+"!" +
                                "Your job application has been successfully submitted.\n\n" +
                                "Here are your application details:\n" +
                                "Job Title: " + job.getTitle() + "\n" +
                                "Company Name: " + job.getCompany().getName() + "\n" +
                                "Application ID: " + jobApplication.getId() + "\n" +
                                "Applied Date: " + jobApplication.getAppliedAt().toLocalDate() + "\n" +
                                "Application Status: " + jobApplication.getStatus() + "\n\n" +

                                "You can track your application status by logging into your Smart Job Portal account\n"+
                                "Thank you for using Smart Job Portal. We wish you the best of luck!\n\n" +

                                "Regards,\n" +
                                "Job Portal Team"
                )
        );

        return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(), "Success", "Job Applied Successfully"));
    }



    // get job by company
    public ResponseEntity<?> getJobsByCompany(String companyName) {
        Company company = companyRepository.findByName(companyName).orElseThrow(() -> new NotFoundException("Company not found"));

        List<Job> companyJobList = jobRepository.findByCompanyAndStatusAndActive(company, JobStatus.APPROVED, true);
        if (companyJobList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No jobs were found!"));
        }

        List<JobResponseDTO> jobList = companyJobList.stream().map(JobResponseDTO::new).toList();
        return ResponseEntity.ok(jobList);
    }



    // view application status
    public ResponseEntity<?> viewAppliedJobs(Integer candidateId) {
        Candidate candidate = candidateRepository.findByUser_UserId(candidateId).orElseThrow(() -> new NotFoundException("Candidate not found with id: " + candidateId));

        List<JobApplication> jobApplications = jobApplicationRepository.findByCandidate(candidate);

        if (jobApplications.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No jobs were applied!"));
        }

        List<ApplicationStatusDTO> appliedJobs = jobApplications.stream().map(ApplicationStatusDTO::new).toList();
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Applied Jobs Fetched Successfully",appliedJobs));
    }

    public ResponseEntity<?> viewSelectedApplications(Integer userId) {

        Candidate candidate = candidateRepository.findByUser_UserId(userId).orElseThrow(() -> new NotFoundException("Candidate not found with id: " + userId));

        List<JobApplication> jobApplications = jobApplicationRepository.findByCandidateAndStatus(candidate,ApplicationStatus.SELECTED);

        if (jobApplications.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No SELECTED applications found!"));
        }

        List<ApplicationStatusDTO> selectedApplications = jobApplications.stream().map(ApplicationStatusDTO::new).toList();
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","SELECTED Applications Fetched Successfully",selectedApplications));
    }

    public ResponseEntity<?> viewRejectedApplications(Integer userId) {

        Candidate candidate = candidateRepository.findByUser_UserId(userId).orElseThrow(() -> new NotFoundException("Candidate not found with id: " + userId));

        List<JobApplication> jobApplications = jobApplicationRepository.findByCandidateAndStatus(candidate,ApplicationStatus.REJECTED);

        if (jobApplications.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No REJECTED applications found!"));
        }

        List<ApplicationStatusDTO> rejectedApplications = jobApplications.stream().map(ApplicationStatusDTO::new).toList();
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","REJECTED Applications Fetched Successfully",rejectedApplications));
    }

    public ResponseEntity<?> viewShortlistedApplications(Integer userId) {

        Candidate candidate = candidateRepository.findByUser_UserId(userId).orElseThrow(() -> new NotFoundException("Candidate not found with id: " + userId));

        List<JobApplication> jobApplications = jobApplicationRepository.findByCandidateAndStatus(candidate,ApplicationStatus.SHORTLISTED);

        if (jobApplications.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No SHORTLISTED applications found!"));
        }

        List<ApplicationStatusDTO> shortlistedApplications = jobApplications.stream().map(ApplicationStatusDTO::new).toList();
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","SHORTLISTED Applications Fetched Successfully",shortlistedApplications));
    }

    public ResponseEntity<?> viewUnderReviewApplications(Integer userId) {

        Candidate candidate = candidateRepository.findByUser_UserId(userId).orElseThrow(() -> new NotFoundException("Candidate not found with id: " + userId));

        List<JobApplication> jobApplications = jobApplicationRepository.findByCandidateAndStatus(candidate,ApplicationStatus.UNDER_REVIEW);

        if (jobApplications.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new LoginResponseDTO(LocalDateTime.now(), "Failure", "No UNDER-REVIEW applications found!"));
        }

        List<ApplicationStatusDTO> underReviewApplications = jobApplications.stream().map(ApplicationStatusDTO::new).toList();
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","UNDER-REVIEW Applications Fetched Successfully",underReviewApplications));
    }

    // RESUME FEATURES
    // upload resume
    public ResponseEntity<?> uploadResume(MultipartFile file, Integer candidateId) throws IOException {
        Candidate candidate = candidateRepository.findByUser_UserId(candidateId).orElseThrow(() -> new NotFoundException("Candidate not found with ID: " + candidateId));

        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseDTO(LocalDateTime.now(), "Failure","File cannot be empty"));
        }

        // Validate file type
        String fileType = file.getContentType();

        if (!("application/pdf".equals(fileType) || "application/vnd.openxmlformats-officedocument.wordprocessingml.document".equals(fileType))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseDTO(LocalDateTime.now(), "Failure", "Only PDF or DOCX files are allowed"));
        }

        // Validate original filename
        String reqFileName = file.getOriginalFilename();

        if (reqFileName == null || !reqFileName.contains(".")) {
            return ResponseEntity.badRequest().body(new ApiResponseDTO(LocalDateTime.now(), "Failure", "Invalid file name"));
        }

        // Create absolute directory path
        Path uploadPath = Paths.get(
                System.getProperty("user.dir"),
                "uploads",
                "resume",
                "CAND_" + candidateId
        ).toAbsolutePath().normalize();

        // Create directory if it doesn't exist
        Files.createDirectories(uploadPath);

        // Get file extension
        String extension = reqFileName.substring(reqFileName.lastIndexOf("."));

        // Create filename
        String fileName = candidate.getFirstname() + "_" + candidate.getLastname() + extension;

        // Create absolute file path
        Path filePath = uploadPath.resolve(fileName);

        // Delete existing resume if available
        Optional<Resume> existingResume = resumeRepository.findByCandidate(candidate);

        Resume resume;

        if (existingResume.isPresent()) {

            resume = existingResume.get();

            // Delete old physical file
            String oldFilePath = resume.getFilePath();

            if (oldFilePath != null && !oldFilePath.isBlank()) {
                Files.deleteIfExists(Paths.get(oldFilePath));
            }

        } else {
            resume = new Resume();
        }

        // Save new file
        Files.write(filePath, file.getBytes());

        resume.setFileName(fileName);
        resume.setFilePath(filePath.toString());
        resume.setCandidate(candidate);
        resumeRepository.save(resume);

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(), "Success", "Resume Uploaded successfully"));

    }


    //delete resume
    public ResponseEntity<?> deleteResume(Integer candidateId) throws IOException{
        Candidate candidate = candidateRepository.findByUser_UserId(candidateId).orElseThrow(() -> new NotFoundException("Candidate not found with this ID: ", candidateId));
        Resume resume = resumeRepository.findByCandidate(candidate).orElseThrow(()-> new NotFoundException("No Resume found for "+candidate.getFirstname()));
        String resumePath=resume.getFilePath();

        if (resumePath == null || resumePath.isBlank()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponseDTO(LocalDateTime.now(),"Failure","Resume File is missing!"));
        }

        Path path=Paths.get(resumePath);
        Files.deleteIfExists(path);
        resumeRepository.delete(resume);
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Resume Deleted Successfully"));
    }



    //view resume
    public ResponseEntity<?> viewResume(Integer candidateId) throws IOException {

        Candidate candidate = candidateRepository.findByUser_UserId(candidateId).orElseThrow(() -> new NotFoundException("Candidate not found with this ID: ", candidateId));
        Resume resume = resumeRepository.findByCandidate(candidate).orElseThrow(() -> new NotFoundException("No Resume found for " + candidate.getFirstname()));

        String resumePath = resume.getFilePath();

        if (resumePath == null || resumePath.isBlank()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponseDTO(LocalDateTime.now(), "Failure", "Resume file is missing!"));
        }

        Path path = Paths.get(resumePath).toAbsolutePath().normalize();
        System.out.println(path);
        System.out.println(Files.exists(path));
        System.out.println(Files.isRegularFile(path));

        if (!Files.exists(path) || !Files.isRegularFile(path)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponseDTO(LocalDateTime.now(), "Failure", "Resume file does not exist on the server!"));
        }

        byte[] fileBytes = Files.readAllBytes(path);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(
                ContentDisposition.inline()
                        .filename(path.getFileName().toString())
                        .build());

        return new ResponseEntity<>(fileBytes, headers, HttpStatus.OK);
    }

    // download resume
    public ResponseEntity<?> downloadResume(Integer candidateId) throws IOException {
        Candidate candidate = candidateRepository.findByUser_UserId(candidateId).orElseThrow(() -> new NotFoundException("Candidate not found for this ID: "+candidateId));

        Resume resume = resumeRepository.findByCandidate(candidate).orElseThrow(()-> new NotFoundException("No Resume found for "+candidate.getFirstname()));
        String resumePath=resume.getFilePath();

        if (resumePath == null || resumePath.isBlank()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponseDTO(LocalDateTime.now(),"Failure","Resume file is missing"));
        }

        Path path=Paths.get(resumePath);
        byte[] fileBytes=Files.readAllBytes(path);

        HttpHeaders header= new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        header.setContentDisposition(ContentDisposition.attachment().filename(path.getFileName().toString()).build());
        return new ResponseEntity<>(fileBytes,header,HttpStatus.OK);
    }

    // verify candidate email and sent OTP
    public ResponseEntity<?> verifyEmail(String email) {

        String candidateName = verifyCandidateRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Candidate not found")).getFirstname();
        int otp=100000+new Random().nextInt(900000);

        Verification verification=new Verification();
        verification.setEmail(email);
        verification.setOtp(String.valueOf(otp));
        verification.setExpiresAt(LocalDateTime.now().plusMinutes(10));
        verification.setVerified(false);
        verification.setUsed(false);

        verificationRepository.save(verification);

        emailService.sendEmail(
                new EmailRequestDTO(email, "Email Verification - Smart Job Portal",
                        "Hello, " + candidateName + "\n\n" +
                        "Thank you for registering with Smart Job Portal.\n\n" +
                        "Your One-Time Password (OTP) for email verification is:\n\n" +
                        "OTP: " + otp + "\n\n" +
                        "This OTP is valid for 10 minutes. Please do not share this OTP with anyone.\n\n" +
                        "If you did not initiate this registration, you can safely ignore this email.\n\n" +
                        "Regards,\n" +
                        "Smart Job Portal Team"
                )
        );

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(), "Success", "OTP has been sent to your Email: "+email));
    }

    // verify OTP for register user
    public ResponseEntity<?> verifyOtp(String email, String otp) {

        VerifyCandidate verifyCandidate = verifyCandidateRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Email not matches!"));

        Verification verification = verificationRepository.findByEmailAndOtpAndIsUsedFalse(email,otp)
                .orElseThrow(()-> new NotFoundException("Invalid OTP: "+otp));

        if(verification.getExpiresAt().isBefore(LocalDateTime.now())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","OTP has expired!"));
        }


        // create user details
        Users user = new Users();
        user.setEmail(verifyCandidate.getEmail());
        user.setPassword(verifyCandidate.getPassword());
        user.setRole("CANDIDATE");
        usersRepository.save(user);

        // create candidate details
        Candidate newCandidate = new Candidate();
        newCandidate.setFirstname(verifyCandidate.getFirstname());
        newCandidate.setLastname(verifyCandidate.getLastname());
        newCandidate.setEmail(verifyCandidate.getEmail());
        newCandidate.setContact(verifyCandidate.getContact());
        newCandidate.setDateOfBirth(verifyCandidate.getDateOfBirth());
        newCandidate.setExperience(verifyCandidate.getExperience());
        newCandidate.setSkills(verifyCandidate.getSkills());
        newCandidate.setUser(user);
        newCandidate.setVerified(true);

        candidateRepository.save(newCandidate);

        verification.setUsed(true); // otp is used
        verification.setVerified(true); // email is verified
        verificationRepository.save(verification);


        // send welcome email after successful registration
        EmailRequestDTO emailDTO = new EmailRequestDTO();
        emailDTO.setToEmail(verifyCandidate.getEmail());
        emailDTO.setSubject("Welcome to Smart Job Portal – Your Career Journey Starts Here!");
        emailDTO.setDescription(
                "Hi "+newCandidate.getFirstname() + " "+newCandidate.getLastname()+", \n\n"+
                "Welcome to Smart Job Portal!" + "\n" +
                "Your registration was successful. \n\n" +
                "Go ahead, explore new job opportunities, apply for your dream job, and get hired faster with our platform! \n\n" +
                "Best wishes,\n" +
                "Smart Job Portal Team"
        );
        emailService.sendEmail(emailDTO);

        verifyCandidateRepository.delete(verifyCandidate); // delete temporary candidate details
        verificationRepository.delete(verification);

        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponseDTO(LocalDateTime.now(),"Success", "SignUp Successfully!"));
    }

    // verify otp for email update
    public ResponseEntity<?> verifyEmailUpdate(String otp, Integer userId) {
        Verification verification = verificationRepository.findByOtpAndIsUsedFalse(otp)
                .orElseThrow(()-> new NotFoundException("Invalid OTP: "+otp));

        if(verification.getExpiresAt().isBefore(LocalDateTime.now())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new LoginResponseDTO(LocalDateTime.now(),"Failure","OTP has expired!"));
        }

        VerifyCandidate verifyCandidate = verifyCandidateRepository.findByEmail(verification.getEmail()).orElseThrow(()-> new NotFoundException("New email not found"));


        Users users = usersRepository.findById(userId).orElseThrow(()-> new NotFoundException("User not found!"));
        Candidate candidate = candidateRepository.findByUser_UserId(userId).orElseThrow(()-> new NotFoundException("Candidate not found!"));

        users.setEmail(verifyCandidate.getEmail());
        usersRepository.save(users);

        candidate.setEmail(verifyCandidate.getEmail());
        candidateRepository.save(candidate);

        verification.setVerified(true);
        verification.setUsed(true);
        verificationRepository.save(verification);

        String token = jwtService.generateToken(verifyCandidate.getEmail());

        // send success after new email update
        EmailRequestDTO emailDTO = new EmailRequestDTO();
        emailDTO.setToEmail(verifyCandidate.getEmail());
        emailDTO.setSubject("Email Updation Successful!");
        emailDTO.setDescription(
                "Hi "+ candidate.getFirstname()+" "+candidate.getLastname() +", \n\n"+
                "Your email has been SUCCESSFULLY updated from "+ users.getEmail() + " to " +verifyCandidate.getEmail()+ "\n\n" +
                "Best regards, \n\n" +
                "Smart Job Portal team."
                );

        verifyCandidateRepository.delete(verifyCandidate);
        verificationRepository.delete(verification);

        return ResponseEntity.ok(new LoginResponseDTO(LocalDateTime.now(),"Success","Email Updated Successfully",token));


    }

    public ResponseEntity<ApiResponseDTO> getCurrentCandidate(MyUserDetails userDetails) {
        Candidate candidate = candidateRepository.findByEmail(userDetails.getUsername()).orElseThrow(()-> new NotFoundException("Session Expired! Please try again"));
        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Candidate Fetched Successfully",new CandidateResponseDTO(candidate)));
    }

    public ResponseEntity<?> viewAppliedJobsCount(Integer userId) {
        Candidate candidate = candidateRepository.findByUser_UserId(userId).orElseThrow(()-> new NotFoundException("Candidate not found"));

        Long appliedJobsCount = jobApplicationRepository.countByCandidate_CandidateId(candidate.getCandidateId());

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Applied Count fetched Successfully",appliedJobsCount));
    }





    public ResponseEntity<?> viewSelectedCount(Integer candidateId) {
        Candidate candidate = candidateRepository.findByUser_UserId(candidateId).orElseThrow(()-> new NotFoundException("Candidate not found"));
        System.out.println("Logged-in candidate ID: " + candidate.getCandidateId());

        Long selectedCount = jobApplicationRepository.countByCandidate_CandidateIdAndStatus(candidate.getCandidateId(), ApplicationStatus.SELECTED);

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Selected Count fetched Successfully",selectedCount));

    }

    public ResponseEntity<?> viewRejectedCount(Integer candidateId) {
        Candidate candidate = candidateRepository.findByUser_UserId(candidateId).orElseThrow(()-> new NotFoundException("Candidate not found"));
        System.out.println("Logged-in candidate ID: " + candidate.getCandidateId());

        Long rejectedCount = jobApplicationRepository.countByCandidate_CandidateIdAndStatus(candidate.getCandidateId(), ApplicationStatus.REJECTED);

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Rejected Count fetched Successfully",rejectedCount));
    }


    public ResponseEntity<?> viewShortlistedCount(Integer candidateId) {
        Candidate candidate = candidateRepository.findByUser_UserId(candidateId).orElseThrow(()-> new NotFoundException("Candidate not found"));
        System.out.println("Logged-in candidate ID: " + candidate.getCandidateId());

        Long shortlistedCount = jobApplicationRepository.countByCandidate_CandidateIdAndStatus(candidate.getCandidateId(), ApplicationStatus.SHORTLISTED);

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Shortlisted Count fetched Successfully",shortlistedCount));
    }


    public ResponseEntity<?> viewUnderReviewCount(Integer candidateId) {
        Candidate candidate = candidateRepository.findByUser_UserId(candidateId).orElseThrow(()-> new NotFoundException("Candidate not found"));
        System.out.println("Logged-in candidate ID: " + candidate.getCandidateId());

        Long underReviewCount = jobApplicationRepository.countByCandidate_CandidateIdAndStatus(candidate.getCandidateId(), ApplicationStatus.UNDER_REVIEW);

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","UnderReviewCount Count fetched Successfully",underReviewCount));
    }


    public ResponseEntity<?> getCurrentResume(Integer userId) {

        Candidate candidate = candidateRepository.findByUser_UserId(userId).orElseThrow(() -> new NotFoundException("Candidate not found"));

        Optional<Resume> resume = resumeRepository.findByCandidate(candidate);

        Map<String, Object> response = new HashMap<>();

        response.put("status", 200);

        if (resume.isPresent()) {
            response.put("message", "Resume found");

            Map<String, Object> data = new HashMap<>();
            data.put("fileName", resume.get().getFileName());
            data.put("resumeId", resume.get().getResumeId());
            response.put("data", data);

        } else {
            response.put("message", "No resume uploaded");
            response.put("data", null);
        }

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> getAppliedJobIds(Integer userId) {
        Candidate candidate = candidateRepository.findByUser_UserId(userId).orElseThrow(() -> new NotFoundException("Candidate not found"));
        List<Integer> jobsIds = jobApplicationRepository.findAppliedJobIdsByCandidateId(candidate.getCandidateId());
        if(jobsIds.isEmpty()){
            return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","No jobs were applied", Collections.emptyList()));
        }

        return ResponseEntity.ok(new ApiResponseDTO(LocalDateTime.now(),"Success","Applied job IDs fetched successfully", jobsIds));
    }
}
