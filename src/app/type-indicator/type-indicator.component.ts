import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-indicator',
  templateUrl: './type-indicator.component.html',
  styleUrls: ['./type-indicator.component.scss']
})
export class TypeIndicatorComponent implements OnInit {

  @Input()
  type = 'MM-Te/Se-PC/S(B)';
  @Input()
  option = 4;
  @Input()
  showLetters = true;

  mod:string;
  s1:string;
  s2:string;
  a12:string;
  animals:string;

  display = false;

  constructor() { }

  ngOnInit(): void {
    if (this.type.length === 16) {
      this.mod = this.type.substring(0, 2);
      this.s1 = this.type.substring(3,5);
      this.s2 = this.type.substring(6,8);
      this.a12 = this.type.substring(9,11);
      this.animals = this.type.substring(10,13);
      this.display = true;
    }
  }

  convert(type: string) {
    if (type.length === 16) {
      return 'type-indicator type-' + (type.substring(3,5) + type.substring(6,8)).toLowerCase();
    } else {
      return '';
    }
  }

}
