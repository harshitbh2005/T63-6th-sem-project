package com.vaultAI.backend.controller;

import com.vaultAI.backend.model.ProfileResponse;
import com.vaultAI.backend.service.WatchlistService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final WatchlistService service;

    public UserController(WatchlistService service) {
        this.service = service;
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile() {
        return new ProfileResponse("harshit1", service.count());
    }
}