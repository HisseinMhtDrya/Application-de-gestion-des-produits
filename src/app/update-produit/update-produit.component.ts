import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitService } from '../services/produit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrl: './update-produit.component.css'
})
export class UpdateProduitComponent  implements OnInit{


  currentProduit: Produit = {};

  constructor(private produitService: ProduitService, 
    private activatedRoute : ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.currentProduit = this.produitService.consulterProduit(this.activatedRoute.snapshot. params['id']); 
    console.log(this.currentProduit);
  }


  updateProduit() {
    this.produitService.updateProduit(this.currentProduit);
    this.router.navigate(['/produits']);
  }

}
