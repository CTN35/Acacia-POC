import { BridgeComponent } from './bridge/bridge.component';
import { AdminComponent } from './admin/admin.component';
import { PanierComponent } from './panier/panier.component';
import { ModifLogementComponent } from './modif-logement/modif-logement.component';
import { ConsultLogementComponent } from './consult-logement/consult-logement.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DemandesComponent } from './demandes/demandes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'login', component: LoginComponent },
  { path: 'details', component: ConsultLogementComponent },
  { path: 'modification', component: ModifLogementComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'bridge', component: BridgeComponent },
  { path: 'demandes', component: DemandesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
