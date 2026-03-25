package com.vaultAI.backend.controller;

import java.util.Map;
import com.vaultAI.backend.model.Portfolio;
import com.vaultAI.backend.service.PortfolioService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioController {

    private final PortfolioService service;

    public PortfolioController(PortfolioService service) {
        this.service = service;
    }

    @PostMapping
    public Portfolio add(@RequestBody Portfolio portfolio) {
        return service.add(portfolio);
    }

    @GetMapping
    public List<Map<String, Object>> getAll() {
        return service.getAll();
    }

    // ✅ NEW: total investment API
    @GetMapping("/summary")
    public Map<String, Double> getSummary() {
        return service.getSummary();
    }
}