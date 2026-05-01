package com.vaultai.backend.service;

import com.vaultai.backend.model.Watchlist;
import com.vaultai.backend.repository.WatchlistRepository;
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