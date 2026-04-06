package com.bibliotheque.systeme_gestion_bibliotheque.controller;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

public class BorrowRequest {

    @JsonProperty("utilisateurId")
    @NotNull(message = "L'identifiant de l'utilisateur est requis")
    private Long utilisateurId;

    @JsonProperty("livreId")
    @NotNull(message = "L'identifiant du livre est requis")
    private Long livreId;

    @JsonCreator
    public BorrowRequest(
            @JsonProperty("utilisateurId") Long utilisateurId,
            @JsonProperty("livreId") Long livreId) {
        this.utilisateurId = utilisateurId;
        this.livreId = livreId;
    }

    public BorrowRequest() {
    }

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
