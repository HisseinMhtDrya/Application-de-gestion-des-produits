import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
  standalone: false
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  supprimerProduit(prod: Produit) {
    if (confirm('Etes-vous sûr ?')) {
      this.produitService.supprimerProduit(prod).subscribe({
        next: (data) => {
          console.log('Produit supprimé', data);
          this.chargerProduits();
        },
        error: (err) => console.error(err)
      });
    }
  }

  chargerProduits() {
    this.produitService.listeProduits().subscribe({
      next: (prods) => {
        console.log(prods);
        this.produits = prods;
      },
      error: (err) => console.error(err)
    });
  }
}
