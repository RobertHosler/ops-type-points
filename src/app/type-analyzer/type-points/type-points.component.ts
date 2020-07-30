import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Function } from '../function.model';

@Component({
  selector: 'app-type-points',
  templateUrl: './type-points.component.html',
  styleUrls: ['./type-points.component.css'],
})
export class TypePointsComponent implements OnInit, OnChanges {

  @Input('functions') functions: Function[] = new Array<Function>();
  @Input('animals') animals: { animal: string; savior: string }[] = [];

  configureOptions: boolean = false;
  displayFullTable: boolean = false;
  displayPointTheory: boolean = false;

  modalityWeight: number = 1;
  modalityOptions: { label: string; factor: number }[] = [
    { label: 'M', factor: 10 },
    { label: 'F', factor: 5 }
  ];

  grantWeight: number = 1;
  grantOptions: { number: number; factor: number }[] = [
    { number: 1, factor: 20 },
    { number: 2, factor: 12 },
    { number: 3, factor: 8 },
    { number: 4, factor: 0 }
  ];

  activationWeight: number = 0;
  activationOptions: { number: number; factor: number }[] = [
    { number: 2, factor: 10 },
    { number: 1, factor: 5 }
  ];

  saviorWeight: number = 1;
  saviorOptions: { option: string; factor: number }[] = [
    { option: 'S1', factor: 20 },
    { option: 'S2', factor: 15 },
    { option: 'A', factor: 10 },
    { option: '-', factor: 5 }
  ];

  animalWeight: number = 1;
  // animalOptions: { number: number; factor: number }[] = [
  //   { number: 1, factor: 10 },
  //   { number: 2, factor: 7 },
  //   { number: 3, factor: 3 },
  //   { number: 4, factor: 0 }
  // ];
  animalOptions: { option: string; factor: number }[] = [
    { option: 'S1', factor: 15 },
    { option: 'S2', factor: 10 },
    { option: 'A', factor: 5 },
    { option: '-', factor: 0 }
  ];

  constructor() {
    this.newPointValues();
  }

  ngOnInit(): void {
    // this.assignPoints();
  }

  ngOnChanges(): void {
    this.assignPoints();
  }

  assignPoints() {
    var totalPoints = 0;
    this.functions.forEach((f) => {
      //Modality Points
      var modalityMax = 0;
      this.modalityOptions.forEach((m) => {
        if (f.modality === m.label) {
          f.modalityPoints = this.modalityWeight * m.factor;
        }
        if (modalityMax < m.factor) {
          modalityMax = m.factor;
        }
      });

      //Activation Points
      var activationMax = 0;
      this.activationOptions.forEach((a) => {
        if (f.activation === a.number) {
          f.activationPoints = this.activationWeight * a.factor;
        }
        if (activationMax < a.factor) {
          activationMax = a.factor;
        }
      });

      //Grant Order 
      var grantMax = 0;
      this.grantOptions.forEach((go) => {
        if (f.grant === go.number) {
          f.grantPoints = this.grantWeight * go.factor;
        }
        if (grantMax < go.factor) {
          grantMax = go.factor;
        }
      });

      //Savior Points
      var saviorMax = 0;
      this.saviorOptions.forEach((s) => {
        if (f.savior === s.option) {
          f.saviorPoints = this.saviorWeight * s.factor;
        }
        if (saviorMax < s.factor) {
          saviorMax = s.factor;
        }
      });

      var animalMax = 0;
      f.animalPoints = 0;
      this.animals.forEach((a) => {
        this.animalOptions.forEach((ao) => {
          if (ao.option === a.savior 
              && ( (a.animal === 'P' && (f.name === 'Te' || f.name === 'Fe' || f.name === 'Se' || f.name === 'Ne'))
              || (a.animal === 'B' && (f.name === 'Te' || f.name === 'Fe' || f.name === 'Si' || f.name === 'Ni'))
              || (a.animal === 'C' && (f.name === 'Ti' || f.name === 'Fi' || f.name === 'Se' || f.name === 'Ne'))
              || (a.animal === 'S' && (f.name === 'Ti' || f.name === 'Fi' || f.name === 'Si' || f.name === 'Ni')) )) {
              f.animalPoints += this.animalWeight * ao.factor;
          }
          if (animalMax < ao.factor) {
            animalMax = ao.factor;
          }
        });
      });

      f.totalPoints = f.modalityPoints + f.grantPoints + f.activationPoints + f.saviorPoints + f.animalPoints;
      totalPoints += f.totalPoints;
    });

    //Determine percentage of the total points distributed for each function
    this.functions.forEach((f) => {
      f.pointPercentage = (f.totalPoints / totalPoints * 100).toFixed(2);
    });
  }

  assignDefault() {
    this.defaultPointValues();
    this.assignPoints();
  }

  assignNew() {
    this.newPointValues();
    this.assignPoints();
  }

  defaultPointValues() {
    this.modalityWeight = 1;
    this.modalityOptions = [
      { label: 'M', factor: 10 },
      { label: 'F', factor: 5 }
    ];
  
    this.grantWeight = 2;
    this.grantOptions = [
      { number: 1, factor: 10 },
      { number: 2, factor: 7 },
      { number: 3, factor: 5 },
      { number: 4, factor: 2 }
    ];
  
    this.activationWeight = 3;
    this.activationOptions = [
      { number: 2, factor: 10 },
      { number: 1, factor: 4 }
    ];
  
    this.saviorWeight = 4;
    this.saviorOptions = [
      { option: 'S1', factor: 10 },
      { option: 'S2', factor: 7 },
      { option: 'A', factor: 5 },
      { option: '-', factor: 2 }
    ];
  
    this.animalWeight = 0;
    this.animalOptions = [
      { option: 'S1', factor: 15 },
      { option: 'S2', factor: 10 },
      { option: 'A', factor: 5 },
      { option: '-', factor: 0 }
    ];
  }

  newPointValues() {
    this.modalityWeight = 1;
    this.modalityOptions = [
      { label: 'M', factor: 10 },
      { label: 'F', factor: 5 }
    ];
  
    this.grantWeight = 1;
    this.grantOptions = [
      { number: 1, factor: 20 },
      { number: 2, factor: 12 },
      { number: 3, factor: 8 },
      { number: 4, factor: 0 }
    ];
  
    this.activationWeight = 0;
    this.activationOptions = [
      { number: 2, factor: 10 },
      { number: 1, factor: 5 }
    ];
  
    this.saviorWeight = 1;
    this.saviorOptions = [
      { option: 'S1', factor: 20 },
      { option: 'S2', factor: 15 },
      { option: 'A', factor: 10 },
      { option: '-', factor: 5 }
    ];
  
    this.animalWeight = .5;
    this.animalOptions = [
      { option: 'S1', factor: 15 },
      { option: 'S2', factor: 10 },
      { option: 'A', factor: 5 },
      { option: '-', factor: 0 }
    ];
  }


}
