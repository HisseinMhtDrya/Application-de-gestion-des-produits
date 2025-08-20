import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitService } from '../services/produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../model/categrie';

@Component({
    selector: 'app-update-produit',
    templateUrl: './update-produit.component.html',
    styleUrl: './update-produit.component.css',
    standalone: false
})
export class UpdateProduitComponent  implements OnInit{


  currentProduit: Produit = {};
  categories! : Categorie[]; 
  updatedCatId? : number;

  constructor(private produitService: ProduitService, 
    private activatedRoute : ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(cats => {this.categories = cats}); 
    this.produitService.consulterProduit(this.activatedRoute.snapshot. params['id']).subscribe(data =>{
      this.currentProduit = data;
      this.updatedCatId = this.currentProduit.categorie?.idCat;
    }); 
    
  }


  updateProduit() {    
    this.currentProduit.categorie = this.categories.find(cat => cat.idCat == this.updatedCatId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe(data => {  
      console.log("----Voici le produit modifier ", data);
      this.router.navigate(['/produits']);
    });
  
  }

}
