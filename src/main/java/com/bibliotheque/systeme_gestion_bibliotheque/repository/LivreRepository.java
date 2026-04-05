package com.bibliotheque.systeme_gestion_bibliotheque.repository;

import com.bibliotheque.systeme_gestion_bibliotheque.entity.Livre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivreRepository extends JpaRepository<Livre, Long> {
}
