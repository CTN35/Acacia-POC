import { environment } from './../../environments/environment';
import { BpmDataService } from './../bpm-data.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalMessageService } from 'src/app/global-message.service';
import { Router } from '@angular/router';
import { Offre } from 'src/app/Model';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy {
  offre: Offre;
  new_offre: Offre;
  option: any;
  subscription: Subscription;

  constructor(private msgService: GlobalMessageService, private router: Router,
    public model: ModelService, private dataService: BpmDataService) {

  }

  ngOnInit() {
    if (!this.model.user.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    } else {
      this.offre = this.model.tabOffres[this.model.originalOffer];
      this.new_offre = this.model.tabOffres[this.model.selectedOffer];
      this.option = this.model.selectedOption;
    }
    console.log(this.model.selectedOption);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();

  }

  save() {
    this.dataService.completeTask(this.model.currentTaskId, {
      panierValideParConseiller: !environment.ihmClient
    }).subscribe( out => {
      setTimeout(this.router.navigate(['/demandes']), 200);
    });
  }

}
