package com.vaultAI.backend.model;

public class ProfileResponse {

    private String username;
    private int watchlistCount;

    public ProfileResponse(String username, int watchlistCount) {
        this.username = username;
        this.watchlistCount = watchlistCount;
    }

    public String getUsername() {
        return username;
    }

    public int getWatchlistCount() {
        return watchlistCount;
    }
}