import { Logement } from 'src/app/Model';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Input } from '@angular/core';
import { GlobalMessageService } from 'src/app/global-message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modif-logement',
  templateUrl: './modif-logement.component.html',
  styleUrls: ['./modif-logement.component.css']
})
export class ModifLogementComponent implements OnInit {
  logement: Logement;
  displayForm = false;

  constructor(private msgService: GlobalMessageService,  private router: Router) {
    this.msgService.getMessage().subscribe(message => {
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
  }

  setLogement(logementForm) {
    this.msgService.sendMessage('newLogement', {logement: this.logement});
    this.router.navigate(['/details']);
  }

}
