package com.vaultAI.backend.service;

import com.vaultAI.backend.model.User;
import com.vaultAI.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register
    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Login
    public User login(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(u -> encoder.matches(password, u.getPassword()))
                .orElse(null);
    }
}