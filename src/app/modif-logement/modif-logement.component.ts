import { Logement } from 'src/app/Model';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-modif-logement',
  templateUrl: './modif-logement.component.html',
  styleUrls: ['./modif-logement.component.css']
})
export class ModifLogementComponent implements OnInit {
  @Input() logement: Logement;

  constructor() { }

  ngOnInit() {
    this.logement = {
      ville: 'CHANTEPIE',
      codePostal: '35135',
      codeINSEE: '',
      lieudit: '',
      type: 'Appartement',
      surface: 47,
      chauffage: 'Electricité Classique',
      annee: '1997_2001',
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
  }

  setLogement(logementForm) {
    console.log(logementForm);
  }
}
