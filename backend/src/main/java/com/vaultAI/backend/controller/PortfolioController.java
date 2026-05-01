package com.vaultai.backend.controller;

import com.vaultai.backend.model.Portfolio;
import com.vaultai.backend.repository.PortfolioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin
public class PortfolioController {

    private final PortfolioRepository portfolioRepository;

    public PortfolioController(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    // ✅ GET all portfolio
    @GetMapping
    public List<Portfolio> getPortfolio() {
        return portfolioRepository.findAll();
    }

    // ✅ ADD coin
    @PostMapping
    public Portfolio addPortfolio(@RequestBody Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    // ✅ DELETE coin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        portfolioRepository.deleteById(id);
    }
}