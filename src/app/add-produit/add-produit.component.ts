import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent implements OnInit{

  newProduit: Produit = {};


  constructor(private ProduitService: ProduitService, private router: Router) { }

  ngOnInit(): void {
    
  }

  addProduit(){ 
    console.log(this.newProduit); 
    this.ProduitService.ajouterProduit(this.newProduit);
    this.router.navigate(['/produits'])
  }

}
