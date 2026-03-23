package com.vaultAI.backend.controller;

import com.vaultAI.backend.model.User;
import com.vaultAI.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    // Login
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return authService.login(user.getUsername(), user.getPassword());
    }
}