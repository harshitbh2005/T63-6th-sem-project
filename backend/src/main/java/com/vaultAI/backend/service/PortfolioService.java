package com.vaultAI.backend.service;

import com.vaultAI.backend.model.Portfolio;
import com.vaultAI.backend.repository.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    private final PortfolioRepository repository;

    public PortfolioService(PortfolioRepository repository) {
        this.repository = repository;
    }

    // Add investment
    public Portfolio add(Portfolio portfolio) {
        return repository.save(portfolio);
    }

    // Get all investments
    public List<Portfolio> getAll() {
        return repository.findAll();
    }
}