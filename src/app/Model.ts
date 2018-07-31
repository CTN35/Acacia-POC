export class AuthUser {
  login = '';
  password = '';
  isAuthenticated = false;
}

export class Logement {
  ville: string;
  codePostal: string;
  codeINSEE: string;
  lieudit: string;
  type: string;
  surface: number;
  chauffage: string;
  annee: string;
  classeEnergetique: string;
  numPDL: string;
  numPCE: string;
  gaz: boolean;
  energieEauChaude: string;
  chauffagePiscine: string;
  nbOccupant: number;
  statutOccupant: string;
  vehiculeElectrique: boolean;
  laveVaisselle: boolean;
  congelateur: boolean;
  plaqueInduction: boolean;
  secheLinge: boolean;
  climatisation: boolean;
  typeResidence: string;
  chauffageAlternatif: string;
}

export class Offre {
  code: string;
  libelle: string;
  description: string;
  description2: string;
}

export class Option {
  libelle: string;
  montant: number;
  typePrix: string;
  dureePrixFixe: number;
  delaisPrevenance: number;
}

export class Process {
  idLogement: number;
  idAncienneOffre: number;
  idNouvelleOffre: number;
  idOption: number;
}
