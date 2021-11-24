import { Component, OnInit } from '@angular/core';
import { TrifixCombinations } from './trifix-combination.model';

@Component({
  selector: 'app-enneagram-trifix-combination',
  templateUrl: './enneagram-trifix-combination.component.html',
  styleUrls: ['./enneagram-trifix-combination.component.scss'],
})
export class EnneagramTrifixCombinationComponent implements OnInit {
  combinations = TrifixCombinations;

  constructor() {}

  ngOnInit(): void {}
}
