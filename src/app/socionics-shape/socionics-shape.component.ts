import { Component, Input, OnInit } from '@angular/core';
import { SocionicsModel } from '../socionics-reference/socionics.model';

@Component({
  selector: 'app-socionics-shape',
  templateUrl: './socionics-shape.component.html',
  styleUrls: ['./socionics-shape.component.scss']
})
export class SocionicsShapeComponent implements OnInit {

  @Input()
  functions; // Ex ['Ti', 'Ne'];

  @Input()
  type; // Ex 'LII'

  @Input()
  showName = false;

  constructor() { }

  ngOnInit(): void {
    if (this.type) {
      const typeObj = SocionicsModel.typeMap.get(this.type);
      this.functions = [];
      this.functions.push(typeObj.stack[0].function.name);
      this.functions.push(typeObj.stack[1].function.name);
    }
  }

}
