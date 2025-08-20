import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';
import { Categorie } from '../model/categrie';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css'],
  standalone: false
})
export class AddProduitComponent implements OnInit {
  newProduit: Produit = {
    idProduit: 0,
    nomProduit: '',
    descriptionProduit: '',
    prixProduit: 0,
    dateCreation: new Date(),
    categorie: undefined
  };
  categories!: Categorie[];
  newIdCat!: number;

  constructor(private produitService: ProduitService, private router: Router) {}

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(cats => {
      this.categories = cats;
      console.log('Catégories chargées :', cats);
    });
  }

  addProduit() {
    if (!this.newIdCat) {
      alert('Veuillez sélectionner une catégorie');
      return;
    }

    this.produitService.consulterCategorie(this.newIdCat).subscribe(categorie => {
      this.newProduit.categorie = categorie;

      if (this.areAllFieldsFilled(this.newProduit)) {
        this.produitService.ajouterProduit(this.newProduit).subscribe(data => {
          console.log('Produit ajouté :', data);
          this.router.navigate(['/produits']);
        });
      } else {
        alert('Veuillez remplir tous les champs');
      }
    });
  }

  areAllFieldsFilled(obj: Produit): boolean {
    return Object.values(obj).every(value => {
      if (typeof value === 'object' && value !== null) {
        return this.areAllFieldsFilled(value);
      }
      return value !== '' && value !== null && value !== undefined;
    });
  }
}
