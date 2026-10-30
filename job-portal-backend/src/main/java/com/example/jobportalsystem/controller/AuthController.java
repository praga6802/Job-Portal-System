package com.example.jobportalsystem.controller;

import com.example.jobportalsystem.dto.ForgotPasswordDTO;
import com.example.jobportalsystem.dto.LoginRequestDTO;
import com.example.jobportalsystem.dto.LoginResponseDTO;
import com.example.jobportalsystem.dto.PostQueryDTO;
import com.example.jobportalsystem.pojo.MyUserDetails;
import com.example.jobportalsystem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest){
        return authService.login(loginRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(){
        return authService.logout();
    }


    @PutMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDTO password, @AuthenticationPrincipal MyUserDetails userDetails){
        return authService.forgotPassword(password.getNewPassword(),password.getConfirmPassword(),userDetails.getUserId());
    }

    // get all approved jobs
    @GetMapping("/jobs")
    public ResponseEntity<?> getJobs() {
        return authService.getJobs();
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getJobCategories() {
        return authService.findJobCategoriesWithCount();
    }

    @PostMapping("/contact")
    public ResponseEntity<?> postQuery(@RequestBody PostQueryDTO dto){
        return authService.postQuery(dto);

    }

}
