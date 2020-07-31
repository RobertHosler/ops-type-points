import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TypeDescriptionService } from './type-description.service';
import { Function } from '../function.model';

@Component({
  selector: 'app-type-description',
  templateUrl: './type-description.component.html',
  styleUrls: ['./type-description.component.css']
})
export class TypeDescriptionComponent implements OnInit, OnChanges {

  @Input('functions') functions: Function[] = new Array<Function>();
  @Input('animals') animals: { animal: string; savior: string }[] = [];

  description: string[] = [];

  constructor(private service: TypeDescriptionService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    var s1 = this.functions[0].name;
    var s2;
    this.functions.forEach((f) => {
      if (f.savior === "S2") {
        s2 = f.name;
      }
    });
    this.description = [];
    this.description.push(this.service.getHumanNeed(s1));
    this.description.push(this.service.getDecider(s1, s2));
    this.description.push(this.service.getObserver(s1, s2));
  }

}
