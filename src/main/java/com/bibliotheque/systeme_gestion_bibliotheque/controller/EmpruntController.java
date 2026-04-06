package com.bibliotheque.systeme_gestion_bibliotheque.controller;

import com.bibliotheque.systeme_gestion_bibliotheque.controller.BorrowRequest;
import com.bibliotheque.systeme_gestion_bibliotheque.entity.Emprunt;
import com.bibliotheque.systeme_gestion_bibliotheque.service.EmpruntService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/emprunts")
public class EmpruntController {

    private final EmpruntService empruntService;

    public EmpruntController(EmpruntService empruntService) {
        this.empruntService = empruntService;
    }

    @GetMapping
    public List<Emprunt> getAllEmprunts() {
        return empruntService.getAllEmprunts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Emprunt> getEmpruntById(@PathVariable Long id) {
        return ResponseEntity.of(empruntService.getEmpruntById(id));
    }

    @PostMapping
    public ResponseEntity<Emprunt> createEmprunt(@Valid @RequestBody Emprunt emprunt) {
        Emprunt saved = empruntService.saveEmprunt(emprunt);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/borrow")
    public ResponseEntity<Emprunt> borrowLivre(@Valid @RequestBody BorrowRequest request) {
        Emprunt emprunt = empruntService.borrowBook(request.getUtilisateurId(), request.getLivreId());
        return ResponseEntity.ok(emprunt);
    }

    @PostMapping("/{id}/return")
    public ResponseEntity<Emprunt> returnLivre(@PathVariable Long id) {
        Emprunt emprunt = empruntService.returnBook(id);
        return ResponseEntity.ok(emprunt);
    }

    @PostMapping("/return/{id}")
    public ResponseEntity<Emprunt> returnLivreByPath(@PathVariable Long id) {
        Emprunt emprunt = empruntService.returnBook(id);
        return ResponseEntity.ok(emprunt);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Emprunt> updateEmprunt(@PathVariable Long id, @Valid @RequestBody Emprunt emprunt) {
        Emprunt updated = empruntService.updateEmprunt(id, emprunt);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmprunt(@PathVariable Long id) {
        empruntService.deleteEmprunt(id);
        return ResponseEntity.noContent().build();
    }
}
