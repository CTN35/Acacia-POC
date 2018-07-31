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

  constructor(private model: ModelService, private dataService: BpmDataService, private router: Router) { }

  ngOnInit() {
    this.startOrGetProcess();
  }

  startOrGetProcess() {
  if (this.model.selectedOffer == null) {
    this.router.navigate(['/']);
  }

    // Get ongoing process or start new process ==> A faire au niveau du model ?
    if (this.model.currentProcessInstanceId <= 0) {
      this.dataService.startNewProcess(environment.bpmProcessId,
        {
          numeroBpContrat: environment.tmpBpContrat,
          idOffreSelectionnee: this.model.selectedOffer
        }).subscribe(id => {
          this.model.currentProcessInstanceId = Number(id);
          this.getBpmData();
        });
    } else {
      this.getBpmData();
    }
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

  getTaskInfos() {

    this.dataService.getTasks(this.model.currentProcessInstanceId).subscribe(
      tasks => {
        const arr: Array<any> = <Array<any>>tasks['task-summary'];
        if (arr.length > 0) {
          const taskId = Number(arr[0]['task-id']);
          this.dataService.getTaskInfos(taskId).subscribe(
            task => {
              console.log(JSON.stringify(task));
              let route = '';

              if ((<string>task['task-name']).startsWith('Modifier')) {
                route = 'details';
              }

              this.router.navigate(['/' + route]);
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
