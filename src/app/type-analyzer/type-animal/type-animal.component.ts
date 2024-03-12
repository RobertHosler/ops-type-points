import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AnimalStack, AnimalStackModel } from './animal-stack';
import { OpsTypeService } from '../ops-type.service';
import { OpsType } from '../ops-type';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/service/dark-mode.service';

@Component({
  selector: 'app-type-animal',
  templateUrl: './type-animal.component.html',
  styleUrls: ['./type-animal.component.scss'],
})
export class TypeAnimalComponent implements OnInit, OnDestroy {
  @Input()
  opsTypes: OpsType[];
  private opsTypesSub: Subscription;

  activeAnimalStack: AnimalStack;

  emojiFallback = (emoji: any, props: any) =>
    emoji ? `:${emoji.shortNames[0]}:` : props.emoji;

  emojiAppUrl: string =
    'https://script.google.com/macros/s/AKfycbxMeATOVdtlI86buz2tPnkNe3KN7J2XPaLxsgp6v_AYVpl5-uHW/exec?fbclid=IwAR2BOOJF81bAAdjMF_ZtY07p5amnChzGcbdT4HwUhS3078HHrd-iaV3_H7k';

  extroversionBlogUrl: string =
    'https://subjectivepersonality.wordpress.com/2021/06/09/the-spectrum-of-extroversion/';

  animalStackGroups: { name: string; group: AnimalStack[] }[] = [
    { name: 'Sleep', group: AnimalStackModel.sleepFirst },
    { name: 'Consume', group: AnimalStackModel.consumeFirst },
    { name: 'Blast', group: AnimalStackModel.blastFirst },
    { name: 'Play', group: AnimalStackModel.playFirst },
  ];

  darkMode: DarkModeService;

  constructor(private opsTypeService: OpsTypeService, darkMode: DarkModeService) {
    this.darkMode = darkMode;
  }

  ngOnInit(): void {
    if (!this.opsTypes) {
      this.opsTypesSub = this.opsTypeService.opsTypesSubject.subscribe(
        (opsTypes: OpsType[]) => {
          this.opsTypes = opsTypes;
          this.updateAnimalStackGroups();
        }
      );
      this.opsTypes = this.opsTypeService.opsTypes;
      this.updateAnimalStackGroups();
    } else {
      this.updateAnimalStackGroups();
    }
  }

  ngOnDestroy() {
    if (this.opsTypesSub) {
      this.opsTypesSub.unsubscribe();
    }
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
