import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-enneagram-instinct',
  templateUrl: './enneagram-instinct.component.html',
  styleUrls: ['./enneagram-instinct.component.scss'],
})
export class EnneagramInstinctComponent implements OnInit {
  @Input()
  instinct: string;

  social = false;
  sexual = false;
  selfPres = false;

  constructor() {}

  ngOnInit(): void {
    if (!this.instinct) {
      // error
    } else if (this.instinct.startsWith('so')) {
      this.social = true;
    } else if (this.instinct.startsWith('sx')) {
      this.sexual = true;
    } else if (this.instinct.startsWith('sp')) {
      this.selfPres = true;
    }
  }
}
