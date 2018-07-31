import { AuthUser, Logement, Offre, Option } from './Model';
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
  originalOffer = '';
  currentProcessInstanceId = 73;
  originalLogement: Logement = new Logement();
  currentLogement: Logement = new Logement();
  logementModified = false;
  numeroBpContrat = '';
  numeroPdlContrat = '';
  options: Option[] = [];
  selectedOption: Option = new Option();

  loginError = false;

  constructor() { }

  loadModel(input: any): void {
    console.log(input);
    this.selectedOffer = input.idOffreSelectionnee;
    this.originalOffer = input.idOffreSouscrite;
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
    this.numeroBpContrat = input.numeroBpContrat;
    this.numeroPdlContrat = input.numeroPdlContrat;
    this.currentLogement = this.originalLogement;
    this.options = [];

    input.options.forEach(opt => {
      const addOption: Option =  {
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
  }

  resetModel(resetAuth: boolean): void {
    if (resetAuth) {
      this.user = new AuthUser();
      this.loginError = false;
    }
    this.selectedOffer = '';
    this.originalOffer = '';
    this.currentProcessInstanceId = -1;
    this.currentLogement = new Logement();
    this.originalLogement = new Logement();
    this.logementModified = false;
    this.numeroBpContrat = '';
    this.numeroPdlContrat = '';
    this.options = [];
    this.selectedOption = new Option();
  }

  getOffre (idOffre): Offre {
    let offreReturn = new Offre;
    switch (idOffre) {
      case 'ELEC_BLEU':
        offreReturn = {
          code: 'ELEC_BLEU',
          libelle: 'Tarif Bleu',
          description: 'Faites le choix de la simplicité',
          description2: 'Le kWh est toujours au même tarif, quels que soient l’heure et le jour de la semaine'
        };
        break;
      case 'ELEC_PE_WE':
        offreReturn = {
          code: 'ELEC_PE_WE',
          libelle: 'Vert Électrique Week-end',
          description: 'Payez moins cher votre électricité verte le week-end',
          description2: 'Blabla'
        };
        break;
      case 'ELEC_PE_VERT':
        offreReturn = {
          code: 'ELEC_PE_VERT',
          libelle: 'Vert Électrique',
          description: 'Contribuez à la transition énergétique sans changer vos habitudes !',
          description2: 'Blabla'
        };
        break;
      case 'ELEC_PE_VERT':
        offreReturn = {
          code: 'ELEC_PE_AUTO',
          libelle: 'Vert Électrique Auto',
          description: 'Rechargez votre voiture électrique avec une électricité 40% moins chère la nuit et à prix fixe sur 3 ans',
          description2: 'Blabla'
        };
        break;
      default:
        break;
    }
    return offreReturn;
  }
}
