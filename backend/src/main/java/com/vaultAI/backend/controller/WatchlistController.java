package com.vaultai.backend.controller;

import com.vaultai.backend.model.Watchlist;
import com.vaultai.backend.service.WatchlistService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WatchlistController {

    private final WatchlistService service;

    public WatchlistController(WatchlistService service) {
        this.service = service;
    }

    @PostMapping
    public Watchlist add(@RequestBody Watchlist watchlist) {
        return service.add(watchlist);
    }

    @GetMapping
    public List<Watchlist> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}