import { Component, Input, OnInit } from '@angular/core';
import { TypedPerson } from '../service/ops-data.service';
import { EnneaDescriptionModel } from './ennea-description.model';

@Component({
  selector: 'app-ennea-description',
  templateUrl: './ennea-description.component.html',
  styleUrls: ['./ennea-description.component.scss'],
})
export class EnneaDescriptionComponent implements OnInit {
  @Input()
  typedPerson: TypedPerson;

  model = EnneaDescriptionModel;

  descriptions: DescriptionSection[];

  coreDescription: DescriptionSection;
  domDescription: DescriptionSection;
  playDescription: DescriptionSection;
  blindDescription: DescriptionSection;

  constructor() {}

  ngOnInit(): void {
    if (this.typedPerson) {
      let instinctStack = this.typedPerson.instinct.split('/');
      let blind = null;
      if (instinctStack.includes('so') && instinctStack.includes('sp')) {
        blind = 'sx';
      } else if (instinctStack.includes('sx') && instinctStack.includes('sp')) {
        blind = 'so';
      } else if (instinctStack.includes('so') && instinctStack.includes('sx')) {
        blind = 'sp';
      }

      let typeDescriptions = this.model.types.get(this.typedPerson.coreEType);
      this.coreDescription = {
        heading: 'Type ' + this.typedPerson.coreETypeLong,
        description: typeDescriptions.core,
      };
      this.domDescription = {
        heading: 'Dominant ' + this.instinctLong(instinctStack[0]),
        description: typeDescriptions[instinctStack[0]],
      };
      this.playDescription = {
        heading: 'Playground ' + this.instinctLong(instinctStack[1]),
        description: typeDescriptions[instinctStack[1]],
      };
      this.blindDescription = {
        heading: 'Blindspot ' + this.instinctLong(blind),
        disclaimer:
          'Since this instinct is in their blindspot, this individual may display only a narrow range of these characteristics.',
        description: typeDescriptions[blind],
      };
      this.descriptions = [];
      this.descriptions.push(this.coreDescription);
      this.descriptions.push(this.domDescription);
      this.descriptions.push(this.playDescription);
      this.descriptions.push(this.blindDescription);
    }
  }

  private instinctLong(short: string) {
    if (short === 'so') {
      return 'Social';
    } else if (short === 'sx') {
      return 'Sexual';
    } else if (short === 'sp') {
      return 'Self-Preservation';
    } else {
      return '';
    }
  }
}

class DescriptionSection {
  heading: string;
  description: string[];
  disclaimer?: string;
}
