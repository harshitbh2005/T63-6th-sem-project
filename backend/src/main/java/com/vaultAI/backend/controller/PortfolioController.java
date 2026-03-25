package com.vaultAI.backend.controller;

import com.vaultAI.backend.model.Portfolio;
import com.vaultAI.backend.service.PortfolioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioController {

    private final PortfolioService service;

    public PortfolioController(PortfolioService service) {
        this.service = service;
    }

    // Add investment
    @PostMapping
    public Portfolio add(@RequestBody Portfolio portfolio) {
        return service.add(portfolio);
    }

    // Get all investments
    @GetMapping
    public List<Portfolio> getAll() {
        return service.getAll();
    }
}