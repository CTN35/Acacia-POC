import { Process, Offre, Option, Logement } from './../Model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  tabProcess: Process[];
  tabOffre: Offre[];
  tabOption: Option[];
  tabLogement: Logement[];
  cols: string[];
  selectedProcess: Process;

  constructor() { }

  ngOnInit() {
    this.cols = ['Logement', 'Offre actuelle', 'Nouvelle Offre', 'Option', 'Actions'];
    // this.tabProcess = [
    //   {idLogement: 0, idOffreSouscrite: 0, idOffreSelectionnee: 1, idOption: 1, numeroBpContrat: '', numeroPdlContrat: ''},
    //   {idLogement: 1, idOffreSouscrite: 1, idOffreSelectionnee: 0, idOption: 0, numeroBpContrat: '', numeroPdlContrat: ''}
    // ];

    // this.tabLogement = [
    //   {
    //     ville: 'CHANTEPIE',
    //     codePostal: '35135',
    //     codeINSEE: '',
    //     lieudit: '',
    //     type: 'Appartement',
    //     surface: 47,
    //     chauffage: 'Electricité Classique',
    //     annee: '1997_2001',
    //     classeEnergetique: 'C',
    //     numPDL: '1215421A',
    //     numPCE: '1125445A',
    //     gaz: false,
    //     energieEauChaude: 'Electricité',
    //     chauffagePiscine: '',
    //     nbOccupant: 1,
    //     statutOccupant: 'Locataire',
    //     presencePiscine: false,
    //     vehiculeElectrique: false,
    //     laveVaisselle: false,
    //     congelateur: false,
    //     plaqueInduction: true,
    //     secheLinge: false,
    //     climatisation: false,
    //     typeResidence: 'Principale',
    //     chauffageAlternatif: 'AUCUN'
    //   },
    //   {
    //     ville: 'IFFENDIC',
    //     codePostal: '35750',
    //     codeINSEE: '',
    //     lieudit: '',
    //     type: 'Maison',
    //     surface: 130,
    //     chauffage: 'Electricité Classique',
    //     annee: '2002_2012',
    //     classeEnergetique: 'C',
    //     numPDL: '1215421A',
    //     numPCE: '1125445A',
    //     gaz: true,
    //     energieEauChaude: 'Gaz',
    //     chauffagePiscine: '',
    //     nbOccupant: 4,
    //     statutOccupant: 'Propriétaire',
    //     presencePiscine: false,
    //     vehiculeElectrique: false,
    //     laveVaisselle: true,
    //     congelateur: true,
    //     plaqueInduction: false,
    //     secheLinge: true,
    //     climatisation: false,
    //     typeResidence: 'Principale',
    //     chauffageAlternatif: 'BOIS'
    //   }
    // ];
    // this.tabOffre = [
    //   {
    //     code: 'elec_bleu',
    //     libelle: 'Tarif Bleu',
    //     description: 'Faites le choix de la simplicité',
    //     description2: 'Le kWh est toujours au même tarif, quels que soient l’heure et le jour de la semaine'
    //   },
    //   {
    //     code: 'elec_vert',
    //     libelle: 'Vert Électrique',
    //     description: 'Contribuez à la transition énergétique sans changer vos habitudes !',
    //     description2: 'Blabla'
    //   }
    // ];
    // this.tabOption = [
    //   { libelle: 'Option1', montant: 600, typePrix: 'Fixe', dureePrixFixe: 12, delaisPrevenance: 15 },
    //   { libelle: 'Option2', montant: 699, typePrix: 'Evolutif', dureePrixFixe: 0, delaisPrevenance: 30 },
    //   { libelle: 'Option3', montant: 750, typePrix: 'Fixe', dureePrixFixe: 24, delaisPrevenance: 15 }
    // ];
  }

}
