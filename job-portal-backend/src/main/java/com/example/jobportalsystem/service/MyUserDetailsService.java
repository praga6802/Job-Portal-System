package com.example.jobportalsystem.service;


import com.example.jobportalsystem.entity.Users;
import com.example.jobportalsystem.pojo.MyUserDetails;
import com.example.jobportalsystem.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("Email not found"));
        return new MyUserDetails(user);
    }
}
