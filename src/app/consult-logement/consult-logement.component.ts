import { Subscription } from 'rxjs';
import { ModelService } from './../model.service';
import { environment } from './../../environments/environment';
import { BpmDataService } from './../bpm-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Logement, Offre, Option } from 'src/app/Model';
import { GlobalMessageService } from 'src/app/global-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult-logement',
  templateUrl: './consult-logement.component.html',
  styleUrls: ['./consult-logement.component.css']
})
export class ConsultLogementComponent implements OnInit, OnDestroy {
  logement: Logement;
  offre: Offre;
  newOffre: Offre;
  options: Option[];
  selectedOptionIndex: number;
  selectedOption: Option;
  dataLoadFinished = false;
  subscription: Subscription = null;

  existingProcess = false;

  constructor(private msgService: GlobalMessageService, private router: Router,
    private dataService: BpmDataService, private model: ModelService) {
    this.subscription = this.msgService.getMessage().subscribe(message => {
      switch (message.type) {
        case 'newLogement':
        this.model.currentLogement = message.data.logement;
          this.logement = this.model.currentLogement;
          this.rerunSimulation();
          break;
        default:
          break;
      }
    });

  }

  ngOnInit() {
  if(!this.model.user.isAuthenticated) {
    this.router.navigate(['/']);
    return;
  }

    if (this.model.existingProcess) {
      this.model.existingProcess = false;
      this.existingProcess = true;
    }

    if (!this.logement) {
      this.logement = this.model.currentLogement;
    }

    this.offre = this.model.getOffre(this.model.originalOffer);
    this.newOffre = this.model.getOffre(this.model.selectedOffer);
    this.options = this.model.options.sort(function (a, b) {
      return a.ordrePreconisation - b.ordrePreconisation;
    });

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  modifLogement() {
    this.msgService.sendMessage('modifLogement', { logement: this.logement });
    this.router.navigate(['/modification']);
  }

  rerunSimulation() {
    this.model.ongoingSimulation = true;
    // empty options
    const taskInput = this.model.modelToInputModifLocal(true);

    this.dataService.completeTask(this.model.currentTaskId, taskInput).subscribe(
      result => {
        setTimeout(() => {
          this.refreshOptions();
        }, 200);
      });
  }

  refreshOptions() {
    this.dataService.getTasks(this.model.currentProcessInstanceId).subscribe(
      tasks => {
        const arr: Array<any> = <Array<any>>tasks['task-summary'];
        if (arr.length > 0) {
          const taskId = Number(arr[0]['task-id']);
          this.model.currentTaskId = taskId;
          this.dataService.getTaskInfos(taskId).subscribe(
            task => {
              if ((<string>task['task-name']).startsWith('Modifier')) {
                // populate options
                // set ongoing to false
                this.dataService.getProcessVariables(this.model.currentProcessInstanceId).subscribe(
                  vars => {
                    this.model.refreshOptions(vars);
                    this.model.ongoingSimulation = false;
                  }
                );
              } else {
                this.router.navigate(['/bridge']);
              }
            }
          );
        } else {
          // retry after 500ms
          setTimeout(() => this.refreshOptions(), 500);
        }
      }
    );
  }

  setOffre() {
    this.selectedOption = this.options[this.selectedOptionIndex];
    const taskInput = this.model.modelToInputModifLocal(false);

    this.dataService.completeTask(this.model.currentTaskId, taskInput).subscribe(
      result => {
        this.router.navigate(['/panier']);
      });
    // this.msgService.sendMessage('modifOffre', { offre: this.offre, new_offre: this.newOffre, option: this.selectedOption });
  }

}
