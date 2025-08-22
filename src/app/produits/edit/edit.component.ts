import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProduitsService } from '../produits.service';
import { Produit } from '../produits-interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  loading = true;
  submitting = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produitsService: ProduitsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Déclaration unique du formulaire
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      prix: [0, [Validators.required, Validators.min(0)]],
      categorie: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+$/)]]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.produitsService.getById(this.id).subscribe({
      next: (produit: Produit) => {
        this.form.patchValue(produit);
        this.loading = false;
      },
      error: () => {
        alert('Produit non trouvé !');
        this.router.navigate(['/produits']);
      }
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.produitsService.update(this.id, this.form.value as Produit).subscribe({
      next: () => this.router.navigate(['/produits']),
      error: () => {
        this.submitting = false;
        alert('Erreur lors de la mise à jour du produit');
      }
    });
  }
}
