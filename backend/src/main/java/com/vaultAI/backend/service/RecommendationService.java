package com.vaultai.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RecommendationService {

    private final RestTemplate restTemplate = new RestTemplate();

    public String getRecommendations() {
        String url = "http://localhost:8000/predict";
        return restTemplate.getForObject(url, String.class);
    }
}