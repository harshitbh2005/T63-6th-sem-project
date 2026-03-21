package com.vaultai.backend.controller;

import com.vaultai.backend.service.CryptoService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CryptoController {

    private final CryptoService cryptoService;

    public CryptoController(CryptoService cryptoService) {
        this.cryptoService = cryptoService;
    }

    @GetMapping("/api/crypto")
    public String getCrypto() {
        return cryptoService.getCryptoData();
    }
}