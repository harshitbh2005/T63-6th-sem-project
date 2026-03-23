package com.vaultAI.backend.model;

import jakarta.persistence.*;

@Entity
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symbol;
    private String name;
    private double price;

    // ✅ NEW: link to user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Watchlist() {}

    public Watchlist(String symbol, String name, double price, User user) {
        this.symbol = symbol;
        this.name = name;
        this.price = price;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public User getUser() {
        return user;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setUser(User user) {
        this.user = user;
    }
}