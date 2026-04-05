package com.bibliotheque.systeme_gestion_bibliotheque.service;

import com.bibliotheque.systeme_gestion_bibliotheque.entity.Emprunt;
import com.bibliotheque.systeme_gestion_bibliotheque.entity.Livre;
import com.bibliotheque.systeme_gestion_bibliotheque.entity.Utilisateur;
import com.bibliotheque.systeme_gestion_bibliotheque.repository.EmpruntRepository;
import com.bibliotheque.systeme_gestion_bibliotheque.repository.LivreRepository;
import com.bibliotheque.systeme_gestion_bibliotheque.repository.UtilisateurRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmpruntService {

    private final EmpruntRepository empruntRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final LivreRepository livreRepository;

    public EmpruntService(EmpruntRepository empruntRepository,
                          UtilisateurRepository utilisateurRepository,
                          LivreRepository livreRepository) {
        this.empruntRepository = empruntRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.livreRepository = livreRepository;
    }

    public List<Emprunt> getAllEmprunts() {
        return empruntRepository.findAll();
    }

    public Optional<Emprunt> getEmpruntById(Long id) {
        return empruntRepository.findById(id);
    }

    public Emprunt saveEmprunt(Emprunt emprunt) {
        return empruntRepository.save(emprunt);
    }

    public Emprunt updateEmprunt(Long id, Emprunt emprunt) {
        return empruntRepository.findById(id)
                .map(existing -> {
                    existing.setDateEmprunt(emprunt.getDateEmprunt());
                    existing.setDateRetour(emprunt.getDateRetour());
                    existing.setLivre(emprunt.getLivre());
                    existing.setUtilisateur(emprunt.getUtilisateur());
                    return empruntRepository.save(existing);
                })
                .orElseGet(() -> {
                    emprunt.setId(id);
                    return empruntRepository.save(emprunt);
                });
    }

    public Emprunt borrowBook(Long utilisateurId, Long livreId) {
        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));
        Livre livre = livreRepository.findById(livreId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Livre non trouvé"));

        empruntRepository.findByLivreIdAndDateRetourIsNull(livreId)
                .ifPresent(existing -> {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ce livre est déjà emprunté");
                });

        Emprunt emprunt = new Emprunt();
        emprunt.setUtilisateur(utilisateur);
        emprunt.setLivre(livre);
        emprunt.setDateEmprunt(LocalDate.now());
        emprunt.setDateRetour(null);
        return empruntRepository.save(emprunt);
    }

    public Emprunt returnBook(Long empruntId) {
        Emprunt emprunt = empruntRepository.findById(empruntId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Emprunt non trouvé"));
        emprunt.setDateRetour(LocalDate.now());
        return empruntRepository.save(emprunt);
    }

    public void deleteEmprunt(Long id) {
        empruntRepository.deleteById(id);
    }
}
