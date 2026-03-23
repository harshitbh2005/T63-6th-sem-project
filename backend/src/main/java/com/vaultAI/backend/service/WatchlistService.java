package com.vaultAI.backend.service;

import com.vaultAI.backend.model.Watchlist;
import com.vaultAI.backend.repository.WatchlistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistService {

    private final WatchlistRepository repository;

    public WatchlistService(WatchlistRepository repository) {
        this.repository = repository;
    }

    public Watchlist add(Watchlist watchlist) {
        return repository.save(watchlist);
    }

    public List<Watchlist> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }


    public int count() {
        return repository.findAll().size();
    }
}