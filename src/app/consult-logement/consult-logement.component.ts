import { Component, OnInit } from '@angular/core';
import { Logement, Offre, Option } from 'src/app/Model';

@Component({
  selector: 'app-consult-logement',
  templateUrl: './consult-logement.component.html',
  styleUrls: ['./consult-logement.component.css']
})
export class ConsultLogementComponent implements OnInit {
  logement: Logement;
  offre: Offre;
  newOffre: Offre;
  options: Option[];

  constructor() {
  }

  ngOnInit() {
    this.logement = {
      ville: 'CHANTEPIE',
      codePostal: '35135',
      codeINSEE: '',
      lieudit: '',
      type: 'appartement',
      surface: 47,
      chauffage: 'Electricité Classique',
      annee: '1997-2001',
      classeEnergetique: 'C',
      numPDL: '1215421A',
      numPCE: '1125445A',
      gaz: false,
      energieEauChaude: 'Electricité',
      piscineElectrique: false,
      nbOccupant: 1,
      statutOccupant: 'Locataire',
      vehiculeElectrique: false,
      laveVaisselle: false,
      congelateur: false,
      plaqueInduction: true,
      secheLinge: false,
      climatisation: false,
      typeResidence: 'Principale',
      chauffageAlternatif: 'AUCUN'
    };
    this.offre = {
      code: 'elec_bleu',
      libelle: 'Tarif Bleu',
      description: 'Faites le choix de la simplicité',
      description2: 'Le kWh est toujours au même tarif, quels que soient l’heure et le jour de la semaine'
    };
    this.newOffre = {
      code: 'elec_vert',
      libelle: 'Vert Électrique',
      description: 'Contribuez à la transition énergétique sans changer vos habitudes !',
      description2: 'Blabla'
    };
    this.options = [
      { libelle: 'Option1', montant: 600, typePrix: 'Fixe', dureePrixFixe: 12, delaisPrevenance: 15 },
      { libelle: 'Option2', montant: 699, typePrix: 'Evolutif', dureePrixFixe: 0, delaisPrevenance: 30 },
      { libelle: 'Option3', montant: 750, typePrix: 'Fixe', dureePrixFixe: 24, delaisPrevenance: 15 }
    ];
  }

}
