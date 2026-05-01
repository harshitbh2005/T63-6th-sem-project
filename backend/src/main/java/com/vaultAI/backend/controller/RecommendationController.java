package com.vaultai.backend.controller;

import com.vaultai.backend.repository.PortfolioRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin
public class RecommendationController {

    private final PortfolioRepository portfolioRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public RecommendationController(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    @GetMapping
    public List<Map<String, Object>> getRecommendations() {

        // 🔥 get coins from DB
        List<String> userCoins = portfolioRepository.findAll()
                .stream()
                .map(p -> p.getSymbol().toLowerCase())
                .toList();

        String url = "http://127.0.0.1:8000/predict";

        try {
            // 🔥 send to ML and get JSON directly
            List response = restTemplate.postForObject(url, userCoins, List.class);
            return response;
        } catch (Exception e) {
            e.printStackTrace();

            // 🔥 fallback so frontend doesn't hang
            return List.of(
                    Map.of(
                            "coin", "error",
                            "action", "HOLD",
                            "reason", "ML service not responding"
                    )
            );
        }
    }
}