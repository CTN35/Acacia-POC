import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { ConsultLogementComponent } from './consult-logement/consult-logement.component';
import { ModifLogementComponent } from './modif-logement/modif-logement.component';
import { PanierComponent } from './panier/panier.component';
import { DemandesComponent } from './demandes/demandes.component';
import { MyHttpInterceptor } from './my-http-interceptor';
import { GlobalMessageService } from 'src/app/global-message.service';
import { AdminComponent } from './admin/admin.component';
import { BridgeComponent } from './bridge/bridge.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    ConsultLogementComponent,
    ModifLogementComponent,
    PanierComponent,
    DemandesComponent,
    AdminComponent,
    BridgeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule
  ],
  providers: [
    GlobalMessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
