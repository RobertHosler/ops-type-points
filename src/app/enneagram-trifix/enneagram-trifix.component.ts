import { Component, Input, OnInit } from '@angular/core';
import { Trifix } from './trifix.model';

@Component({
  selector: 'app-enneagram-trifix',
  templateUrl: './enneagram-trifix.component.html',
  styleUrls: ['./enneagram-trifix.component.scss']
})
export class EnneagramTrifixComponent implements OnInit {

  @Input()
  trifix: string;

  trifixArray: string[]

  constructor() { }

  ngOnInit(): void {
    this.trifixArray = this.trifix.split('');
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
