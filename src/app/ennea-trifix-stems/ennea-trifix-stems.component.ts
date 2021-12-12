import { Component, Input, OnInit } from '@angular/core';
import { Trifix } from '../enneagram-trifix/trifix.model';

@Component({
  selector: 'app-ennea-trifix-stems',
  templateUrl: './ennea-trifix-stems.component.html',
  styleUrls: ['./ennea-trifix-stems.component.scss'],
})
export class EnneaTrifixStemsComponent implements OnInit {
  @Input()
  trifix: string;

  trifixModel = Trifix;

  stems = [];

  constructor() {}

  ngOnInit(): void {
    if (this.trifix && this.trifix.length === 3) {
      let fixArr = this.trifix.split('');
      let s1 =
        fixArr[0] < fixArr[1] ? fixArr[0] + fixArr[1] : fixArr[1] + fixArr[0];
      let s2 =
        fixArr[0] < fixArr[2] ? fixArr[0] + fixArr[2] : fixArr[2] + fixArr[0];
      let s3 =
        fixArr[1] < fixArr[2] ? fixArr[1] + fixArr[2] : fixArr[2] + fixArr[1];
      this.stems.push({
        val: s1,
        description: this.trifixModel.stems.get(s1),
      });
      this.stems.push({
        val: s2,
        description: this.trifixModel.stems.get(s2),
      });
      this.stems.push({
        val: s3,
        description: this.trifixModel.stems.get(s3),
      });
    } else {
      this.stems = [];
      this.trifixModel.stems.forEach((val, key) => {
        this.stems.push(key + ' - ' + val);
      });
    }
  }
}
