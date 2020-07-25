import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Function } from '../function.model';

@Component({
  selector: 'app-type-points',
  templateUrl: './type-points.component.html',
  styleUrls: ['./type-points.component.css'],
})
export class TypePointsComponent implements OnInit, OnChanges {
  @Input('functions') functions: Function[] = new Array<Function>();

  configureOptions: boolean = false;

  modalityWeight: number = 1;
  modalityOptions: { label: string; factor: number }[] = [
    { label: 'M', factor: 10 },
    { label: 'F', factor: 5 },
  ];

  grantWeight: number = 2;
  grantOptions: { number: number; factor: number }[] = [
    { number: 1, factor: 10 },
    { number: 2, factor: 7 },
    { number: 3, factor: 5 },
    { number: 4, factor: 2 },
  ];

  activationWeight: number = 3;
  activationOptions: { number: number; factor: number }[] = [
    { number: 2, factor: 10 },
    { number: 1, factor: 4 },
  ];

  saviorWeight: number = 4;
  saviorOptions: { option: string; factor: number }[] = [
    { option: 'S1', factor: 10 },
    { option: 'S2', factor: 7 },
    { option: 'A', factor: 5 },
    { option: '-', factor: 2 },
  ];

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.assignPoints();
  }

  assignPoints() {
    this.functions.forEach((f) => {
      //Modality Points
      this.modalityOptions.forEach((m) => {
        if (f.modality === m.label) {
          f.modalityPoints = this.modalityWeight * m.factor;
        }
      });

      //Activation Points
      this.activationOptions.forEach((a) => {
        if (f.activation === a.number) {
          f.activationPoints = this.activationWeight * a.factor;
        }
      });

      //Grant Order Points
      this.grantOptions.forEach((go) => {
        if (f.grant === go.number) {
          f.grantPoints = this.grantWeight * go.factor;
        }
      });

      //Savior Points
      this.saviorOptions.forEach((s) => {
        if (f.savior === s.option) {
          f.saviorPoints = this.saviorWeight * s.factor;
        }
      });

      f.totalPoints = f.modalityPoints + f.grantPoints + f.activationPoints + f.saviorPoints;
    });
  }
}
