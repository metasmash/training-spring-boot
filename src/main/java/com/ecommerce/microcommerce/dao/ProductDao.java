package com.ecommerce.microcommerce.dao;

import com.ecommerce.microcommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {

    // query params
    public static final String TRI_ORDRE_ALPHABETIQUE = "SELECT id, nom, prix, prixAchat FROM Product p ORDER BY p.nom";
    public static final String MARGE_PRODUIT = "SELECT id, nom, prix, prixAchat, prix-prixAchat FROM Product";
    public static final String CHERCHER_PRODUIT_CHER = "SELECT id, nom, prix FROM Product p WHERE p.prix > :prixLimit";


    Product findById(int id);

    List<Product> findByPrixGreaterThan(int prixLimit);

    List<Product> findByNomLike(String recherche);

    @Query(CHERCHER_PRODUIT_CHER)
    List<Product>  chercherUnProduitCher(@Param("prixLimit") int prix);

    @Query(MARGE_PRODUIT)
    List<Product> calculerMargeProduit();

    @Query(TRI_ORDRE_ALPHABETIQUE)
    List<Product> trierProduitParOrdreAlphabetique();
}
