import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { AnimalStack } from './animal-stack';
import { OpsTypeService } from '../ops-type.service';
import { OpsType } from '../ops-type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-type-animal',
  templateUrl: './type-animal.component.html',
  styleUrls: ['./type-animal.component.css'],
})
export class TypeAnimalComponent implements OnInit, OnDestroy {

  opsTypes: OpsType[];
  private opsTypesSub: Subscription;

  activeAnimalStack: AnimalStack;

  emojiFallback = (emoji: any, props: any) =>
    emoji ? `:${emoji.shortNames[0]}:` : props.emoji;

  emojiAppUrl: string =
    'https://script.google.com/macros/s/AKfycbxMeATOVdtlI86buz2tPnkNe3KN7J2XPaLxsgp6v_AYVpl5-uHW/exec?fbclid=IwAR2BOOJF81bAAdjMF_ZtY07p5amnChzGcbdT4HwUhS3078HHrd-iaV3_H7k';

  sleepFirst: AnimalStack[] = [
    new AnimalStack('SCBP', '-7', 'Owls', 'owl'),
    new AnimalStack('SCPB', '-5', 'Hedgehogs', 'hedgehog'),
    new AnimalStack('SBCP', '-2', 'Rhinos', 'rhinoceros'),
    new AnimalStack('SBPC', '+1', 'Beavers/Mice', 'mouse'), //Was beaver, new in 2020
  ];

  consumeFirst: AnimalStack[] = [
    new AnimalStack('CSBP', '-6', 'Turtles', 'turtle'),
    new AnimalStack('CSPB', '-4', 'Pandas', 'panda_face'),
    new AnimalStack('CPSB', '-0', 'Hares', 'rabbit'),
    new AnimalStack('CPBS', '+3', 'Zebras', 'zebra_face'),
  ];

  blastFirst: AnimalStack[] = [
    new AnimalStack('BSCP', '-3', 'Deer', 'deer'),
    new AnimalStack('BSPC', '+0', 'Raccoons', 'raccoon'),
    new AnimalStack('BPSC', '+4', 'Otters', 'otter'),
    new AnimalStack('BPCS', '+6', 'Kangaroos', 'kangaroo'),
  ];

  playFirst: AnimalStack[] = [
    new AnimalStack('PCSB', '-1', 'Tigers', 'tiger'),
    new AnimalStack('PCBS', '+2', 'Foxes', 'fox_face'),
    new AnimalStack('PBSC', '+5', 'Seals/Dogs', 'dog'), //was seal, new in 2020
    new AnimalStack('PBCS', '+7', 'Dolphins', 'dolphin'),
  ];

  animalStackGroups: { name: string; group: AnimalStack[] }[] = [
    { name: 'Sleep', group: this.sleepFirst },
    { name: 'Consume', group: this.consumeFirst },
    { name: 'Blast', group: this.blastFirst },
    { name: 'Play', group: this.playFirst },
  ];

  constructor(private opsTypeService: OpsTypeService) {
    this.opsTypesSub = this.opsTypeService.opsTypesSubject.subscribe((opsTypes: OpsType[]) => {
      this.opsTypes = opsTypes;
      this.updateAnimalStackGroups();
    });
  }

  ngOnInit(): void {
    this.opsTypes = this.opsTypeService.opsTypes;
    this.updateAnimalStackGroups();
  }

  ngOnDestroy() {
    this.opsTypesSub.unsubscribe();
  }

  updateAnimalStackGroups() {
    this.animalStackGroups.forEach((g) => {
      g.group.forEach((a) => {
        a.active = false;
      });
    });
    this.opsTypes.forEach((type) => {
      var activeStack = type.animalString;
      // console.log('Animals - Active Stack: ' + activeStack);
      this.animalStackGroups.forEach((g) => {
        g.group.forEach((a) => {
          if (a.stack === activeStack) {
            a.active = true;
            type.animalEmojiStack = a;
          }
        });
      });
    });
  }

}