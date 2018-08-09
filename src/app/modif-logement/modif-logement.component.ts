import { BpmDataService } from './../bpm-data.service';
import { Subscription } from 'rxjs';
// import { Logement } from 'src/app/Model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Input } from '@angular/core';
import { GlobalMessageService } from 'src/app/global-message.service';
import { Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';
import { ReferentielService } from 'src/app/referentiel.service';

@Component({
  selector: 'app-modif-logement',
  templateUrl: './modif-logement.component.html',
  styleUrls: ['./modif-logement.component.css']
})
export class ModifLogementComponent implements OnInit, OnDestroy {
  adresse: any;
  local: any;
  subscription: Subscription;
  tabTypeLogement = [];
  tabTypeOccupation = [];
  tabTypeResidence = [];
  tabTypeClasseEnergetique = [];
  tabTypeEnergie = [];
  tabEquipementChauffage = [];
  tabEnergieEau = [];
  tabEnergieChauffagePiscine = [];
  tabBoolean = {'true': true, 'false': false};

  constructor(private msgService: GlobalMessageService, private router: Router,
    public model: ModelService, public referentiel: ReferentielService, private dataService: BpmDataService) {
    /*this.subscription = this.msgService.getMessage().subscribe(message => {
      switch (message.type) {
        case 'modifLogement':
          this.logement = message.data.logement;
          this.displayForm = true;
          break;
        default:
          break;
      }
    });*/
  }

  ngOnInit() {
    if (!this.model.user.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }
    this.local = this.model.currentLocal;
    this.adresse = this.model.adresse;
    this.tabTypeLogement = this.referentiel.getReferentielAsArray('typeLogement');
    this.tabTypeOccupation = this.referentiel.getReferentielAsArray('typeOccupation');
    this.tabTypeResidence = this.referentiel.getReferentielAsArray('typeResidence');
    this.tabTypeClasseEnergetique = this.referentiel.getReferentielAsArray('classeEnergetique');
    this.tabTypeEnergie = this.referentiel.getReferentielAsArray('energieChauffage');
    this.tabEquipementChauffage = this.referentiel.getReferentielAsArray('equipementChauffage');
    this.tabEnergieEau = this.referentiel.getReferentielAsArray('energieChauffeEau');
    this.tabEnergieChauffagePiscine = this.referentiel.getReferentielAsArray('energieChauffagePiscine');
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  setLogement(logementForm) {
    const tabBoolean = {'true': true, 'false': false};
    this.local.presencePiscine = tabBoolean['' + this.local.presencePiscine];
    this.local.presenceAlimentationGaz = tabBoolean['' + this.local.presenceAlimentationGaz];
    this.model.currentLocal = this.local;

    this.model.rerunSimulation = true;
    this.msgService.clearMessage();
    this.msgService.sendMessage('newLogement', {logement: this.local});
    this.router.navigate(['/details']);
  }

  cancelDemande() {
    this.dataService.cancelProcess(this.model.currentProcessInstanceId).subscribe(
      rs => {
        this.model.resetModel(false);
        this.router.navigate(['/']);
      }
    );
  }

}
