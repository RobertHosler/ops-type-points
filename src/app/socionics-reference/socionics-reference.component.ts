import { Component, Input, OnInit } from '@angular/core';
import { SocionicsModel } from './socionics.model';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-socionics-reference',
  templateUrl: './socionics-reference.component.html',
  styleUrls: ['./socionics-reference.component.scss'],
})
export class SocionicsReferenceComponent implements OnInit {
  @Input()
  type = 'LII';
  typeObj;

  darkMode: DarkModeService;

  constructor(darkMode: DarkModeService) {
    this.darkMode = darkMode;
  }

  ngOnInit(): void {
    this.typeObj = SocionicsModel.typeMap.get(this.type);
  }
}
