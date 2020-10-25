package com.ecommerce.microcommerce.circuitbreaker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.microcommerce.circuitbreaker.delegate.ServiceDelegate;

@RestController
public class ServiceController {

    private final String ROUTES_PRODUITS = "/Produits";
    private final String ROUTES_PRODUIT_ID = "/Produits/{id}";
    private final String ROUTES_ADMIN_PRODUIT = "/AdminProduits";
    private final String ROUTES_PRODUIT_NOM = "/Produits/nom/{nom}";
    private final String ROUTES_PRODUITS_ALPHA ="/produitsTrieParNom";

    @Autowired
    ServiceDelegate serviceDelegate;

    @RequestMapping(value = ROUTES_PRODUITS , method = RequestMethod.GET)
    public String getProduits() {
        System.out.println("Going to get data!");
        return serviceDelegate.callServiceAndGetData();
    }

    @RequestMapping(value = ROUTES_PRODUIT_ID, method = RequestMethod.GET)
    public String getProduitsById(@PathVariable int id) {
        System.out.println("Going to get data!");
        return serviceDelegate.callServiceAndGetDataById(id);
    }

    @RequestMapping(value = ROUTES_ADMIN_PRODUIT, method = RequestMethod.GET)
    public String getProduitsAdmin() {
        System.out.println("Going to get data!");
        return serviceDelegate.callServiceAndGetDataAdmin();
    }

    @RequestMapping(value = ROUTES_PRODUITS_ALPHA, method = RequestMethod.GET)
    public String getProduitsTri() {
        System.out.println("Going to get data!");
        return serviceDelegate.callServiceAndGetDataTri();
    }

    @RequestMapping(value = ROUTES_PRODUIT_NOM, method = RequestMethod.GET)
    public String getProduitsByNom(@PathVariable String nom) {
        System.out.println("Going to get data!");
        return serviceDelegate.callServiceAndGetDataByNom(nom);
    }
}