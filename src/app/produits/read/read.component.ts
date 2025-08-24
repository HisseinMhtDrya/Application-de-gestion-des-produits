import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Produit } from '../produits-interface';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  produits: Produit[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private produitsService: ProduitsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProduits();
  }

  fetchProduits(): void {
    this.loading = true;
    // Changement ici : getAll() → getAllProducts()
    this.produitsService.getAllProducts().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les produits';
        this.loading = false;
      }
    });
  }

  editProduit(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/produits/edit', id]);
    }
  }

  deleteProduit(id: number | undefined): void {
    if (id !== undefined && confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.produitsService.delete(id).subscribe({
        next: () => this.fetchProduits(),
        error: () => alert('Erreur lors de la suppression du produit')
      });
    }
  }

  voirProduit(produit: Produit): void {
    alert(
      `Détails du produit :
Nom : ${produit.nom}
Description : ${produit.description}
Prix : ${produit.prix} FCFA
Catégorie : ${produit.categorie}
Stock : ${produit.stock}`
    );
  }
}
