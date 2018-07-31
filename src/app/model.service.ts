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
  currentProcessInstanceId = 58;
  originalLogement: Logement = new Logement();
  currentLogement: Logement = new Logement();
  logementModified = false;

  loginError = false;

  constructor() { }

  loadModel(input: any): void {
    console.log(input);
    this.selectedOffer = input.idOffreSelectionnee;
    this.originalLogement.annee = input.local['fr.edf.bpmc.model.Local'].anneeConstruction;
    this.originalLogement.classeEnergetique = input.local['fr.edf.bpmc.model.Local'].classeEnergetique;
    this.originalLogement.chauffagePiscine = input.local['fr.edf.bpmc.model.Local'].chauffagePiscine;
    this.originalLogement.chauffage = input.local['fr.edf.bpmc.model.Local'].energieChauffagePrincipal;
    this.originalLogement.chauffageAlternatif = input.local['fr.edf.bpmc.model.Local'].energieChauffageSecondaire;
    this.originalLogement.energieEauChaude = input.local['fr.edf.bpmc.model.Local'].energieEauChaudeSanitaire;
    this.originalLogement.nbOccupant = input.local['fr.edf.bpmc.model.Local'].nombreOccupant;
    this.originalLogement.gaz = input.local['fr.edf.bpmc.model.Local'].presenceGaz;
    this.originalLogement.surface = input.local['fr.edf.bpmc.model.Local'].surfaceHabitable;
    this.originalLogement.type = input.local['fr.edf.bpmc.model.Local'].typeLogement;
    this.originalLogement.statutOccupant = input.local['fr.edf.bpmc.model.Local'].typeOccupation;
    this.originalLogement.typeResidence = input.local['fr.edf.bpmc.model.Local'].typeResidence;
    this.currentLogement = this.originalLogement;
  }

  resetModel(resetAuth: boolean): void {
    if (resetAuth) {
      this.user = new AuthUser();
      this.loginError = false;
    }
    this.selectedOffer = '';
    this.currentProcessInstanceId = -1;
    this.currentLogement = new Logement();
    this.originalLogement = new Logement();
    this.logementModified = false;
  }
}
