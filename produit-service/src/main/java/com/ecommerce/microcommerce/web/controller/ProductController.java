package com.ecommerce.microcommerce.web.controller;

import com.ecommerce.microcommerce.dao.ProductDao;
import com.ecommerce.microcommerce.model.Product;
import com.ecommerce.microcommerce.web.exceptions.ProduitIntrouvableException;
import com.ecommerce.microcommerce.web.exceptions.ProduitGratuitException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;


@Api(description = "API pour es opérations CRUD sur les produits.")

@RestController
public class ProductController {

    @Autowired
    private ProductDao productDao;


    //Récupérer la liste des produits
    @ApiOperation(value = "Afficher la liste des produits", httpMethod = "GET")
    @RequestMapping(value = "/Produits", method = RequestMethod.GET)
    public MappingJacksonValue listeProduits() {
        Iterable<Product> produits = productDao.findAll();
        SimpleBeanPropertyFilter monFiltre = SimpleBeanPropertyFilter.serializeAllExcept("prixAchat");
        FilterProvider listDeNosFiltres = new SimpleFilterProvider().addFilter("monFiltreDynamique", monFiltre);
        MappingJacksonValue produitsFiltres = new MappingJacksonValue(produits);
        produitsFiltres.setFilters(listDeNosFiltres);
        return produitsFiltres;
    }


    //Récupérer un produit par son Id
    @ApiOperation(value = "Récupère un produit grâce à son ID à condition que celui-ci soit en stock!", httpMethod = "GET")
    @GetMapping(value = "/Produits/{id}")

    public Product afficherUnProduit(@PathVariable int id) {

        Product produit = productDao.findById(id);

        if (produit == null)
            throw new ProduitIntrouvableException("Le produit avec l'id " + id + " est INTROUVABLE. Écran Bleu si je pouvais. <- MDRRRR");

        if (produit.isFree())
            throw new ProduitGratuitException("Le produit avec l'id" + id + "est GRATUIT. ATTENTION ECRAN ROUGE SI JE POUVAIS!!!!");

        return produit;
    }


    //ajouter un produit
    @ApiOperation(value = "Ajouter un produit", httpMethod = "POST")
    @PostMapping(value = "/Produits")

    public ResponseEntity<Void> ajouterProduit(@Valid @RequestBody Product product) {

        Product productAdded = productDao.save(product);

        if (productAdded == null)
            return ResponseEntity.noContent().build();

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(productAdded.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @ApiOperation(value = "Supprimer un produit avec son ID", httpMethod = "DELETE")
    @DeleteMapping(value = "/Produits/{id}")
    public void supprimerProduit(@PathVariable int id) {

        productDao.delete(id);
    }

    @ApiOperation(value = "Mettre a jour un produit", httpMethod = "PUT")
    @PutMapping(value = "/Produits")
    public void updateProduit(@RequestBody Product product) {

        productDao.save(product);
    }


    //Pour les tests
    @ApiOperation(value = "Afficher les produits avec une limite de prix", httpMethod = "GET")
    @GetMapping(value = "test/produits/{prixLimit}")
    public List<Product> testeDeRequetes(@PathVariable int prixLimit) {
        return productDao.findByPrixGreaterThan(prixLimit);
    }

    @ApiOperation(value = "Afficher les produits avec le calcul de la marge", httpMethod = "GET")
    @GetMapping(value = "/AdminProduits")
    public List<String> afficherMarge() {
        List<Product> data = productDao.findAll();
        return data.stream()
                .map(Product::calculerMargeProduit).collect(Collectors.toList());

    }

    @ApiOperation(value = "Récupère les produits triés par ordre alphabétique.", httpMethod = "GET")
    @GetMapping(value = "/produitsTrieParNom")
    public List<Product> trierProduit(){
        return productDao.findALlByOrderByNom();
    }

    @ApiOperation(value = "Récupère une liste de produits en fonction du nom du produit.", httpMethod = "GET")
    @GetMapping(value= "/Produits/nom/{nom}")
    public List<Product> rechercheParNom(@PathVariable String nom){
        return productDao.findByNomLike(nom);
    }

}
