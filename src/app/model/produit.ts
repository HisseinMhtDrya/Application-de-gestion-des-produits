import { Categorie } from "./categrie";

export interface Produit {
  idProduit?: number;
  nomProduit?: string;
  descriptionProduit?: string;
  prixProduit?: number;
  dateCreation?: Date;
  categorie?: Categorie;
}
