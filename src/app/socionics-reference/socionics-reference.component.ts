import { Component, Input, OnInit } from '@angular/core';
import { SocionicsModel } from './socionics.model';

@Component({
  selector: 'app-socionics-reference',
  templateUrl: './socionics-reference.component.html',
  styleUrls: ['./socionics-reference.component.scss'],
})
export class SocionicsReferenceComponent implements OnInit {
  @Input()
  type = 'LII';
  typeObj;

  constructor() {}

  ngOnInit(): void {
    this.typeObj = SocionicsModel.typeMap.get(this.type);
  }
}
