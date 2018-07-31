import { AuthUser, Logement, Option } from './Model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  user: AuthUser = new AuthUser();
  selectedOffer: string = null;
  selectedOption: Option = null;
  currentProcessInstanceId = 58;
  currentTaskId = -1;
  originalLogement: Logement = new Logement();
  currentLogement: Logement = new Logement();
  logementModified = false;
  ongoingSimulation = false;

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

    this.ongoingSimulation = false;
  }

  refreshOptions(intpu: any): void {

  }

  modelToInputModifLocal(modif: boolean): any {
    const local = {
      anneeConstruction: this.currentLogement.annee,
      classeEnergetique: this.currentLogement.classeEnergetique,
      chauffagePiscine: this.currentLogement.chauffagePiscine,
      energieChauffagePrincipal: this.currentLogement.chauffage,
      energieChauffageSecondaire: this.currentLogement.chauffageAlternatif,
      energieEauChaudeSanitaire: this.currentLogement.energieEauChaude,
      nombreOccupant: this.currentLogement.nbOccupant,
      presenceGaz: this.currentLogement.gaz,
      surfaceHabitable: this.currentLogement.surface,
      typeLogement: this.currentLogement.type,
      typeOccupation: this.currentLogement.statutOccupant,
      typeResidence: this.currentLogement.typeResidence,
    };

    const result = {
      local: {
        'fr.edf.bpmc.model.Local': local
      },
      modifieDonneesLocal: modif,
      optionSelectionnee: this.selectedOption
    };

    return result;
  }

  resetModel(resetAuth: boolean): void {
    if (resetAuth) {
      this.user = new AuthUser();
      this.loginError = false;
    }
    this.currentProcessInstanceId = -1;
    this.currentLogement = new Logement();
    this.originalLogement = new Logement();
    this.logementModified = false;
    this.currentTaskId = -1;
  }


}
