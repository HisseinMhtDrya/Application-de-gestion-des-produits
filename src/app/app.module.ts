import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CreateComponent } from './produits/create/create.component';
import { EditComponent } from './produits/edit/edit.component';
import { ReadComponent } from './produits/read/read.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './produits/detail/detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'produits', component: ReadComponent },
  { path: 'produits/create', component: CreateComponent },
  { path: 'produits/edit/:id', component: EditComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    EditComponent,
    ReadComponent,
    HomeComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
