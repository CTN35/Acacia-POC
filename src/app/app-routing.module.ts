import { ModifLogementComponent } from './modif-logement/modif-logement.component';
import { ConsultLogementComponent } from './consult-logement/consult-logement.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'login', component: LoginComponent },
  { path: 'details', component: ConsultLogementComponent },
  { path: 'modification', component: ModifLogementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
