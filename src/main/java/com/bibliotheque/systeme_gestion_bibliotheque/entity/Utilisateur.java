package com.bibliotheque.systeme_gestion_bibliotheque.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "utilisateurs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est requis")
    private String nom;

    @Email(message = "Email invalide")
    @NotBlank(message = "L'email est requis")
    private String email;

    @NotBlank(message = "L'adresse est requise")
    private String adresse;

    @NotBlank(message = "Le téléphone est requis")
    private String telephone;

    @OneToMany(mappedBy = "utilisateur", fetch = FetchType.LAZY)
    @JsonManagedReference("utilisateur-emprunts")
    @Builder.Default
    private List<Emprunt> emprunts = new ArrayList<>();
}
