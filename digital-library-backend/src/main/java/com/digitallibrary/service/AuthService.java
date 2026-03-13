package com.digitallibrary.service;

import com.digitallibrary.dto.AuthResponse;
import com.digitallibrary.dto.LoginRequest;
import com.digitallibrary.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
