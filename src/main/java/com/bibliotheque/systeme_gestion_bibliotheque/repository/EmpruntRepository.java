package com.bibliotheque.systeme_gestion_bibliotheque.repository;

import com.bibliotheque.systeme_gestion_bibliotheque.entity.Emprunt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpruntRepository extends JpaRepository<Emprunt, Long> {

    @Query("SELECT e FROM Emprunt e WHERE e.livre.id = :livreId AND e.dateRetour IS NULL")
    Optional<Emprunt> findByLivreIdAndDateRetourIsNull(@Param("livreId") Long livreId);
}
