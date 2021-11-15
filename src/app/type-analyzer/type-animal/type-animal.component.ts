import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimalStack, AnimalStackModel } from './animal-stack';
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

  animalStackGroups: { name: string; group: AnimalStack[] }[] = [
    { name: 'Sleep', group: AnimalStackModel.sleepFirst },
    { name: 'Consume', group: AnimalStackModel.consumeFirst },
    { name: 'Blast', group: AnimalStackModel.blastFirst },
    { name: 'Play', group: AnimalStackModel.playFirst },
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