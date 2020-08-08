import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Animal } from './animal';

@Component({
  selector: 'app-type-animal',
  templateUrl: './type-animal.component.html',
  styleUrls: ['./type-animal.component.css'],
})
export class TypeAnimalComponent implements OnInit, OnChanges {
  @Input() activeStack: string;
  activeAnimal: Animal;

  emojiFallback = (emoji: any, props: any) =>
    emoji ? `:${emoji.shortNames[0]}:` : props.emoji;

  emojiAppUrl: string =
    'https://script.google.com/macros/s/AKfycbxMeATOVdtlI86buz2tPnkNe3KN7J2XPaLxsgp6v_AYVpl5-uHW/exec?fbclid=IwAR2BOOJF81bAAdjMF_ZtY07p5amnChzGcbdT4HwUhS3078HHrd-iaV3_H7k';

  sleepFirst: Animal[] = [
    new Animal('SCBP', '-7', 'Owls', 'owl'),
    new Animal('SCPB', '-5', 'Hedgehogs', 'hedgehog'),
    new Animal('SBCP', '-2', 'Rhinos', 'rhinoceros'),
    new Animal('SBPC', '+1', 'Beaver/Mice', 'mouse'),//Was beaver, new in 2020
  ];

  consumeFirst: Animal[] = [
    new Animal('CSBP', '-6', 'Turtles', 'turtle'),
    new Animal('CSPB', '-4', 'Pandas', 'panda_face'),
    new Animal('CPSB', '-0', 'Hares', 'rabbit'),
    new Animal('CPBS', '+3', 'Zebras', 'zebra_face'),
  ];

  blastFirst: Animal[] = [
    new Animal('BSCP', '-3', 'Deer', 'deer'),
    new Animal('BSPC', '+0', 'Raccoons', 'raccoon'),
    new Animal('BPSC', '+4', 'Otters', 'otter'),
    new Animal('BPCS', '+6', 'Kangaroos', 'kangaroo'),
  ];

  playFirst: Animal[] = [
    new Animal('PCSB', '-1', 'Tigers', 'tiger'),
    new Animal('PCBS', '+2', 'Foxes', 'fox_face'),
    new Animal('PBSC', '+5', 'Seals/Dogs', 'dog'),//was seal, new in 2020
    new Animal('PBCS', '+7', 'Dolphins', 'dolphin'),
  ];

  animalGroups: { name: string; group: Animal[] }[] = [
    { name: 'Sleep First', group: this.sleepFirst },
    { name: 'Consume First', group: this.consumeFirst },
    { name: 'Blast First', group: this.blastFirst },
    { name: 'Play First', group: this.playFirst },
  ];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.animalGroups.forEach((g) => {
      g.group.forEach((a) => {
        if (a.stack === this.activeStack) {
          a.active = true;
          this.activeAnimal = a;
        } else {
          a.active = false;
        }
      });
    });
  }
}
