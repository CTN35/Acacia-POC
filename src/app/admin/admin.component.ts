import { Process, Offre } from './../Model';
import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/model.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  tabProcess: Process[];
  tabOffre: Offre[];
  tabOption: any[];
  tabLogement: any[];
  cols: string[];
  selectedProcess: Process;

  constructor(public model: ModelService) { }

  ngOnInit() {
    this.cols = ['Logement', 'Offre actuelle', 'Nouvelle Offre', 'Option', 'Actions'];

    this.tabLogement = [
      {
        ville: 'CHANTEPIE',
        codePostal: '35135',
        codeINSEE: '',
        lieudit: '',
        typeLogement: 'Appartement',
        surface: 47,
        nbOccupant: 1,
        typeOccupation: 'Locataire',
        typeResidence: 'Principale',
        energieChauffagePrincipal: 'Electricité Classique',
        equipementChauffagePrincipal: '',
        annee: 2001,
        classeEnergetique: 'C',
        presenceAlimentationGaz: false,
        energieEauChaudeSanitaire: 'Electricité',
        energieChauffageSecondaire: 'Aucun',
        presencePiscine: false,
        chauffagePiscine: '',
        vehiculeElectrique: false,
        laveVaisselle: false,
        congelateur: false,
        plaqueInduction: true,
        secheLinge: false,
        climatisation: false,
      },
      {
        ville: 'IFFENDIC',
        codePostal: '35750',
        codeINSEE: '',
        lieudit: '',
        typeLogement: 'Maison',
        surface: 200,
        nbOccupant: 4,
        typeOccupation: 'Propriétaire',
        typeResidence: 'Principale',
        energieChauffagePrincipal: 'Gaz',
        equipementChauffagePrincipal: 'Chaudière à gaz standard',
        annee: 2000,
        classeEnergetique: 'C',
        presenceAlimentationGaz: true,
        energieEauChaudeSanitaire: 'Gaz',
        energieChauffageSecondaire: 'Bois',
        presencePiscine: false,
        chauffagePiscine: '',
        vehiculeElectrique: false,
        laveVaisselle: false,
        congelateur: false,
        plaqueInduction: true,
        secheLinge: false,
        climatisation: false,
      }
    ];
    this.tabOffre = [
      {
        code: 'elec_bleu',
        libelle: 'Tarif Bleu',
        description: 'Faites le choix de la simplicité',
        description2: 'Le kWh est toujours au même tarif, quels que soient l’heure et le jour de la semaine'
      },
      {
        code: 'elec_vert',
        libelle: 'Vert Électrique',
        description: 'Contribuez à la transition énergétique sans changer vos habitudes !',
        description2: 'Blabla'
      }
    ];
    this.tabOption = [
      {
        nomOption: 'Option1',
        montantAnnuelEstime: 600,
        montantAnnuelOptimise: 540,
        ordrePreconisation: 2,
        optionSelectionnee: false,
        cadrans: [
          {consommationCadran: 1500, nomCadran: 'cadran1', prixAbonnement: 120, prixKwh: 5},
          {consommationCadran: 200, nomCadran: 'cadran2', prixAbonnement: 200, prixKwh: 20}
        ]
      },
      {
        nomOption: 'Option2',
        montantAnnuelEstime: 750,
        montantAnnuelOptimise: 690,
        ordrePreconisation: 1,
        optionSelectionnee: false,
        cadrans: [
          {consommationCadran: 1500, nomCadran: 'cadran1', prixAbonnement: 120, prixKwh: 5},
          {consommationCadran: 200, nomCadran: 'cadran2', prixAbonnement: 200, prixKwh: 20}
        ]
      },
    ];

    this.tabProcess = [
      {
        id: 1,
        selectedOffer: 'ELEC_BLEU',
        originalOffer: 'ELEC_PE_WE',
        selectedOption: this.tabOption[0],
        currentProcessInstanceId: 1,
        originalLogement: this.tabLogement[0],
        currentLogement: this.tabLogement[0],
        logementModified: false,
        numeroBpContrat: '452452412',
        numeroPdlContrat: '453420485',
        state: ''
      },
      {
        id: 2,
        selectedOffer: 'ELEC_PE_WE',
        originalOffer: 'ELEC_BLEU',
        selectedOption: this.tabOption[1],
        currentProcessInstanceId: 1,
        originalLogement: this.tabLogement[1],
        currentLogement: this.tabLogement[1],
        logementModified: false,
        numeroBpContrat: '452452412',
        numeroPdlContrat: '453420485',
        state: ''
      }
    ];
  }

}
