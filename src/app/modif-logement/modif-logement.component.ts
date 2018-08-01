import { ModelService } from './../model.service';
import { Subscription } from 'rxjs';
import { Logement } from 'src/app/Model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Input } from '@angular/core';
import { GlobalMessageService } from 'src/app/global-message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modif-logement',
  templateUrl: './modif-logement.component.html',
  styleUrls: ['./modif-logement.component.css']
})
export class ModifLogementComponent implements OnInit, OnDestroy {
  logement: Logement;
  displayForm = false;
  subscription: Subscription;

  constructor(private msgService: GlobalMessageService, private router: Router, private model: ModelService) {
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setLogement(logementForm) {
    this.msgService.clearMessage();
    this.msgService.sendMessage('newLogement', { logement: this.logement });
    this.router.navigate(['/details']);
  }

}
