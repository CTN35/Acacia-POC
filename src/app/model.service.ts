import { AuthUser, Logement } from './Model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  user: AuthUser = {
    login: '5184923745',
    password: 'password',
    isAuthenticated: true
  };
  selectedOffer = '';
  currentProcessInstanceId = 22;
  originalLogement: Logement = new Logement();
  currentLogement: Logement = new Logement();
  logementModified = false;

  loginError = false;

  constructor() { }

  loadModel(input: any): void {
    console.log(input);
  }

  resetModel(resetAuth: boolean): void {
    if (resetAuth) {
      this.user = new AuthUser();
      this.loginError = false;
    }
    this.selectedOffer = '';
    this.currentProcessInstanceId = -1;
    this.currentLogement = new Logement();
    this.logementModified = false;
  }
}
