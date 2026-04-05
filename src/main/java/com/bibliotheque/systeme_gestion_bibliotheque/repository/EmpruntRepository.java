package com.bibliotheque.systeme_gestion_bibliotheque.repository;

import com.bibliotheque.systeme_gestion_bibliotheque.entity.Emprunt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpruntRepository extends JpaRepository<Emprunt, Long> {

    Optional<Emprunt> findByLivreIdAndDateRetourIsNull(Long livreId);
}
