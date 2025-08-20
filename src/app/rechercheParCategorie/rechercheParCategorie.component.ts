import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { Categorie } from '../model/categrie';
import { ProduitService } from '../services/produit.service';

@Component({
    selector: 'app-rechercheParCategorie',
    templateUrl: './rechercheParCategorie.component.html',
    standalone: false
})
export class RechercheParCategorieComponent implements OnInit {
  produits!: Produit[];
  IdCategorie!: number;
  categories!: Categorie[];

  constructor(private produitService: ProduitService) {}

  ngOnInit() {
    this.produitService.listeCategories().subscribe((cats) => {
      this.categories = cats;
      console.log(cats);
    });
  }

  onChange() {
    this.produitService
      .rechercherParCategorie(this.IdCategorie)
      .subscribe((prods) => {
        this.produits = prods;
      });
  }

  supprimerProduit(_t25: any) {
    throw new Error('Method not implemented.');
  }
}
