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

  constructor(private msgService: GlobalMessageService, private router: Router, private model: ModelService ) {
    this.msgService.getMessage().subscribe(message => { this.handleMessage(message); });
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  selectOffre(offer: string) {
    // this.model.resetModel(false);
    this.model.selectedOffer = offer;
    this.router.navigate(['/bridge']);
  }

  logout() {
    this.model.resetModel(true);
    this.router.navigate(['/']);
  }

  handleMessage(message: any) {
    switch (message['type']) {
      case 'login':

        break;
      default:
        break;
    }
  }
}
