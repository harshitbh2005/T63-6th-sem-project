package com.vaultai.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CryptoService {

    private final RestTemplate restTemplate = new RestTemplate();

    private String cachedData = null;
    private long lastFetchTime = 0;

    public String getCryptoData() {
        long currentTime = System.currentTimeMillis();

        // ✅ 10 seconds cache
        if (cachedData != null && (currentTime - lastFetchTime) < 10000) {
            return cachedData;
        }

        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=1";

        cachedData = restTemplate.getForObject(url, String.class);
        lastFetchTime = currentTime;

        return cachedData;
    }
}