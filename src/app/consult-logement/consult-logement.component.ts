import { ReferentielService } from './../referentiel.service';
import { Subscription } from 'rxjs';
import { ModelService } from './../model.service';
import { environment } from './../../environments/environment';
import { BpmDataService } from './../bpm-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Logement, Offre, Option } from 'src/app/Model';
import { Offre } from 'src/app/Model';
import { GlobalMessageService } from 'src/app/global-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult-logement',
  templateUrl: './consult-logement.component.html',
  styleUrls: ['./consult-logement.component.css']
})
export class ConsultLogementComponent implements OnInit, OnDestroy {
  local: any;
  adresse: any;
  offre: Offre;
  newOffre: Offre;
  options: Array<any>;
  selectedOptionIndex = '0';
  selectedOption: any;
  dataLoadFinished = false;
  subscription: Subscription = null;

  existingProcess = false;

  constructor(private msgService: GlobalMessageService, private router: Router,
    private dataService: BpmDataService, public model: ModelService, public referentiel: ReferentielService) {
    this.subscription = this.msgService.getMessage().subscribe(message => { });

  }

  ngOnInit() {
    if (!this.model.user.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }

    if (this.model.existingProcess) {
      this.model.existingProcess = false;
      this.existingProcess = true;
    }

    this.local = this.model.currentLocal;
    this.adresse = this.model.adresse;

    this.offre = this.model.tabOffres[this.model.originalOffer];
    this.newOffre = this.model.tabOffres[this.model.selectedOffer];

    const clsOpt = this.model.clsOption;
    this.options = this.model.options.sort(function (a, b) {
      return a[clsOpt].ordrePreconisation - b[clsOpt].ordrePreconisation;
    });

    if (this.model.rerunSimulation) {
      this.model.rerunSimulation = false;
      this.rerunSimulation();
    }

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  modifLogement() {
    this.msgService.sendMessage('modifLogement', { logement: this.local });
    this.router.navigate(['/modification']);
  }

  rerunSimulation() {
    this.model.ongoingSimulation = true;
    this.selectedOptionIndex = '0';
    // empty options
    const taskInput = this.model.modelToInputModifLocal(true);

    this.dataService.completeTask(this.model.currentTaskId, taskInput).subscribe(
      result => {
        setTimeout(() => {
          this.refreshOptions();
        }, 500);
      });
  }

  refreshOptions() {
    this.dataService.getTasks().subscribe(
      tasks => {
        const arr: Array<any> = <Array<any>>tasks['task-summary'];
        let taskId = -1;
        arr.forEach(t => {
          if (Number(t['task-proc-inst-id']) === this.model.currentProcessInstanceId) {
            taskId = Number(t['task-id']);
          }
        });

        if (taskId > 0) {
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
          setTimeout(() => this.refreshOptions(), 200);
        }
      }
    );
  }

  setOffre() {
    const selectionIndex = Number(this.selectedOptionIndex);
    this.model.selectedOption = this.options[selectionIndex];
    this.selectedOption = this.options[selectionIndex];
    const taskInput = this.model.modelToInputModifLocal(false);

    this.dataService.completeTask(this.model.currentTaskId, taskInput).subscribe(
      result => {
        this.model.currentTaskId = -1;
        this.model.currentTask = {};
        setTimeout(() => this.getTaskInfos(), 200);
      });
    // this.msgService.sendMessage('modifOffre', { offre: this.offre, new_offre: this.newOffre, option: this.selectedOption });
  }

  getTaskInfos(nbTry: number = 0) {

    this.dataService.getTasks().subscribe(
      tasks => {
        const arr: Array<any> = <Array<any>>tasks['task-summary'];
        let taskId = -1;
        arr.forEach(t => {
          if (Number(t['task-proc-inst-id']) === this.model.currentProcessInstanceId) {
            taskId = Number(t['task-id']);
          }
        });

        if (taskId > 0) {
          this.model.currentTaskId = taskId;
          this.dataService.getTaskInfos(taskId).subscribe(
            task => {
              this.model.currentTask = task;
              this.model.currentTaskId = taskId;
              this.router.navigate(['/panier']);
            }
          );
        } else if (nbTry > 2) {
          this.msgService.sendMessage('GeneralError', 'No task found');
          this.router.navigate(['/panier']);
        } else {
          setTimeout(this.getTaskInfos(nbTry + 1), 500);
        }
      }
    );
  }

  signalConseiller() {
    this.dataService.signalProcess(this.model.currentProcessInstanceId, 'RappelConseillerSig').subscribe(
      x => { }
    );
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
