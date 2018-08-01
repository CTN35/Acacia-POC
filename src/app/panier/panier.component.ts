import { ModelService } from './../model.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalMessageService } from 'src/app/global-message.service';
import { Router } from '@angular/router';
import { Offre, Option } from 'src/app/Model';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit, OnDestroy {
  offre: Offre;
  new_offre: Offre;
  option: Option;
  displayData = false;
  subscription: Subscription;

  constructor(private msgService: GlobalMessageService, private router: Router, private model: ModelService) {
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
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }

  save() {
    this.router.navigate(['/']);
  }

}
