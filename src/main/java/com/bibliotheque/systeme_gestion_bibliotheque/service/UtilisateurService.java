package com.bibliotheque.systeme_gestion_bibliotheque.service;

import com.bibliotheque.systeme_gestion_bibliotheque.entity.Utilisateur;
import com.bibliotheque.systeme_gestion_bibliotheque.repository.UtilisateurRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    public Optional<Utilisateur> getUtilisateurById(Long id) {
        return utilisateurRepository.findById(id);
    }

    public Utilisateur saveUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur updateUtilisateur(Long id, Utilisateur utilisateur) {
        return utilisateurRepository.findById(id)
                .map(existing -> {
                    existing.setNom(utilisateur.getNom());
                    existing.setEmail(utilisateur.getEmail());
                    existing.setAdresse(utilisateur.getAdresse());
                    existing.setTelephone(utilisateur.getTelephone());
                    return utilisateurRepository.save(existing);
                })
                .orElseGet(() -> {
                    utilisateur.setId(id);
                    return utilisateurRepository.save(utilisateur);
                });
    }

    public void deleteUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
    }
}
