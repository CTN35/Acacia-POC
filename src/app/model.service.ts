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
  currentLogement: Logement = new Logement();

  loginError = false;

  constructor() { }

  loadModel(input: any): void {

  }
}
