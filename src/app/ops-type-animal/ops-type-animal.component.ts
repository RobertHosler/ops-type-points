import { Component, Input, OnInit } from '@angular/core';
import { AnimalStack, AnimalStackModel } from '../type-analyzer/type-animal/animal-stack';

@Component({
  selector: 'app-ops-type-animal',
  templateUrl: './ops-type-animal.component.html',
  styleUrls: ['./ops-type-animal.component.scss']
})
export class OpsTypeAnimalComponent implements OnInit {

  @Input()
  animalStack: string;

  asObj: AnimalStack;

  constructor() { }

  ngOnInit(): void {
    if (this.animalStack) {
      this.asObj = AnimalStackModel.findAnimal(this.animalStack);
    }
  }

}
