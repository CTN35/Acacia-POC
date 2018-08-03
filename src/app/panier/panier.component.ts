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
  displayData = false;
  subscription: Subscription;

  constructor(private msgService: GlobalMessageService, private router: Router, public model: ModelService) {
    this.subscription = this.msgService.getMessage().subscribe(message => {
      switch (message.type) {
        case 'modifOffre':
          this.offre = message.data.offre;
          this.new_offre = message.data.new_offre;
          this.option = message.data.option;
          this.displayData = true;
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
    } else {
      this.offre = this.model.tabOffres[this.model.originalOffer];
      this.new_offre = this.model.tabOffres[this.model.selectedOffer];
      this.option = this.model.selectedOption;
      this.displayData = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  save() {
    this.model.state = 'Soumise';
    this.router.navigate(['/demandes']);
  }

}
