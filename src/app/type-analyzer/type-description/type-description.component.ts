import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TypeDescriptionService } from './type-description.service';
import { Subscription } from 'rxjs';
import { OpsType } from '../ops-type';
import { OpsTypeService } from '../ops-type.service';

@Component({
  selector: 'app-type-description',
  templateUrl: './type-description.component.html',
  styleUrls: ['./type-description.component.css']
})
export class TypeDescriptionComponent implements OnInit, OnDestroy {
  
  @Input('index') index: number = 0;

  opsType: OpsType;
  private opsTypesSub: Subscription;

  description: string[] = [];
  needDescription: string[] = [];
  observerDecider: string;
  animalDescription: string[] = [];
  modDescription: string[] = [];

  constructor(private service: TypeDescriptionService, private opsTypeService: OpsTypeService) {
    this.opsTypesSub = this.opsTypeService.opsTypesSubject.subscribe((opsTypes: OpsType[]) => {
      // console.log("Type Points Update, index=" + this.index);
      this.setup(opsTypes);
    });
  }

  ngOnInit(): void {
    this.setup(this.opsTypeService.opsTypes);
  }

  ngOnDestroy() {
    this.opsTypesSub.unsubscribe();
  }

  setup(opsTypes: OpsType[]) {
    this.description = [];
    this.needDescription = [];
    this.animalDescription = [];
    this.modDescription = [];
    if (opsTypes.length >= this.index + 1) {
      // console.log("Type Description Update, index=" + this.index);
      this.opsType = opsTypes[this.index];
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

    this.modDescription.push(this.service.getExDecider(this.opsType.deModality));
    this.modDescription.push(this.service.getSensoryMod(this.opsType.sensoryModality));
    this.modDescription.push(this.service.getLearningStyle(this.opsType.modalityString));

  }

}
