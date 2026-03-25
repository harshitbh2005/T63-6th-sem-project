package com.vaultAI.backend.service;

import com.vaultAI.backend.model.Portfolio;
import com.vaultAI.backend.repository.PortfolioRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class PortfolioService {

    private final PortfolioRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();

    public PortfolioService(PortfolioRepository repository) {
        this.repository = repository;
    }

    public Portfolio add(Portfolio portfolio) {
        return repository.save(portfolio);
    }

    public List<Map<String, Object>> getAll() {
        List<Portfolio> portfolios = repository.findAll();

        // Fetch live crypto data
        String url = "http://localhost:8080/api/crypto";
        List<Map<String, Object>> cryptoData = restTemplate.getForObject(url, List.class);

        List<Map<String, Object>> result = new ArrayList<>();

        for (Portfolio p : portfolios) {
            double currentPrice = 0;

            for (Map<String, Object> coin : cryptoData) {
                String symbol = ((String) coin.get("symbol")).toUpperCase();

                if (symbol.equals(p.getSymbol().replace("/USD", ""))) {
                    currentPrice = ((Number) coin.get("current_price")).doubleValue();
                    break;
                }
            }

            double investment = p.getBuyPrice() * p.getQuantity();
            double currentValue = currentPrice * p.getQuantity();
            double profit = currentValue - investment;

            Map<String, Object> data = new HashMap<>();
            data.put("symbol", p.getSymbol());
            data.put("quantity", p.getQuantity());
            data.put("buyPrice", p.getBuyPrice());
            data.put("currentPrice", currentPrice);
            data.put("profit", profit);

            result.add(data);
        }

        return result;
    }

    public double getTotalInvestment() {
        return repository.findAll()
                .stream()
                .mapToDouble(p -> p.getBuyPrice() * p.getQuantity())
                .sum();
    }
}