import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReadComponent } from './produits/read/read.component';
import { CreateComponent } from './produits/create/create.component';
import { EditComponent } from './produits/edit/edit.component';
import { DeleteComponent } from './produits/delete/delete.component';
import { DetailComponent } from './produits/detail/detail.component';

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent, title: 'Dashboard' },
  { path: 'produits', component: ReadComponent, title: 'Produits' },
  { path: 'produits/create', component: CreateComponent, title: 'Ajouter produit' },
  { path: 'produits/edit/:id', component: EditComponent, title: 'Modifier produit' },
  { path: 'produits/delete/:id', component: DeleteComponent, title: 'Supprimer produit' },
  { path: 'produits/detail/:id', component: DetailComponent, title: 'Détail produit' }, // <-- route détail produit
  { path: '**', redirectTo: '' }
  
];
