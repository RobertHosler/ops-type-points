import { Component, Input, OnInit } from '@angular/core';
import { InstinctModel } from '../search/search.model';
import { Instinct } from './instinct.model';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-enneagram-instinct',
  templateUrl: './enneagram-instinct.component.html',
  styleUrls: ['./enneagram-instinct.component.scss'],
})
export class EnneagramInstinctComponent implements OnInit {
  
  @Input()
  instinct: string;

  stack = [];

  darkMode: DarkModeService;

  constructor(darkMode: DarkModeService) {
    this.darkMode = darkMode;
  }

  ngOnInit(): void {
    if (this.instinct) {
      this.stack.push(this.getInstinct(this.instinct.substring(0,2)));
      this.stack.push(this.getInstinct(this.instinct.substring(3,5)));
      if (this.instinct.includes('so') && this.instinct.includes('sx')) {
        this.stack.push(this.getInstinct('sp'));
      } else if (this.instinct.includes('sp') && this.instinct.includes('sx')) {
        this.stack.push(this.getInstinct('so'));
      } else if (this.instinct.includes('so') && this.instinct.includes('sp')) {
        this.stack.push(this.getInstinct('sx'));
      }
    }
  }

  getInstinct(s: string) {
    return Instinct.descriptions.get(s);
  }
}
