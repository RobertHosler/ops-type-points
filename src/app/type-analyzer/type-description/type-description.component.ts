import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TypeDescriptionService } from './type-description.service';
import { Function } from '../function.model';

@Component({
  selector: 'app-type-description',
  templateUrl: './type-description.component.html',
  styleUrls: ['./type-description.component.css']
})
export class TypeDescriptionComponent implements OnInit, OnChanges {

  @Input('mod') modality: string;
  @Input('s1') s1: string;
  @Input('s2') s2: string;
  @Input('animals') animals: string;

  description: string[] = [];
  needDescription: string[] = [];
  animalDescription: string[] = [];
  modDescription: string[] = [];

  constructor(private service: TypeDescriptionService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.description = [];
    this.needDescription = [];
    this.animalDescription = [];
    this.modDescription = [];
    this.needDescription.push(this.service.getHumanNeed(this.s1));
    this.needDescription.push(this.service.getDecider(this.s1, this.s2));
    this.needDescription.push(this.service.getObserver(this.s1, this.s2));

    this.animalDescription.push(this.service.getEnergyAnimal(this.animals));
    this.animalDescription.push(this.service.getInfoAnimal(this.animals));
    this.animalDescription.push(this.service.getAnimalDominance(this.animals));
    this.animalDescription.push(this.service.getSaviorAnimal(this.animals));

    var sensMod = this.modality.charAt(0);
    var exDeMod = this.modality.charAt(1);
    this.modDescription.push(this.service.getExDecider(exDeMod));
    this.modDescription.push(this.service.getSensoryMod(sensMod));
    this.modDescription.push(this.service.getLearningStyle(this.modality));

  }

}
