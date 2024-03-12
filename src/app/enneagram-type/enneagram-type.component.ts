import { Component, Input, OnInit } from '@angular/core';
import { NineTypeSet, NineTypesService } from '../service/nine-types.service';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-enneagram-type',
  templateUrl: './enneagram-type.component.html',
  styleUrls: ['./enneagram-type.component.scss'],
})
export class EnneagramTypeComponent implements OnInit {
  @Input()
  type: string; // core type as number, ex: '1'

  number: string; // core type as string, ex: 'One'

  nineTypes: Map<string, NineTypeSet>;

  sources = ['Core Identification', 'Core Fear', 'Passions', 'Focus of Attention', 'Triggers', 'Self Talk'];
  display = [];
  
  darkMode: DarkModeService;

  constructor(nineTypesService: NineTypesService,
    darkMode: DarkModeService) {
    nineTypesService.nineTypes.subscribe((result) => {
      this.nineTypes = result;
      this.initDescription();
    });
    this.darkMode = darkMode;
  }

  ngOnInit(): void {
    if (this.type) {
      switch (this.type) {
        case '1':
          this.number = 'One';
          break;
        case '2':
          this.number = 'Two';
          break;
        case '3':
          this.number = 'Three';
          break;
        case '4':
          this.number = 'Four';
          break;
        case '5':
          this.number = 'Five';
          break;
        case '6':
          this.number = 'Six';
          break;
        case '7':
          this.number = 'Seven';
          break;
        case '8':
          this.number = 'Eight';
          break;
        case '9':
          this.number = 'Nine';
          break;
      }
    }
  }

  private initDescription() {
    this.display = [];
    this.sources.forEach(source => {
      const set = {
        name: source,
        text: this.nineTypes.get(source)[this.number.toLowerCase()]
      };
      this.display.push(set);
    })
  }
}
