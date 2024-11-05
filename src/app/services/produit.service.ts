import { Injectable } from '@angular/core';
import { Produit } from '../model/produit';
import { Categorie } from '../model/categrie';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpHeaders = {
  headers: new HttpHeaders({ 'content-type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits: Produit[] = [];

  produit!: Produit;

  apiURL: string = 'http://localhost:8080/produits/api';
  //categories: Categorie[];

  constructor(private http: HttpClient) {
    // this.categories = [
    //   { idCat: 1, nomCat: 'PC' },
    //   { idCat: 2, nomCat: 'Imprimante' },
    // ];
    // this.produits = [
    //   {
    //     idProduit: 1,
    //     nomProduit: 'PC Asus',
    //     prixProduit: 3000.6,
    //     dateCreation: new Date('01/14/2011'),
    //     categorie: { idCat: 1, nomCat: 'PC' },
    //   },
    //   {
    //     idProduit: 2,
    //     nomProduit: 'Imprimante Epson',
    //     prixProduit: 450,
    //     dateCreation: new Date('12/17/2010'),
    //     categorie: { idCat: 2, nomCat: 'Imprimante' },
    //   },
    //   {
    //     idProduit: 3,
    //     nomProduit: 'Tablette Samsung',
    //     prixProduit: 900.123,
    //     dateCreation: new Date('02/20/2020'),
    //     categorie: { idCat: 1, nomCat: 'PC' },
    //   },
    // ];
  }

  ajouterProduit(prod: Produit) {
    return this.http.post(this.apiURL, prod, httpHeaders);
  }

  supprimerProduit(prod: Produit) {
    return this.http.delete(`${this.apiURL}/${prod.idProduit}`, httpHeaders);
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }

  updateProduit(prod: Produit) {
    return this.http.put(`${this.apiURL}`, prod, httpHeaders);
  }

  trierProduits() {
    this.produits = this.produits.sort((n1, n2) => {
      if (n1.idProduit! > n2.idProduit!) {
        return 1;
      }
      if (n1.idProduit! < n2.idProduit!) {
        return -1;
      }
      return 0;
    });
  }

  // listeCategories(): Categorie[] {
  //   return this.categories;
  // }

  // consulterCategorie(id: number): Categorie {
  //   return this.categories.find((cat) => cat.idCat == id)!;
  // }

  listeProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiURL);
  }
}
