package com.digitallibrary.serviceImpl;

import com.digitallibrary.dto.AuthResponse;
import com.digitallibrary.dto.LoginRequest;
import com.digitallibrary.dto.RegisterRequest;
import com.digitallibrary.entity.User;
import com.digitallibrary.repository.UserRepository;
import com.digitallibrary.security.CustomUserDetailsService;
import com.digitallibrary.security.JwtUtil;
import com.digitallibrary.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private CustomUserDetailsService userDetailsService;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.USER);
        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        return new AuthResponse(token, user.getEmail(), user.getName(), user.getRole().name(), user.getId());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String defaultAdminEmail = "manatwork7756@gmail.com";
        String defaultAdminPassword = "#Abhino@1";

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        // If user not found and credentials match default admin, create admin user
        if (user == null && request.getEmail().equalsIgnoreCase(defaultAdminEmail) && request.getPassword().equals(defaultAdminPassword)) {
            user = new User();
            user.setName("Abhishek Singh");
            user.setEmail(defaultAdminEmail);
            user.setPassword(passwordEncoder.encode(defaultAdminPassword));
            user.setRole(User.Role.ADMIN);
            userRepository.save(user);
        }

        if (user == null) {
            throw new RuntimeException("User not found!");
        }

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        return new AuthResponse(token, user.getEmail(), user.getName(), user.getRole().name(), user.getId());
    }
}
