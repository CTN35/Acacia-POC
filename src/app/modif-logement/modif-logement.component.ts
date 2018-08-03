import { ReferentielService } from './../referentiel.service';
import { Subscription } from 'rxjs';
import { Logement } from 'src/app/Model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Input } from '@angular/core';
import { GlobalMessageService } from 'src/app/global-message.service';
import { Router } from '@angular/router';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-modif-logement',
  templateUrl: './modif-logement.component.html',
  styleUrls: ['./modif-logement.component.css']
})
export class ModifLogementComponent implements OnInit, OnDestroy {
  logement: Logement;
  displayForm = false;
  subscription: Subscription;

  constructor(private msgService: GlobalMessageService, private router: Router,
    public model: ModelService, public referentiel: ReferentielService) {
    this.subscription = this.msgService.getMessage().subscribe(message => {
      switch (message.type) {
        case 'modifLogement':
          this.logement = message.data.logement;
          this.displayForm = true;
          break;
        default:
          break;
      }
    });
  }

  ngOnInit() {
    if (!this.model.user.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }
    this.logement = this.model.currentLogement;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setLogement(logementForm) {
    const tabBoolean = {'true': true, 'false': false};
    this.logement.presencePiscine = tabBoolean['' + this.logement.presencePiscine];
    this.logement.presenceAlimentationGaz = tabBoolean['' + this.logement.presenceAlimentationGaz];
    this.model.currentLogement = this.logement;
    this.msgService.clearMessage();
    this.msgService.sendMessage('newLogement', {logement: this.logement});
    this.router.navigate(['/details']);
  }

}
