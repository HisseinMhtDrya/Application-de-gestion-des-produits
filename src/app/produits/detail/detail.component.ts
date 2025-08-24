import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitsService } from '../produits.service';
import { Produit } from '../produits-interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  produit?: Produit;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitsService: ProduitsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.produitsService.getById(id).subscribe({
        next: (data) => {
          this.produit = data;
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Produit introuvable';
          this.loading = false;
        }
      });
    }
  }

  retour(): void {
    this.router.navigate(['/produits']);
  }
}
