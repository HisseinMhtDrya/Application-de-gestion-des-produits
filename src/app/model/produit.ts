import { Categorie } from "./categrie";

export interface Produit { 
    idProduit?: number; 
    nomProduit?: string; 
    prixProduit?: number; 
    dateCreation?: Date; 
    categorie?: Categorie;
}