import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { TrifixCombinations } from '../enneagram-trifix-combination/trifix-combination.model';
import { EnneaCalculator } from './ennea-calculator.model';

@Component({
  selector: 'app-ennea-type-calculator',
  templateUrl: './ennea-type-calculator.component.html',
  styleUrls: ['./ennea-type-calculator.component.scss']
})
export class EnneaTypeCalculatorComponent implements OnInit {

  @Input()
  instinct: string; // ex: so/sx
  @Input()
  coreType: string; // ex: 1w9
  @Input()
  trifix: string; // ex: '136' or '1w9 3w4 6w7'

  core: number;
  wing: number;

  fix2: number;
  fix2wing: number;

  fix3: number;
  fix3wing: number;

  dominantInstinct: string;
  playInstinct: string;
  blindInstinct: string;

  calculatedType: string;

  allNumbers: TypeNumbers;
  coreNumbers: TypeNumbers;
  fix2Numbers: TypeNumbers;
  fix3Numbers: TypeNumbers;

  numberColumns = [];

  TrifixCombinationsModel = TrifixCombinations;

  constructor() { }

  ngOnInit(): void {
    if (this.instinct) {
      let iArr = this.instinct.split('/');
      this.dominantInstinct = iArr[0];
      this.playInstinct = iArr[1];
    }
    if (this.coreType) {
      let cArr = this.coreType.split('w');
      this.core = parseInt(cArr[0]);
      this.wing = parseInt(cArr[1]);
    }
    if (this.trifix && this.trifix.length === 3) {
      // ex: '136'
      let arr = this.trifix.split('');
      this.fix2 = parseInt(arr[1]);
      this.fix3 = parseInt(arr[2]);
    } else if (this.trifix && this.trifix.length === 11) {
      // ex: '1w9 3w4 6w7'
      let arr = this.trifix.split(' ');
      let fix2arr = arr[1].split('w');
      this.fix2 = parseInt(fix2arr[0]);
      this.fix2wing = parseInt(fix2arr[1]);
      let fix3arr = arr[2].split('w');
      this.fix3 = parseInt(fix3arr[0]);
      this.fix3wing = parseInt(fix3arr[1]);
    }
    if (this.core) {
      this.calculate();
    }
  }

  calculate() {
    this.calculatedType = this.dominantInstinct + '/' + this.playInstinct
      + ' ' + this.core + 'w' + this.wing
      + ' ' + this.fix2 + 'w' + this.fix2wing
      + ' ' + this.fix3 + 'w' + this.fix3wing;
    this.resetNumbers();
    if (this.core) {
      this.numberColumns.push(this.coreNumbers);
      this.addWeights(this.core, EnneaCalculator.coreWeight, this.coreNumbers);
    }
    if (this.wing) {
      this.addWeights(this.wing, EnneaCalculator.wingWeight, this.coreNumbers);
    }
    if (this.fix2) {
      this.numberColumns.push(this.fix2Numbers);
      this.addWeights(this.fix2, EnneaCalculator.fix2Weight, this.fix2Numbers);
    }
    if (this.fix2wing) {
      this.addWeights(this.fix2wing, EnneaCalculator.fix2WingWeight, this.fix2Numbers);
    }
    if (this.fix3) {
      this.numberColumns.push(this.fix3Numbers);
      this.addWeights(this.fix3, EnneaCalculator.fix3Weight, this.fix3Numbers);
    }
    if (this.fix3wing) {
      this.addWeights(this.fix3wing, EnneaCalculator.fix3WingWeight, this.fix3Numbers);
    }
    this.numberColumns.push(this.allNumbers);
  }

  private resetNumbers() {
    this.numberColumns = [];
    this.allNumbers = new TypeNumbers();
    this.coreNumbers = new TypeNumbers();
    this.fix2Numbers = new TypeNumbers();
    this.fix3Numbers = new TypeNumbers();
  }

  private addWeights(number: number, weight: number, numbers: TypeNumbers) {
    // Center
    if (TrifixCombinations.isGut(number)) {
      this.allNumbers.gut += weight;
      numbers.gut += weight;
    } else if (TrifixCombinations.isHead(number)) {
      this.allNumbers.head += weight;
      numbers.head += weight;
    } else if (TrifixCombinations.isHeart(number)) {
      this.allNumbers.heart += weight;
      numbers.heart += weight;
    }
    // Hornevian
    if (TrifixCombinations.isAssertive(number)) {
      this.allNumbers.assertive += weight;
      numbers.assertive += weight;
    } else if (TrifixCombinations.isWithdrawn(number)) {
      this.allNumbers.withdrawn += weight;
      numbers.withdrawn += weight;
    } else if (TrifixCombinations.isCompliant(number)) {
      this.allNumbers.compliant += weight;
      numbers.compliant += weight;
    }
    // Harmonics
    if (TrifixCombinations.isReactive(number)) {
      this.allNumbers.reactive += weight;
      numbers.reactive += weight;
    } else if (TrifixCombinations.isPositive(number)) {
      this.allNumbers.positive += weight;
      numbers.positive += weight;
    } else if (TrifixCombinations.isCompetency(number)) {
      this.allNumbers.competency += weight;
      numbers.competency += weight;
    }
    // Object Relations
    if (TrifixCombinations.isAttachment(number)) {
      this.allNumbers.attachment += weight;
      numbers.attachment += weight;
    } else if (TrifixCombinations.isRejection(number)) {
      this.allNumbers.rejection += weight;
      numbers.rejection += weight;
    } else if (TrifixCombinations.isFrustration(number)) {
      this.allNumbers.frustration += weight;
      numbers.frustration += weight;
    }
  }

}

class TypeNumbers {
  head: number = 0;
  heart: number = 0;
  gut: number = 0;

  assertive: number = 0;
  compliant: number = 0;
  withdrawn: number = 0;

  reactive: number = 0;
  positive: number = 0;
  competency: number = 0;

  attachment: number = 0;
  rejection: number = 0;
  frustration: number = 0;
}