export class AuthUser {
  login = '';
  password = '';
  isAuthenticated = false;
}

export class Offre {
  code: string;
  libelle: string;
  description: string;
  description2: string;
}

/*
export class Logement {
  ville: string;
  codePostal: string;
  codeINSEE: string;
  lieudit: string;
  typeLogement: string;
  surface: number;
  nbOccupant: number;
  typeOccupation: string;
  typeResidence: string;
  energieChauffagePrincipal: string;
  equipementChauffagePrincipal: string;
  annee: number;
  classeEnergetique: string;
  presenceAlimentationGaz: boolean;
  energieEauChaudeSanitaire: string;
  energieChauffageSecondaire: string;
  presencePiscine: boolean;
  chauffagePiscine: string;
  vehiculeElectrique = false;
  laveVaisselle = false;
  congelateur = false;
  plaqueInduction = false;
  secheLinge = false;
  climatisation = false;
}


export class Option {
  nomOption: string;
  cadrans: Cadran[];
  montantAnnuelEstime: number;
  montantAnnuelOptimise: number;
  ordrePreconisation: number;
  optionSelectionnee: boolean;
}

export class Cadran {
  consommationCadran: number;
  nomCadran: string;
  prixAbonnement: number;
  prixKwh: number;
}
*/
export class Process {
  id: number;
  selectedOffer: string;
  originalOffer: string;
  selectedOption: any;
  currentProcessInstanceId: number;
  originalLogement: any;
  currentLogement: any;
  logementModified: false;
  numeroBpContrat: string;
  numeroPdlContrat: string;
  state: string;
}
