import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-type-indicator',
  templateUrl: './type-indicator.component.html',
  styleUrls: ['./type-indicator.component.scss'],
})
export class TypeIndicatorComponent implements OnInit, OnChanges {
  @Input()
  type;// = 'MM-Te/Se-PC/S(B)';

  @Input()
  eType;// = 'sp/sx - 9w8 - 936';

  @Input()
  option = 4;
  @Input()
  showLetters = true;

  mod: string;
  s1: string;
  s2: string;
  a12: string;
  animals: string;

  i1: string;
  i2: string;
  coreE: string;
  wingE: string;

  display = false;
  displayEType = false;

  constructor() {}

  ngOnInit(): void {
    if (this.type && this.type.length === 16) {
      this.mod = this.type.substring(0, 2);
      this.s1 = this.type.substring(3, 5);
      this.s2 = this.type.substring(6, 8);
      this.a12 = this.type.substring(9, 11);
      this.animals = this.type.substring(10, 13);
      this.display = true;
    } else if (this.eType && this.eType.length > 8) {
      this.mod = this.eType.substring(0, 2);
      this.animals = this.eType.substring(3, 5);
      this.a12 = this.animals;
      this.s1 = this.eType.substring(6, 7);
      this.s2 = this.eType.substring(7, 9);
      this.display = true;
      this.displayEType = true;
      this.option = 1;
    }
  }

  convert(type: string) {
    if (type.length === 16) {
      return (
        'type-indicator type-' +
        (type.substring(3, 5) + type.substring(6, 8)).toLowerCase()
      );
    } else {
      return '';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.eType) {
      this.eType = changes.eType.currentValue;
    }
    if (changes.type) {
      this.type = changes.type.currentValue;
    }
    this.ngOnInit();
  }

}
