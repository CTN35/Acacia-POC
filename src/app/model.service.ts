import { AuthUser, Logement } from './Model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  user: AuthUser = {
    login: 'pamAdmin',
    password: 'pamAdmin1!',
    isAuthenticated: true
  };
  selectedOffer = '';
  currentProcessInstanceId = 24;
  originalLogement: Logement = new Logement();
  currentLogement: Logement = new Logement();
  logementModified = false;

  loginError = false;

  constructor() { }

  loadModel(input: any): void {
    console.log(input);
  }

  resetModel(): void {
    this.user = new AuthUser();
    this.selectedOffer = '';
    this.currentProcessInstanceId = -1;
    this.currentLogement = new Logement();
    this.logementModified = false;
    this.loginError = false;
  }
}
