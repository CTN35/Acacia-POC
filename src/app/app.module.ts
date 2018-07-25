import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { ConsultLogementComponent } from './consult-logement/consult-logement.component';
import { ModifLogementComponent } from './modif-logement/modif-logement.component';
import { PanierComponent } from './panier/panier.component';
import { DemandesComponent } from './demandes/demandes.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    ConsultLogementComponent,
    ModifLogementComponent,
    PanierComponent,
    DemandesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
