package com.bibliotheque.systeme_gestion_bibliotheque.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "livres")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Livre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le titre est requis")
    private String titre;

    @NotBlank(message = "L'auteur est requis")
    private String auteur;

    @NotBlank(message = "La catégorie est requise")
    private String categorie;

    @NotBlank(message = "L'ISBN est requis")
    private String isbn;

    @OneToMany(mappedBy = "livre", fetch = FetchType.LAZY)
    @JsonManagedReference("livre-emprunts")
    @Builder.Default
    private List<Emprunt> emprunts = new ArrayList<>();
}
