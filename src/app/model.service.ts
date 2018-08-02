import { AuthUser, Logement, Offre, Option } from './Model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  user: AuthUser = new AuthUser();
  selectedOffer: string = null;
  currentProcessInstanceId = -1;
  currentTaskId = -1;
  originalLogement: Logement = new Logement();
  currentLogement: Logement = new Logement();
  logementModified = false;
  ongoingSimulation = false;
  originalOffer = null;
  numeroBpContrat = null;
  numeroPdlContrat = null;
  options: Option[] = [];
  selectedOption: Option = null;

  loginError = false;
  existingProcess = false;

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
    this.selectedOffer = input.idOffreSelectionnee;
    this.originalOffer = input.idOffreSouscrite;
    this.numeroBpContrat = input.numeroBpContrat;
    this.numeroPdlContrat = input.numeroPdlContrat;

    this.refreshLogement(input, true);

    this.refreshOptions(input);
  }

  refreshLogement(input: any, refreshCurrent = true) {
    this.originalLogement.annee = input.local['fr.edf.bpmc.model.Local'].anneeConstruction;
    this.originalLogement.classeEnergetique = input.local['fr.edf.bpmc.model.Local'].classeEnergetique;
    this.originalLogement.chauffagePiscine = input.local['fr.edf.bpmc.model.Local'].chauffagePiscine;
    this.originalLogement.energieChauffagePrincipal = input.local['fr.edf.bpmc.model.Local'].energieChauffagePrincipal;
    this.originalLogement.energieChauffageSecondaire = input.local['fr.edf.bpmc.model.Local'].energieChauffageSecondaire;
    this.originalLogement.energieEauChaudeSanitaire = input.local['fr.edf.bpmc.model.Local'].energieEauChaudeSanitaire;
    this.originalLogement.nbOccupant = input.local['fr.edf.bpmc.model.Local'].nombreOccupant;
    this.originalLogement.presenceAlimentationGaz = input.local['fr.edf.bpmc.model.Local'].presenceAlimentationGaz;
    this.originalLogement.equipementChauffagePrincipal = input.local['fr.edf.bpmc.model.Local'].equipementChauffagePrincipal;
    this.originalLogement.surface = input.local['fr.edf.bpmc.model.Local'].surfaceHabitable;
    this.originalLogement.typeLogement = input.local['fr.edf.bpmc.model.Local'].typeLogement;
    this.originalLogement.typeOccupation = input.local['fr.edf.bpmc.model.Local'].typeOccupation;
    this.originalLogement.typeResidence = input.local['fr.edf.bpmc.model.Local'].typeResidence;
    this.originalLogement.codePostal = input.adresse['fr.edf.bpmc.model.Adresse'].codePostal;
    this.originalLogement.codeINSEE = input.adresse['fr.edf.bpmc.model.Adresse'].codeInsee;
    this.originalLogement.lieudit = input.adresse['fr.edf.bpmc.model.Adresse'].lieudit;
    this.originalLogement.ville = input.adresse['fr.edf.bpmc.model.Adresse'].ville;

    if (refreshCurrent) {
      this.currentLogement = this.originalLogement;
    }
  }

  refreshOptions(input: any): void {
    this.options = [];
    input.options.forEach(opt => {
      const addOption: Option = {
        nomOption: opt['fr.edf.bpmc.model.Option'].nomOption,
        cadrans: [],
        montantAnnuelEstime: opt['fr.edf.bpmc.model.Option'].facture['fr.edf.bpmc.model.Facture'].montantAnnuelEstime,
        montantAnnuelOptimise: opt['fr.edf.bpmc.model.Option'].facture['fr.edf.bpmc.model.Facture'].montantAnnuelOptimise,
        ordrePreconisation: opt['fr.edf.bpmc.model.Option'].ordrePreconisation,
        optionSelectionnee: false
      };
      opt['fr.edf.bpmc.model.Option'].cadrans.forEach(cadran => {
        addOption.cadrans.push({
          consommationCadran: cadran.consommationCadran,
          nomCadran: cadran.nomCadran,
          prixAbonnement: cadran.prixAbonnement,
          prixKwh: cadran.prixKwh
        }
        );
      });
      this.options.push(addOption);
    });
    this.ongoingSimulation = false;
  }

  modelToInputModifLocal(modif: boolean): any {
    const local = {
      anneeConstruction: this.currentLogement.annee,
      classeEnergetique: this.currentLogement.classeEnergetique,
      chauffagePiscine: this.currentLogement.chauffagePiscine,
      energieChauffagePrincipal: this.currentLogement.energieChauffagePrincipal,
      energieChauffageSecondaire: this.currentLogement.energieChauffageSecondaire,
      energieEauChaudeSanitaire: this.currentLogement.energieEauChaudeSanitaire,
      nombreOccupant: this.currentLogement.nbOccupant,
      presenceAlimentationGaz: this.currentLogement.presenceAlimentationGaz,
      equipementChauffagePrincipal: this.currentLogement.equipementChauffagePrincipal,
      surfaceHabitable: this.currentLogement.surface,
      typeLogement: this.currentLogement.typeLogement,
      typeOccupation: this.currentLogement.typeOccupation,
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
    // this.selectedOffer = null;
    this.originalOffer = null;
    this.currentProcessInstanceId = -1;
    this.currentLogement = new Logement();
    this.originalLogement = new Logement();
    this.logementModified = false;
    this.currentTaskId = -1;
    this.numeroBpContrat = null;
    this.numeroPdlContrat = null;
    this.options = [];
    this.selectedOption = new Option();
  }

}
