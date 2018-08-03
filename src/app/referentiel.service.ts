import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  classeEnergetique = {
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'E': 'E',
    'F': 'F',
    'G': 'G'
  };

  energieAppareilCuissonPrincipal = {
    'Butane': 'Butane',
    'Electricite': 'Electricité',
    'Fonte': 'Fonte',
    'Gaz': 'Gaz',
    'Autre': 'Autre'
  };

  energieChauffage = {
    'Aerothermie': 'Aerothermie',
    'Bois': 'Bois',
    'Charbon': 'Charbon',
    'Collectif': 'Collectif',
    'Electricite': 'Electricité',
    'Fioul': 'Fioul',
    'Gaz': 'Gaz',
    'Geothermie': 'Géothermie',
    'Propane': 'Propane',
    'Solaire': 'Solaire',
    'Autre': 'Autre'
  };

  energieChauffagePiscine = {
    'Electricite': 'Electricité',
    'Autre': 'Autre'
  };

  equipementChauffage = {
    'Aucun': 'Aucun',
    'CentraliseAirAvecPAC': 'Centralisé Air Avec PAC',
    'ChaudiereMixte': 'Chaudière Mixte',
    'ChaudiereStandard': 'Chaudière Standard',
    'ClimatisationReversible': 'Climatisation Réversible',
    'Convecteur': 'Convecteur',
    'ConvecteurPanneauxRayonnants': 'Convecteur Panneaux Rayonnants',
    'GazChaudiereAncienne': 'Gaz Chaudière Ancienne',
    'GazChaudiereBasseTemperature': 'Gaz Chaudière Basse Température',
    'GazChaudiereCondensation': 'Gaz Chaudiere Condensation',
    'GazChaudiereHautRendement': 'Gaz Chaudiere Haut Rendement',
    'GazChaudiereStandard': 'Gaz Chaudiere Standard',
    'GazInconnu': 'Gaz Inconnu',
    'Insert': 'Insert',
    'PACGenerique': 'PAC Générique',
    'PACHauteTemperature': 'PAC Haute Température',
    'PACHybride': 'PAC Hybride',
    'PanneauRayonnant': 'Panneau Rayonnant',
    'PlancherChauffantAvecPAC': 'Plancher Chauffant Avec PAC',
    'PlancherRayonnantElec': 'Plancher Rayonnant Elec',
    'Poele': 'Poêle',
    'RadiateurAccumulation': 'Radiateur Accumulation',
    'RadiateurElectrique': 'Radiateur Electrique',
    'RadiateurGenerique': 'Radiateur Générique',
    'SecheServiette': 'Seche Serviette',
    'SplitAvecPAC': 'Split Avec PAC',
    'VCVAvecPAC': 'VCV Avec PAC',
    'Autre': 'Autre'
  };

  energieChauffeEau = {
    'Aerothermie': 'Aérothermie',
    'Collectif': 'Collectif',
    'Electricite': 'Electricité',
    'Fioul': 'Fioul',
    'Gaz': 'Gaz',
    'Propane': 'Propane',
    'Solaire': 'Solaire',
    'Autre': 'Autre'
  };

  typeLogement = {
    'Appartement': 'Appartement',
    'Maison': 'Maison',
    'Autre': 'Autre'
  };

  typeOccupation = {
    'Locataire': 'Locataire',
    'Proprietaire': 'Proprietaire'
  };

  typeResidence = {
    'Principale': 'Principale',
    'Secondaire': 'Secondaire'
  };

  getReferentielAsArray(ref: string): Array<any> {
    // Step 1. Get all the object keys.
    const keys = Object.keys(this[ref]);
    // Step 2. Create an empty array.
    const objs: Array<any> = [];
    // Step 3. Iterate throw all keys.
    keys.forEach(id => {
      objs.push({ code: id, label: this[ref][id] });
    });
    return objs;
  }

  constructor() { }
}
