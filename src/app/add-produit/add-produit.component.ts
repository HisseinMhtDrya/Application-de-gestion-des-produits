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
    this.produitService.listeCategories().subscribe(cats => {
      this.categories = cats; 
      console.log(cats); 
    });  
  }

  addProduit() {
    this.produitService.consulterCategorie(this.newIdCat).subscribe(categorie =>{
      console.log(categorie);
      this.newCategorie = categorie;
      this.newProduit.categorie = this.newCategorie;

      if(this.areAllFieldsFilled(this.newProduit)){
        this.produitService.ajouterProduit(this.newProduit).subscribe(data => {
          console.log("-------Produit ajouter ", data);
          this.router.navigate(['/produits'])
        });
      }else{
        alert("Veuillez remplir tous les champs");
      }
    });
  }

  areAllFieldsFilled(obj: Produit): boolean {
    return Object.values(obj).every(value => {
        if (typeof value === 'object' && value !== null) {
            // Si une valeur est un objet, vérifier ses champs récursivement
            return this.areAllFieldsFilled(value);
        }
        return value !== '' && value !== null && value !== undefined;
    });
}
}
