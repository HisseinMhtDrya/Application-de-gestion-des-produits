import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';
import { Categorie } from '../model/categrie';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css',
})
export class AddProduitComponent implements OnInit {
  newProduit: Produit = {};
  newCategorie!: Categorie;
  categories!: Categorie[];
  newIdCat!: number;

  constructor(private produitService: ProduitService, private router: Router) {}

  ngOnInit(): void {
    this.categories = this.produitService.listeCategories();
  }

  addProduit() {
    this.produitService.consulterCategorie(this.newIdCat);
    this.newProduit.categorie = this.newCategorie;
    this.produitService.ajouterProduit(this.newProduit);
    this.router.navigate(['/produits']);
  }
}
