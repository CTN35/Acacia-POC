import { Subscription, Observable, forkJoin } from 'rxjs';
import { GlobalMessageService } from './../global-message.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { BpmDataService } from './../bpm-data.service';
import { ModelService } from './../model.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.css']
})
export class BridgeComponent implements OnInit {

  constructor(public model: ModelService, private dataService: BpmDataService,
    private router: Router, private messageService: GlobalMessageService) { }

  ngOnInit() {

    if (this.model.user.isAuthenticated) {
      this.startOrGetProcess();
    } else {
      this.router.navigate(['/login']);
    }

  }

  startOrGetProcess() {

    this.dataService.getProcesses().subscribe(
      result => {
        let processId = -1;

        const tabProcObservables: Array<Observable<any>> = [];
        (<Array<any>>result['process-instance']).forEach(element => {
          tabProcObservables.push(this.dataService.getProcessVariables(Number(element['process-instance-id'])));
        });

        forkJoin(tabProcObservables).subscribe(
          variables => {
            variables.forEach((vars, index) => {
              if (processId <= 0 && result['process-instance'][index]['process-id'] === environment.bpmProcessId
                && vars['numeroBpContrat'] === this.model.user.login) {
                processId = Number(result['process-instance'][index]['process-instance-id']);
              }

            });
            // here
            if (processId > 0) {
              this.model.currentProcessInstanceId = processId;
              this.model.existingProcess = true;
            }


            // Get ongoing process or start new process ==> A faire au niveau du model ?
            if (this.model.currentProcessInstanceId <= 0 || environment.allowMultipleProcess) {
              if (this.model.selectedOffer == null) {
                this.router.navigate(['/']);
                return;
              }
              let bpId = Number(this.model.user.login);
              if (Number.isNaN(bpId)) {
                bpId = 244466666;
              }
              this.dataService.startNewProcess(environment.bpmProcessId,
                {
                  numeroBpContrat: '' + bpId,
                  idOffreSelectionnee: this.model.selectedOffer,
                  tempsAttenteAvantRelanceEmail: environment.tempsAttenteEmail
                }).subscribe(id => {
                  this.model.currentProcessInstanceId = Number(id);
                  this.getBpmData();
                });
            } else {
              this.getBpmData();
            }
          }
        );
      }
    );
  }



  getBpmData(nbTry: number = 0): void {
    // get process to load model
    this.dataService.getProcessVariables(this.model.currentProcessInstanceId).subscribe(
      vars => {
        this.model.loadModel(vars);
        this.getTaskInfos(true, nbTry);
      }
    );
  }

  getTaskInfos(autoRouting = true, nbTry: number = 0) {

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
              let route = 'demandes';
              if (autoRouting) {
                if ((<string>task['task-name']).startsWith('Modifier')) {
                  route = 'details';
                } else if ((<string>task['task-name']).startsWith('Valider')) {
                  route = 'panier';
                }
                if (this.model.existingProcess && !this.model.byPassExistingProcess) {
                  this.router.navigate(['/demandes']);
                } else {
                  this.router.navigate(['/' + route]);
                }
              } else {
                this.messageService.sendMessage('taskLoaded', task);
              }
            }
          );

        } else {
          // retry after 500ms
          if (nbTry > 2) {
            this.router.navigate(['/demandes']);
          } else {
            setTimeout(() => this.getBpmData(nbTry + 1), 500);
          }
        }
      }
    );
  }

}
