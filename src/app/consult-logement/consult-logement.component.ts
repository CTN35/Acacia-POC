import { ModelService } from './../model.service';
import { environment } from './../../environments/environment';
import { BpmDataService } from './../bpm-data.service';
import { Component, OnInit } from '@angular/core';
import { Logement, Offre, Option } from 'src/app/Model';
import { GlobalMessageService } from 'src/app/global-message.service';
import { Router } from '@angular/router';

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
  selectedOptionIndex: number;
  selectedOption: Option;
  dataLoadFinished = false;

  constructor(private msgService: GlobalMessageService, private router: Router,
    private dataService: BpmDataService, private model: ModelService) {
    this.msgService.getMessage().subscribe(message => {
      switch (message.type) {
        case 'newLogement':
          this.logement = message.data.logement;
          break;
        default:
          break;
      }
    });
  }

  ngOnInit() {
    if (!this.logement) {
      this.logement = this.model.currentLogement;
    }

    this.offre = this.model.getOffre(this.model.originalOffer);
    this.newOffre = this.model.getOffre(this.model.selectedOffer);
    this.options = this.model.options.sort(function(a, b) {
      return a.ordrePreconisation - b.ordrePreconisation;
    });

  }

  modifLogement() {
    this.msgService.sendMessage('modifLogement', { logement: this.logement });
    this.router.navigate(['/modification']);
  }

  setOffre() {
    this.selectedOption = this.options[this.selectedOptionIndex];
    this.msgService.sendMessage('modifOffre', { offre: this.offre, new_offre: this.newOffre, option: this.selectedOption });
    this.router.navigate(['/panier']);
  }

}
