import axios from 'axios'
const PORT = 9091
const baseURL = `http://localhost:${PORT}`

const URI = {
    PRODUITS: '/Produits',
    PRODUIT_ID: (id) => `/Produits/${id}`,
    PRODUIT_NOM: (nom) => `/Produits/nom/${nom}`,
    PRODUITS_TRI_NOM: '/Produits/trieParNom',
}

export const getProduits = async () =>
    await axios.get(`${baseURL}${URI.PRODUITS}`)

export const getProduitsById = async (id) =>
    await axios.get(`${baseURL}${URI.PRODUIT_ID(id)}`)

export const getProduitsByNom = async (nom) =>
    await axios.get(`${baseURL}${URI.PRODUIT_NOM(nom)}`)

export const getProduitsTriNom = async () =>
    await axios.get(`${baseURL}${URI.PRODUITS_TRI_NOM}`)

export const deleteArticle = async (id) =>
    await axios.delete(`${baseURL}${URI.PRODUIT_ID(id)}`)
