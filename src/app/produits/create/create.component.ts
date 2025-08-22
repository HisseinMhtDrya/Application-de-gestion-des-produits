import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Produit } from '../produits-interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  submitting = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produitsService: ProduitsService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      prix: [0, [Validators.required, Validators.min(0)]],
      categorie: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+$/)]]
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.produitsService.create(this.form.value as Produit).subscribe({
      next: () => this.router.navigate(['/produits']),
      error: () => this.submitting = false
    });
  }
}
