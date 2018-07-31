import { ModelService } from './../model.service';
import { environment } from './../../environments/environment';
import { BpmDataService } from './../bpm-data.service';
import { Component, OnInit } from '@angular/core';
import { Logement, Offre, Option } from 'src/app/Model';
import { GlobalMessageService } from 'src/app/global-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult-logement',
  templateUrl: './consult-logement.component.html',
  styleUrls: ['./consult-logement.component.css']
})
export class ConsultLogementComponent implements OnInit {
  logement: Logement;
  offre: Offre;
  newOffre: Offre;
  options: Option[];
  selectedOptionIndex: number;
  selectedOption: Option;
  dataLoadFinished = false;

  constructor(private msgService: GlobalMessageService, private router: Router,
    private dataService: BpmDataService, private model: ModelService) {
    this.msgService.getMessage().subscribe(message => {
      switch (message.type) {
        case 'newLogement':
          this.logement = message.data.logement;

          break;
        default:
          break;
      }
    });
  }

  ngOnInit() {
    if (!this.logement) {
      this.logement = {
        ville: 'CHANTEPIE',
        codePostal: '35135',
        codeINSEE: '',
        lieudit: '',
        type: 'Appartement',
        surface: 47,
        chauffage: 'Electricité Classique',
        annee: '1997_2001',
        classeEnergetique: 'C',
        numPDL: '1215421A',
        numPCE: '1125445A',
        gaz: false,
        energieEauChaude: 'Electricité',
        chauffagePiscine: '',
        nbOccupant: 1,
        statutOccupant: 'Locataire',
        presencePiscine: false,
        vehiculeElectrique: false,
        laveVaisselle: false,
        congelateur: false,
        plaqueInduction: true,
        secheLinge: false,
        climatisation: false,
        typeResidence: 'Principale',
        chauffageAlternatif: 'AUCUN'
      };
    }
    this.offre = {
      code: 'elec_bleu',
      libelle: 'Tarif Bleu',
      description: 'Faites le choix de la simplicité',
      description2: 'Le kWh est toujours au même tarif, quels que soient l’heure et le jour de la semaine'
    };
    this.newOffre = {
      code: 'elec_vert',
      libelle: 'Vert Électrique',
      description: 'Contribuez à la transition énergétique sans changer vos habitudes !',
      description2: 'Blabla'
    };
    this.options = [
      { libelle: 'Option1', montant: 600, typePrix: 'Fixe', dureePrixFixe: 12, delaisPrevenance: 15 },
      { libelle: 'Option2', montant: 699, typePrix: 'Evolutif', dureePrixFixe: 0, delaisPrevenance: 30 },
      { libelle: 'Option3', montant: 750, typePrix: 'Fixe', dureePrixFixe: 24, delaisPrevenance: 15 }
    ];

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

    console.log(taskInput);
    this.dataService.completeTask(this.model.currentTaskId, taskInput).subscribe(
      result => {
        this.router.navigate(['/panier']);
      });
    // this.msgService.sendMessage('modifOffre', { offre: this.offre, new_offre: this.newOffre, option: this.selectedOption });
  }

}
