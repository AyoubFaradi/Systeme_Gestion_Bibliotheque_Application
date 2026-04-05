package com.bibliotheque.systeme_gestion_bibliotheque.controller;

import jakarta.validation.constraints.NotNull;

public class BorrowRequest {

    @NotNull(message = "L'identifiant de l'utilisateur est requis")
    private Long utilisateurId;

    @NotNull(message = "L'identifiant du livre est requis")
    private Long livreId;

    public Long getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(Long utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public Long getLivreId() {
        return livreId;
    }

    public void setLivreId(Long livreId) {
        this.livreId = livreId;
    }
}
