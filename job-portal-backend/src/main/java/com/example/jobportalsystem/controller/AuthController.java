package com.example.jobportalsystem.controller;

import com.example.jobportalsystem.dto.ForgotPasswordDTO;
import com.example.jobportalsystem.dto.LoginRequestDTO;
import com.example.jobportalsystem.dto.LoginResponseDTO;
import com.example.jobportalsystem.pojo.MyUserDetails;
import com.example.jobportalsystem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5500", allowCredentials = "true")
public class AuthController {

    @Autowired
    AuthService authService;

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

}
