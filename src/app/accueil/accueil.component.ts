import { ModelService } from './../model.service';
import { Router } from '@angular/router';
import { GlobalMessageService } from './../global-message.service';
import { Offre } from './../Model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, OnDestroy {

  offres: Offre[] = [
    { code: 'elec_bleu', libelle: 'Tarif Bleu', description: 'Faites le choix de la simplicité', description2: 'Le kWh est toujours au même tarif, quels que soient l’heure et le jour de la semaine' },
    { code: 'elec_vert', libelle: 'Vert Électrique', description: 'Contribuez à la transition énergétique sans changer vos habitudes !', description2: 'Blabla' },
    { code: 'elec_vert_we', libelle: 'Vert Électrique Week-end', description: 'Payez moins cher votre électricité verte le week-end', description2: 'Blabla' },
    { code: 'elec_vert_auto', libelle: 'Vert Électrique Auto', description: 'Rechargez votre voiture électrique avec une électricité 40% moins chère la nuit et à prix fixe sur 3 ans', description2: 'Blabla' },
  ];

  constructor(private msgService: GlobalMessageService, private router: Router, private model: ModelService ) { }

  ngOnInit() {
    this.msgService.getMessage().subscribe(message => { this.handleMessage(message); });
  }

  ngOnDestroy() {
  }

  selectOffre(offer: string): void {
    this.model.selectedOffer = offer;
    this.router.navigate(['/details']);
  }

  handleMessage(message: any): void {
    switch (message['type']) {
      case 'login':

        break;
      default:
        break;
    }
  }
}
