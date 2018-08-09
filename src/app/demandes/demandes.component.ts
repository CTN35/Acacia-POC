import { environment } from './../../environments/environment';
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
  subProcessId = -1;
  loading = false;
  finalStep = false;
  canCancel = false;
  subTaskId: number;
  waitForFinish = false;
  annuleNonEligible = false;

  constructor(private msgService: GlobalMessageService, private router: Router,
    public model: ModelService, private dataService: BpmDataService) { }

  ngOnInit() {
    if (!this.model.user.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }

    this.annuleNonEligible = environment.clientAnnuleNonEligible;

    // check subProcess
    this.dataService.getProcesses().subscribe(
      procs => {
        let subProcessId = -1;
        // if subprocess exists it is a contract signature
        procs['process-instance'].forEach(proc => {
          if (Number(proc['parent-instance-id']) === this.model.currentProcessInstanceId
            && proc['process-id'] === environment.bpmContratProcessId) {
            subProcessId = Number(proc['process-instance-id']);
          }
        });

        if (subProcessId > 0) {
          this.subProcessId = subProcessId;
          this.loading = true;
          this.finalStep = true;
          this.dataService.getProcessVariables(subProcessId).subscribe(
            vars => {
              this.model.subProcessVars = vars;
              this.loading = false;
            });
        } else {
          const taskProcessId: number = Number(this.model.currentTask['task-process-instance-id']);

          // else get current task
          if (!isNaN(taskProcessId)) {
            this.canCancel = true;
          } else {
            // If no task ==> true final step
            this.waitForFinish = true;
          }
        }
      }
    );

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
    if (this.subProcessId > 0) {
      // Get process task
      this.dataService.getTasksForProcess(this.subProcessId).subscribe(
        tasks => {
          const arr: Array<any> = tasks['task-summary'];
          if (arr.length > 0) {
            const taskId: number = Number(arr[0]['task-id']);
            this.dataService.completeTask(taskId, {}).subscribe(
              result => {
                this.model.currentTaskId = -1;
                this.model.currentTask = {};
                this.router.navigate(['/bridge']);
              });
          } else {
            this.msgService.sendMessage('GeneralError', 'Tache de signature non trouvée pour le Processus ' + this.subProcessId);
          }
        }
      );

    }
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
