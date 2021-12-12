import { Component, Input, OnInit } from '@angular/core';
import { TrifixCombinations } from '../enneagram-trifix-combination/trifix-combination.model';
import { TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-ennea-triads',
  templateUrl: './ennea-triads.component.html',
  styleUrls: ['./ennea-triads.component.scss']
})
export class EnneaTriadsComponent implements OnInit {

  @Input()
  typedPerson: TypedPerson;

  trifixModel = TrifixCombinations;

  rows: TriadRow[];

  constructor() { }

  ngOnInit(): void {
    this.rows = [];
    if (this.typedPerson && this.typedPerson.eType) {
      if (this.typedPerson.coreEType) {
        let row = this.buildRow(this.typedPerson.coreEType);
        row.name = 'Core';
        this.rows.push(row);
      }
      if (this.typedPerson.wing) {
        let row = this.buildRow(this.typedPerson.wing);
        row.name = 'Wing';
        this.rows.push(row);
      }
      if (this.typedPerson.trifix) {
        let trifixArr = this.typedPerson.trifix.split('');
        let i = 1;
        trifixArr.forEach(fix => {
          if (i === 1) {
            i++;
            return;
          }
          let row = this.buildRow(fix);
          if (i === 2) {
            row.name = '2nd Fix';
          } else if (i === 3) {
            row.name = '3rd Fix';
          }
          this.rows.push(row);
          i++;
        });
      }
    }
  }

  private buildRow(numberString: string) {
    let row = new TriadRow();
    row.number = numberString;
    let number = parseInt(numberString);
    row.center = this.trifixModel.getCenter(number);
    row.harmonics = this.trifixModel.getHarmonics(number);
    row.hornevian = this.trifixModel.getHornevian(number);
    row.objectRelations = this.trifixModel.coreNumber(number);
    return row;
  }

}

class TriadRow {
  name: string; // core/wing/etc
  number: string;
  center: string; // gut/heart/head
  hornevian: string; // withdrawn/assertive/compliant
  harmonics: string; // positive/competency/reactive
  objectRelations: string; // attachment/frustration/rejection
}