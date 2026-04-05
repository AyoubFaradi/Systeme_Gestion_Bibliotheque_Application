package com.bibliotheque.systeme_gestion_bibliotheque.repository;

import com.bibliotheque.systeme_gestion_bibliotheque.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
}
