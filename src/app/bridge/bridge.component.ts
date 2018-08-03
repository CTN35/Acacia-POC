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
    if (this.model.selectedOffer == null) {
      this.router.navigate(['/']);
      return;
    }
    this.dataService.getProcesses().subscribe(
      result => {
        let processId = -1;
        (<Array<any>>result['process-instance']).forEach(element => {
          if (processId <= 0 && element['process-id'] === environment.bpmProcessId) {
            processId = Number(element['process-instance-id']);
          }
        });

        if (processId > 0) {
          this.model.currentProcessInstanceId = processId;
          this.model.existingProcess = true;
        } else {
        }

        // Get ongoing process or start new process ==> A faire au niveau du model ?
        if (this.model.currentProcessInstanceId <= 0 || environment.allowMultipleProcess) {
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



  getBpmData(): void {
    // get process to load model
    this.dataService.getProcessVariables(this.model.currentProcessInstanceId).subscribe(
      vars => {
        this.model.loadModel(vars);
        this.getTaskInfos();
      }
    );
  }

  getTaskInfos(autoRouting = true) {

    this.dataService.getTasks(this.model.currentProcessInstanceId).subscribe(
      tasks => {
        const arr: Array<any> = <Array<any>>tasks['task-summary'];
        if (arr.length > 0) {
          const taskId = Number(arr[0]['task-id']);
          this.model.currentTaskId = taskId;
          this.dataService.getTaskInfos(taskId).subscribe(
            task => {
              let route = '';
              if (autoRouting) {
                if ((<string>task['task-name']).startsWith('Modifier')) {
                  route = 'details';
                }
                this.router.navigate(['/' + route]);
              } else {
                this.messageService.sendMessage('taskLoaded', task);
              }
            }
          );

        } else {
          // retry after 500ms
          setTimeout(() => this.getBpmData(), 500);
        }
      }
    );
  }

}
