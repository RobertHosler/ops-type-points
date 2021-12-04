import { Component, Input, OnInit } from '@angular/core';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-ennea-type-twins',
  templateUrl: './ennea-type-twins.component.html',
  styleUrls: ['./ennea-type-twins.component.scss'],
})
export class EnneaTypeTwinsComponent implements OnInit {
  @Input()
  typedPerson: TypedPerson;

  @Input()
  instinct: string;
  @Input()
  coreType: string;
  @Input()
  wing: string;
  @Input()
  trifix: string;

  typeTwinsLoading = true;
  activeMods = ['fix'];
  options = [
    {
      text: 'Allow Wing Swap',
      mod: 'swap',
    },
    {
      text: 'Ignore Instinct',
      mod: 'instinct',
    },
    {
      text: 'Ignore Wing',
      mod: 'wing',
    },
    {
      text: 'Ignore Trifix',
      mod: 'fix',
    },
  ];

  typeCore;

  twinPersons: TypedPerson[];
  coreTwins: TypedPerson[]; // anyone with at least
  allNames: Map<string, TypedPerson>;

  constructor(private opsDataService: OpsDataService) {
    this.opsDataService.allNames.subscribe((result) => {
      this.allNames = result;
      this.fetchTwins();
    });
  }

  ngOnInit(): void {
    if (this.typedPerson) {
      this.instinct = this.typedPerson.instinct;
      this.coreType = this.typedPerson.coreEType;
      this.wing = this.typedPerson.wing;
      this.trifix = this.typedPerson.trifix;
    }
  }

  private fetchTwins() {
    this.twinPersons = [];
    this.allNames.forEach((person: TypedPerson) => {
      if (!person.eType) {
        return;
      }
      if (this.activeMods.includes('swap')) {
        // Show persons with core type same as wing
        if (
          this.coreType &&
          this.wing &&
          !(
            (this.coreType === person.coreEType && this.wing === person.wing) ||
            (this.wing === person.coreEType && this.coreType === person.wing)
          )
        ) {
          return;
        }
      } else {
        if (this.coreType && this.coreType !== person.coreEType) {
          return;
        }
        if (
          !this.activeMods.includes('wing') &&
          this.wing &&
          this.wing !== person.wing
        ) {
          return;
        }
      }
      if (
        !this.activeMods.includes('fix') &&
        this.trifix &&
        this.trifix !== person.trifix
      ) {
        return;
      }
      if (
        !this.activeMods.includes('instinct') &&
        this.instinct &&
        this.instinct !== person.instinct
      ) {
        return;
      }
      this.twinPersons.push(person);
    });
    this.typeTwinsLoading = false;
  }

  twin(mod: string) {
    let index = this.activeMods.indexOf(mod);
    if (index > -1) {
      this.activeMods.splice(index, 1);
    } else {
      if (mod === 'swap') {
        this.activeMods = [mod, 'fix']; // clear all others on swap
      } else {
        this.activeMods.push(mod);
      }
    }
    this.fetchTwins();
  }
}
