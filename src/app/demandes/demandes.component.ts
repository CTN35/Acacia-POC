import { BpmDataService } from './../bpm-data.service';
import { ModelService } from './../model.service';
import { Router } from '@angular/router';
import { GlobalMessageService } from './../global-message.service';
import { Component, OnInit } from '@angular/core';
import { Process, Offre } from 'src/app/Model';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {

  constructor(private msgService: GlobalMessageService, private router: Router,
    public model: ModelService, private dataService: BpmDataService) { }

  ngOnInit() {
    if (!this.model.user.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }

  }

  save() {
    this.router.navigate(['/']);
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
