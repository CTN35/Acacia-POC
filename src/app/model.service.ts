import { AuthUser, Logement } from './Model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  user: AuthUser = new AuthUser();
  selectedOffer = '';
  currentLogement: Logement = new Logement();

  constructor() { }
}
