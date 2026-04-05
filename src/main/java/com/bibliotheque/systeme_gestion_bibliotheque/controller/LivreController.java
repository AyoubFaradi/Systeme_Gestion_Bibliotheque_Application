package com.bibliotheque.systeme_gestion_bibliotheque.controller;

import com.bibliotheque.systeme_gestion_bibliotheque.entity.Livre;
import com.bibliotheque.systeme_gestion_bibliotheque.service.LivreService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livres")
public class LivreController {

    private final LivreService livreService;

    public LivreController(LivreService livreService) {
        this.livreService = livreService;
    }

    @GetMapping
    public List<Livre> getAllLivres() {
        return livreService.getAllLivres();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livre> getLivreById(@PathVariable Long id) {
        return ResponseEntity.of(livreService.getLivreById(id));
    }

    @PostMapping
    public ResponseEntity<Livre> createLivre(@Valid @RequestBody Livre livre) {
        Livre saved = livreService.saveLivre(livre);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livre> updateLivre(@PathVariable Long id, @Valid @RequestBody Livre livre) {
        Livre updated = livreService.updateLivre(id, livre);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivre(@PathVariable Long id) {
        livreService.deleteLivre(id);
        return ResponseEntity.noContent().build();
    }
}
