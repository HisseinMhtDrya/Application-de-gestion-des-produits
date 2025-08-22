// edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  produitForm!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!; // convert string to number

    // Initialiser le formulaire
    this.produitForm = this.fb.group({
      nom: [''],
      description: [''],
      prix: [''],
      categorie: [''],
      stock: ['']
    });

    // Charger le produit
    this.http.get<any>(`http://localhost:3000/products/${this.id}`).subscribe(data => {
      this.produitForm.patchValue(data);
    });
  }

  onSubmit() {
    if (this.produitForm.valid) {
      this.http.put(`http://localhost:3000/products/${this.id}`, this.produitForm.value)
        .subscribe(() => {
          this.router.navigate(['/produits']); // redirection après modification
        }, err => {
          console.error('Erreur modification produit', err);
        });
    }
  }
}
