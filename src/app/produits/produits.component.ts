import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css',
})
export class ProduitsComponent implements OnInit {
  
  produits: Produit[] = [];
  
  constructor(private produitService:ProduitService ) {}
  
  ngOnInit(): void {
    this.produits = this.produitService.listeProduits()
  }

  supprimerProduit(prod: Produit) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.produitService.supprimerProduit(prod);
  }
}
