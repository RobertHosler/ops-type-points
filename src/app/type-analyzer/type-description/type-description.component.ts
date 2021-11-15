import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TypeDescriptionService } from './type-description.service';
import { OpsType } from '../ops-type';

@Component({
  selector: 'app-type-description',
  templateUrl: './type-description.component.html',
  styleUrls: ['./type-description.component.css'],
})
export class TypeDescriptionComponent implements OnInit, OnChanges {

  @Input()
  opsType: OpsType;

  description: string[] = [];
  needDescription: string[] = [];
  observerDecider: string;
  animalDescription: string[] = [];
  modDescription: string[] = [];

  constructor(private service: TypeDescriptionService) {}

  ngOnInit(): void {
    this.setup();
  }
  
  ngOnChanges(): void {
    this.setup();
  }

  setup() {
    this.description = [];
    this.needDescription = [];
    this.animalDescription = [];
    this.modDescription = [];
    if (this.opsType) {
      this.buildDescription();
    }
  }

  buildDescription() {
    var s1 = this.opsType.s1String;
    var s2 = this.opsType.s2String;
    this.observerDecider = this.service.getHumanNeed(s1);
    this.needDescription.push(this.service.getDecider(s1, s2));
    this.needDescription.push(this.service.getObserver(s1, s2));

    var animals = this.opsType.animalString;
    this.animalDescription.push(this.service.getEnergyAnimal(animals));
    this.animalDescription.push(this.service.getInfoAnimal(animals));
    this.animalDescription.push(this.service.getAnimalDominance(animals));
    this.animalDescription.push(this.service.getSaviorAnimal(animals));

    this.modDescription.push(
      this.service.getExDecider(this.opsType.deModality)
    );
    this.modDescription.push(
      this.service.getSensoryMod(this.opsType.sensoryModality)
    );
    this.modDescription.push(
      this.service.getLearningStyle(this.opsType.modalityString)
    );
  }
}
