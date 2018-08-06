// import { AuthUser, Logement, Offre, Option } from './Model';
import { AuthUser, Offre } from './Model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  user: AuthUser = new AuthUser();
  selectedOffer: string = null;
  currentProcessInstanceId = -1;
  currentTaskId = -1;
  currentTask = {};
  adresse: any = {};
  originalLocal: any = {};
  currentLocal: any = {};
  logementModified = false;
  ongoingSimulation = false;
  originalOffer = null;
  numeroBpContrat = null;
  numeroPdlContrat = null;
  options: any[] = [];
  selectedOption: any = null;
  processVars = {};
  subProcessVars = {};
  state = '';



  clsLocal = 'fr.edf.bpmc.model.Local';
  clsAdresse = 'fr.edf.bpmc.model.Adresse';
  clsFacture = 'fr.edf.bpmc.model.Facture';
  clsCadran = 'fr.edf.bpmc.model.Cadran';
  clsOption = 'fr.edf.bpmc.model.Option';

  loginError = false;
  existingProcess = false;
  byPassExistingProcess = false;

  tabOffres = {
    ELEC_DEREGULE: {
      code: 'ELEC_DEREGULE',
      libelle: 'Mon Contrat Electricté',
      description: 'Mon Contrat Electricté',
      description2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    TARIF_BLEU_V2: {
      code: 'TARIF_BLEU_V2',
      libelle: 'Tarif Bleu',
      description: 'Faites le choix de la simplicité',
      description2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    ELEC_PE_VERT: {
      code: 'ELEC_PE_VERT',
      libelle: 'Vert Électrique',
      description: 'Contribuez à la transition énergétique sans changer vos habitudes !',
      description2: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
    },
    ELEC_PE_WE: {
      code: 'ELEC_PE_WE',
      libelle: 'Vert Électrique Week-end',
      description: 'Payez moins cher votre électricité verte le week-end',
      description2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    ELEC_PF3_VE: {
      code: 'ELEC_PF3_VE',
      libelle: 'Vert Électrique Auto',
      description: 'Rechargez votre voiture électrique avec une électricité 40% moins chère la nuit et à prix fixe sur 3 ans',
      description2: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'
    }
  };

  getAllOffres(): Array<Offre> {
    // Step 1. Get all the object keys.
    const offresKeys = Object.keys(this.tabOffres);
    // Step 2. Create an empty array.
    const offres: Array<Offre> = [];
    // Step 3. Iterate throw all keys.
    offresKeys.forEach(id => {
      offres.push(this.tabOffres[id]);
    });
    return offres;
  }

  constructor() { }

  loadModel(input: any, refreshCurrentLogement = true): void {
    this.processVars = input;
    this.selectedOffer = input.idOffreSelectionnee;
    this.originalOffer = input.idOffreSouscrite;
    this.numeroBpContrat = input.numeroBpContrat;
    this.numeroPdlContrat = input.numeroPdlContrat;
    this.selectedOption = input.optionSelectionnee;

    this.refreshLogement(input, refreshCurrentLogement);

    this.refreshOptions(input);
  }

  refreshLogement(input: any, refreshCurrent = true) {
    this.originalLocal = input.local;
    this.adresse = input.adresse;

    if (refreshCurrent) {
      this.currentLocal = this.originalLocal;
    }
  }

  refreshOptions(input: any): void {
    this.options = input.options;
    this.ongoingSimulation = false;
  }

  modelToInputModifLocal(modif: boolean): any {

    const result = {
      local: this.currentLocal,
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
    // this.selectedOffer = null;
    this.originalOffer = null;
    this.currentProcessInstanceId = -1;
    this.currentLocal = {};
    this.originalLocal = {};
    this.adresse = {};
    this.logementModified = false;
    this.currentTaskId = -1;
    this.numeroBpContrat = null;
    this.numeroPdlContrat = null;
    this.options = [];
    this.selectedOption = new Option();
  }

}
