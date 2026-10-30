package com.example.jobportalsystem.filter;


import com.example.jobportalsystem.pojo.MyUserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import com.example.jobportalsystem.service.JWTService;
import com.example.jobportalsystem.service.MyUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTValidationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private ApplicationContext context;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();

        return path.equals("/auth/jobs")
                || path.equals("/auth/categories")
                ||path.equals("/auth/contact")
                || path.equals("/auth/login")
                || path.equals("/auth/logout")
                || path.equals("/auth/company/register")
                || path.equals("/auth/candidate/register")
                || path.equals("/auth/candidate/verify-otp")
                || path.equals("/auth/admin/register");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader=request.getHeader("Authorization");
        String token="";
        String username="";

        String path=request.getServletPath();
        if(path.equals("/auth/register") || path.equals("/auth/login")){
            filterChain.doFilter(request,response);
            return;
        }

        if(authHeader!=null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                username = jwtService.extractUsername(token);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                    UserDetails userDetails = context.getBean(MyUserDetailsService.class).loadUserByUsername(username);

                    if (jwtService.validateToken(token, userDetails)) {
                        Integer tokenVersion = jwtService.extractTokenVersion(token);

                        MyUserDetails myUserDetails = (MyUserDetails) userDetails;
                        Integer currentTokenVersion = myUserDetails.getUser().getTokenVersion();

                        if (!tokenVersion.equals(currentTokenVersion)) {
                            response.setStatus(HttpServletResponse.SC_CONFLICT);
                            response.setContentType("application/json");
                            response.getWriter().write(
                                    "{\"status\":\"Failure\",\"message\":\"Session Expired! Please Log In again!\"}"
                            );
                            return;
                        }

                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        System.out.println("Username: " + userDetails.getUsername());
                        System.out.println("Authorities: " + userDetails.getAuthorities());

                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }
            }
            catch (ExpiredJwtException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write(
                        "{\"message\":\"Token expired. Please log in again.\"}"
                );
                return;
            }
            catch (JwtException | IllegalArgumentException e) {
                response.setContentType("application/json");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write(
                        "{\"message\":\"Invalid token. Please log in again.\"}"
                );
                return;
            }
        }
        filterChain.doFilter(request,response);
    }
}
