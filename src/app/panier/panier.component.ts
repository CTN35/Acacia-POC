import { Component, OnInit } from '@angular/core';
import { GlobalMessageService } from 'src/app/global-message.service';
import { Router } from '@angular/router';
import { Offre, Option } from 'src/app/Model';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  offre: Offre;
  new_offre: Offre;
  option: Option;
  displayData = false;

  constructor(private msgService: GlobalMessageService,  private router: Router) {
    this.msgService.getMessage().subscribe(message => {
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
  }

  save() {
    console.log('OK');
    this.router.navigate(['/']);
  }

}
