import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../type-analyzer/animal';
import { Function } from '../type-analyzer/function.model';
import { OpsType } from '../type-analyzer/ops-type';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-type-dashboard-animals',
  templateUrl: './type-dashboard-animals.component.html',
  styleUrls: ['./type-dashboard-animals.component.scss'],
})
export class TypeDashboardAnimalsComponent implements OnInit {
  @Input()
  opsType: OpsType;

  functions: Function[] = new Array<Function>();
  animals: Animal[] = [];
  headings = [
    { letter: 'A', title: 'Animals' },
    { letter: 'S', title: 'Saviors' },
    { letter: 'M', title: 'Modality' },
    { letter: 'L', title: 'Letters' },
    { letter: 'F', title: 'Functions' },
  ];
  
  darkMode: DarkModeService;

  constructor(darkMode: DarkModeService) {
      this.darkMode = darkMode;
  }

  ngOnInit(): void {
    if (this.opsType) {
      this.setupType(this.opsType);
    }
  }

  setupType(opsType: OpsType) {
    if (opsType) {
      // console.log("Type Dashboard Update - success, index=" + this.index, this.opsType);
      this.functions = this.opsType.functions;
      this.animals = this.opsType.animals;
    }
  }
}
