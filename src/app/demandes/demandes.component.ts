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
  loading = false;
  finalStep = false;
  canCancel = false;
  subTaskId: number;
  waitForFinish = false;

  constructor(private msgService: GlobalMessageService, private router: Router,
    public model: ModelService, private dataService: BpmDataService) { }

  ngOnInit() {
    if (!this.model.user.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }

    const taskProcessId: number = Number(this.model.currentTask['task-process-instance-id']);
    if (!isNaN(taskProcessId)) {
      if (taskProcessId !== this.model.currentProcessInstanceId) {
        this.loading = true;
        this.finalStep = true;
        this.dataService.getProcessVariables(taskProcessId).subscribe(
          vars => {
            this.model.subProcessVars = vars;
            this.loading = false;
          }
        );
      } else {
        this.canCancel = true;
      }
    } else {
      this.waitForFinish = true;
    }
  }

  bridge() {
    // this.router.navigate(['/bridge']);
    this.model.byPassExistingProcess = true;
    this.router.navigate(['/bridge']);
  }

  viewPDF() {
    const data = this.model.subProcessVars['contrat']['org.jbpm.document.service.impl.DocumentImpl'].content;
    const sampleArr = this.base64ToArrayBuffer(data);
    this.saveByteArray('Contrat', sampleArr);
  }

  signer() {
    this.dataService.completeTask(this.model.currentTaskId, {}).subscribe(
      result => {
        this.model.currentTaskId = -1;
        this.model.currentTask = {};
        setTimeout(() => this.getTaskInfos(), 200);
      });
  }


  getTaskInfos(nbTry: number = 0) {

    this.dataService.getTasks().subscribe(
      tasks => {
        const arr: Array<any> = <Array<any>>tasks['task-summary'];
        if (arr.length > 0) {
          const taskId = Number(arr[0]['task-id']);
          this.model.currentTaskId = taskId;
          this.dataService.getTaskInfos(taskId).subscribe(
            task => {
              this.model.currentTask = task;
              this.model.currentTaskId = taskId;
              this.router.navigate(['/demandes']);
            }
          );
        } else if (nbTry > 2) {
          this.msgService.sendMessage('GeneralError', 'No task found');
          this.router.navigate(['/demandes']);
        } else {
          setTimeout(this.getTaskInfos(nbTry + 1), 500);
        }
      }
    );
  }

  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  saveByteArray(reportName, byte) {
    const blob = new Blob([byte]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = reportName + '.pdf';
    link.download = fileName;
    link.click();
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
