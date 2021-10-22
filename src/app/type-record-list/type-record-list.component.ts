import { Component, Input, OnInit } from '@angular/core';
import { TypedPerson, TypeRecord } from '../service/ops-data.service';

@Component({
  selector: 'app-type-record-list',
  templateUrl: './type-record-list.component.html',
  styleUrls: ['./type-record-list.component.scss'],
})
export class TypeRecordListComponent implements OnInit {
  @Input()
  linkToAnalyzer = false;

  @Input()
  showMolecule = true;

  @Input()
  loading = false;

  @Input()
  typeRecords: TypedPerson[];

  @Input()
  notFoundMessage = 'Sorry, no type records found';

  @Input()
  loadingMessage = 'Type Records are loading...';

  @Input()
  displayPracticeLink = false;

  @Input()
  maxDisplay;

  constructor() {}

  ngOnInit(): void {}

  analyzerLinkMod(type: string) {
    return type.substring(0, 2);
  }
  analyzerLinkSav1(type: string) {
    return type.substring(3, 5);
  }
  analyzerLinkSav2(type: string) {
    return type.substring(6, 8);
  }
  analyzerLinkAnimals(type: string) {
    let animals = type.substring(9, 16);
    animals = animals.replace('(', '');
    animals = animals.replace(')', '');
    animals = animals.replace('/', '');
    return animals;
  }
  animal(type: string, i : number) {
    return this.analyzerLinkAnimals(type).substring(i, i+1);
  }

  practiceLink(name: string) {
    return '/practice?name=' + name;
  }

  convert(type: string) {
    if (type.length === 16) {
      return 'type-indicator type-' + (type.substring(3,5) + type.substring(6,8)).toLowerCase();
    } else {
      return '';
    }
  }

  missingImageLink(name: string) {
    return 'https://www.google.com/search?q=' + name + '&tbm=isch';
    //&hl=en&tbs=il:cl&rlz=1C1CHBF_enUS827US827&sa=X&ved=0CAAQ1vwEahcKEwioxM_gsNzzAhUAAAAAHQAAAAAQAg&biw=1903&bih=880#imgrc=DwdoIiO6d18ywM'
  }
}
