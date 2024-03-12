import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Trifix } from './trifix.model';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-enneagram-trifix',
  templateUrl: './enneagram-trifix.component.html',
  styleUrls: ['./enneagram-trifix.component.scss']
})
export class EnneagramTrifixComponent implements OnInit, OnChanges {

  @Input()
  trifix: string;

  @Input()
  heartFix: string;
  @Input()
  headFix: string;
  @Input()
  gutFix: string;

  trifixArray: string[];

  darkMode: DarkModeService;

  constructor(darkMode: DarkModeService) {
    this.darkMode = darkMode;
  }

  ngOnInit(): void {
    this.initStacking();
  }

  ngOnChanges(): void {
    this.initStacking();
  }
  
  initStacking() {
    this.trifixArray = [];
    if (this.trifix) {
      this.trifixArray = this.trifix.split('');
    } else {
      if (this.heartFix) {
        this.trifixArray.push(this.heartFix);
      } else {
        this.trifixArray.push('2');
        this.trifixArray.push('3');
        this.trifixArray.push('4');
      }
      if (this.headFix) {
        this.trifixArray.push(this.headFix);
      } else {
        this.trifixArray.push('5');
        this.trifixArray.push('6');
        this.trifixArray.push('7');
      }
      if (this.gutFix) {
        this.trifixArray.push(this.gutFix);
      } else {
        this.trifixArray.push('8');
        this.trifixArray.push('9');
        this.trifixArray.push('1');
      }
    }
  }

  getDescription(number:string) {
    return Trifix.descriptions.get(number);
  }

  getCenter(name: string) {
    return Trifix.centers[name];
  }

  get trifixModel() {
    return Trifix;
  }

}
