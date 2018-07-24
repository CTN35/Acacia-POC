import { Offre } from './../Model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  offres: Offre[] = [
    { code: 'elec_bleu', libelle: 'Tarif Bleu', description: 'Faites le choix de la simplicité', description2: 'Le kWh est toujours au même tarif, quels que soient l’heure et le jour de la semaine'},
    { code: 'elec_vert', libelle: 'Vert Électrique', description: 'Contribuez à la transition énergétique sans changer vos habitudes !', description2: 'Blabla'},
    { code: 'elec_vert_we', libelle: 'Vert Électrique Week-end', description: 'Payez moins cher votre électricité verte le week-end', description2: 'Blabla'},
    { code: 'elec_vert_auto', libelle: 'Vert Électrique Auto', description: 'Rechargez votre voiture électrique avec une électricité 40% moins chère la nuit et à prix fixe sur 3 ans', description2: 'Blabla'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
