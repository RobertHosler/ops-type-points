import { Component, OnInit } from '@angular/core';
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
  tableStructure2 = new TableStructure2();

  classOnly = true;
  // communityOnly = true;
  maleOnly = true;
  showNames = false;

  tagArr = ['Class', 'All', 'Community'];
  tagIndex = 0;

  genderArr = ['M/F', 'M', 'F'];
  genderIndex = 0;

  modalityArr = ['Mod', 'MM', 'FF', 'MF', 'FM'];
  modIndex = 0;

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
          person.type.length === 16
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
    this.tableStructure2 = new TableStructure2();
  }

  populateColumns() {
    this.allTypedPersons = this.shuffleArray(this.allTypedPersons);
    for (let i = 0; i !== this.allTypedPersons.length; i++) {
      let person = this.allTypedPersons[i];
      if (
        (this.tag === 'Class' && !person.tags.includes('OPS Class Typing')) ||
        (this.tag === 'Community' && !person.tags.includes('Community Member')) ||
        (this.gender === 'F' && ((person.sex === 'Male' && !person.trans) || (person.sex === 'Female' && person.trans))) ||
        (this.gender === 'M' && ((person.sex === 'Female' && !person.trans) || (person.sex === 'Male' && person.trans))) ||
        !person.pictureUrl
      ) {
        continue;
      }
      if (this.modIndex !== 0 && person.mod !== this.mod) {
        continue;
      }
      let personSaviors;
      if (person.type && person.type.length === 16) {
        personSaviors = person.type.substring(3,5).toLowerCase() + person.type.substring(6,8).toLowerCase();
      } else {
        continue;
      }
      for (let j = 0; j !== this.types.length; j++) {
        let type = this.types[j];
        if (type === personSaviors) {
          this.tableStructure2[type].arr.push(person);
        }
      }
    }

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

  genderToggle() {
    this.genderIndex++;
    if (this.genderIndex + 1 > this.genderArr.length) {
      this.genderIndex = 0;
    }
    this.resetColumns();
  }

  get gender() {
    return this.genderArr[this.genderIndex];
  }

  modToggle() {
    this.modIndex++;
    if (this.modIndex + 1 > this.modalityArr.length) {
      this.modIndex = 0;
    }
    this.resetColumns();
  }

  get mod() {
    return this.modalityArr[this.modIndex];
  }

  tagToggle() {
    this.tagIndex++;
    if (this.tagIndex + 1 > this.tagArr.length) {
      this.tagIndex = 0;
    }
    this.resetColumns();
  }

  get tag() {
    return this.tagArr[this.tagIndex];
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


class TableStructure2 {
  // Sleep
  fini = new TypeSet();
  fisi = new TypeSet();
  nifi = new TypeSet();
  niti = new TypeSet();
  sifi = new TypeSet();
  siti = new TypeSet();
  tini = new TypeSet();
  tisi = new TypeSet();
  // Consume
  fine = new TypeSet();
  fise = new TypeSet();
  tine = new TypeSet();
  tise = new TypeSet();
  nefi = new TypeSet();
  neti = new TypeSet();
  sefi = new TypeSet();
  seti = new TypeSet();
  // Blast
  nife = new TypeSet();
  nite = new TypeSet();
  sife = new TypeSet();
  site = new TypeSet();
  feni = new TypeSet();
  fesi = new TypeSet();
  teni = new TypeSet();
  tesi = new TypeSet();
  // Play
  fene = new TypeSet();
  fese = new TypeSet();
  nefe = new TypeSet();
  nete = new TypeSet();
  sefe = new TypeSet();
  sete = new TypeSet();
  tene = new TypeSet();
  tese = new TypeSet();
}

class TypeSet {
  arr : TypedPerson[] = [];
  index = 0;

  get current() {
    return this.arr[this.index];
  }

  nextIndex() {
    this.index++;
    if (this.index + 1 > this.arr.length) {
      this.index = 0;
    }
    return this.index;
  }
}