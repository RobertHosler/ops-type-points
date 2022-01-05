import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-type-exemplars',
  templateUrl: './type-exemplars.component.html',
  styleUrls: ['./type-exemplars.component.scss'],
})
export class TypeExemplarsComponent implements OnInit {
  allNames: Map<string, TypedPerson>;
  allTypedPersons: TypedPerson[];

  tableStructure = new TableStructure();

  classOnly = true;
  maleOnly = true;
  showNames = false;

  types = [
    'siti',
    'tisi',
    'niti',
    'tini',
    'nifi',
    'fini',
    'sifi',
    'fisi',

    'neti',
    'tine',
    'seti',
    'tise',
    'sefi',
    'fise',
    'nefi',
    'fine',

    'sife',
    'fesi',
    'nife',
    'feni',
    'nite',
    'teni',
    'site',
    'tesi',

    'nefe',
    'fene',
    'sefe',
    'fese',
    'sete',
    'tese',
    'nete',
    'tene',
  ];

  constructor(private opsDataService: OpsDataService) {
    this.opsDataService.allNames.subscribe((result) => {
      this.allNames = result;
      this.allTypedPersons = [];
      this.allNames.forEach((person, name) => {
        if (!person.type) {
          return;
        } else if (
          person.type.length === 16 &&
          !person.tags.includes('Community Member') &&
          !person.tags.includes('Incomplete') &&
          !person.tags.includes('Speculation')
        ) {
          this.allTypedPersons.push(person);
        }
      });
      this.populateColumns();
    });
  }

  ngOnInit(): void {}

  resetColumns() {
    this.clearColumns();
    this.populateColumns();
  }

  clearColumns() {
    this.tableStructure = new TableStructure();
  }

  populateColumns() {
    for (let j = 0; j !== this.types.length; j++) {
      let type = this.types[j];
      this.findType(type);
    }
  }

  findType(type: string) {
    this.allTypedPersons = this.shuffleArray(this.allTypedPersons);
    for (let i = 0; i !== this.allTypedPersons.length; i++) {
      let person = this.allTypedPersons[i];
      if (
        (this.classOnly && !person.tags.includes('OPS Class Typing')) ||
        !person.pictureUrl
      ) {
        continue;
      }
      let s1 = type.substring(0, 2);
      let s2 = type.substring(2, 4);
      if (person.s1.toLowerCase() === s1 && person.s2.toLowerCase() === s2) {
        this.tableStructure[type] = person;
        if (
          (this.maleOnly && person.sex === 'Male' && !person.trans) ||
          (person.sex === 'Female' && person.trans)
        ) {
          break; // found type of preferred gender
        } else if (
          (!this.maleOnly && person.sex === 'Female' && !person.trans) ||
          (person.sex === 'Male' && person.trans)
        ) {
          break; // found type of preferred gender
        }
      }
    }
  }

  shuffleArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  formatType(type: string) {
    let arr = type.split('');
    return arr[0].toUpperCase() + arr[1] + '/' + arr[2].toUpperCase() + arr[3];
  }
}

class TableStructure {
  // Sleep
  fini: TypedPerson;
  fisi: TypedPerson;
  nifi: TypedPerson;
  niti: TypedPerson;
  sifi: TypedPerson;
  siti: TypedPerson;
  tini: TypedPerson;
  tisi: TypedPerson;
  // Consume
  fine: TypedPerson;
  fise: TypedPerson;
  tine: TypedPerson;
  tise: TypedPerson;
  nefi: TypedPerson;
  neti: TypedPerson;
  sefi: TypedPerson;
  seti: TypedPerson;
  // Blast
  nife: TypedPerson;
  nite: TypedPerson;
  sife: TypedPerson;
  site: TypedPerson;
  feni: TypedPerson;
  fesi: TypedPerson;
  teni: TypedPerson;
  tesi: TypedPerson;
  // Play
  fene: TypedPerson;
  fese: TypedPerson;
  nefe: TypedPerson;
  nete: TypedPerson;
  sefe: TypedPerson;
  sete: TypedPerson;
  tene: TypedPerson;
  tese: TypedPerson;
}
