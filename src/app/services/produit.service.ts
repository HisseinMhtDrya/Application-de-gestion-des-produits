import { Injectable } from '@angular/core';
import { Produit } from '../model/produit';
import { Categorie } from '../model/categrie';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';

const httpHeaders = {
  headers: new HttpHeaders({ 'content-type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits: Produit[] = [];

  produit!: Produit;

  apiURLCat: string = 'http://localhost:8080/produits/api/';
  //categories: Categorie[];

  constructor(private http: HttpClient) {}

  ajouterProduit(prod: Produit) {
    return this.http.post(apiURL, prod, httpHeaders);
  }

  supprimerProduit(prod: Produit) {
    return this.http.delete(`${apiURL}/${prod.idProduit}`, httpHeaders);
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }

  updateProduit(prod: Produit) {
    return this.http.put(`${apiURL}`, prod, httpHeaders);
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

  listeCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(apiURL + '/cat');
  }

  consulterCategorie(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(apiURL + `${id}`);
  }

  listeProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(apiURL);
  }

  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }
}
