package com.bibliotheque.systeme_gestion_bibliotheque.service;

import com.bibliotheque.systeme_gestion_bibliotheque.entity.Livre;
import com.bibliotheque.systeme_gestion_bibliotheque.repository.LivreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivreService {

    private final LivreRepository livreRepository;

    public LivreService(LivreRepository livreRepository) {
        this.livreRepository = livreRepository;
    }

    public List<Livre> getAllLivres() {
        return livreRepository.findAll();
    }

    public Optional<Livre> getLivreById(Long id) {
        return livreRepository.findById(id);
    }

    public Livre saveLivre(Livre livre) {
        return livreRepository.save(livre);
    }

    public Livre updateLivre(Long id, Livre livre) {
        return livreRepository.findById(id)
                .map(existing -> {
                    existing.setTitre(livre.getTitre());
                    existing.setAuteur(livre.getAuteur());
                    existing.setCategorie(livre.getCategorie());
                    existing.setIsbn(livre.getIsbn());
                    return livreRepository.save(existing);
                })
                .orElseGet(() -> {
                    livre.setId(id);
                    return livreRepository.save(livre);
                });
    }

    public void deleteLivre(Long id) {
        livreRepository.deleteById(id);
    }
}
