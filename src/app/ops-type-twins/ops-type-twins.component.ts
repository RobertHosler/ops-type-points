import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';
import { OpsType } from '../type-analyzer/ops-type';

@Component({
  selector: 'app-ops-type-twins',
  templateUrl: './ops-type-twins.component.html',
  styleUrls: ['./ops-type-twins.component.scss'],
})
export class OpsTypeTwinsComponent implements OnInit, OnChanges {
  @Input()
  opsType: OpsType;

  typeTwinsLoading = true;
  twinType = 'modality';
  twinMod = true;
  twinNeed = false;
  twinDom = false;
  twinPersons: TypedPerson[];

  allNames: Map<string, TypedPerson>;

  constructor(private opsDataService: OpsDataService) {
    this.opsDataService.allNames.subscribe((result) => {
      this.allNames = result;
      this.fetchTwins();
    });
  }

  ngOnInit(): void {
    this.fetchTwins();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.opsType) {
      this.opsType = changes.opsType.currentValue;
      this.fetchTwins();
    }
  }

  private fetchTwins() {
    this.twinPersons = [];
    if (this.allNames) {
      this.allNames.forEach((person: TypedPerson) => {
        if (!person.type) {
          return; // doesn't have ops type
        }
        if (person.type === this.opsType.opsCode) {
          // exact match
          this.twinPersons.push(person);
          return;
        }

        if (!((person.s1 === this.opsType.s1String &&
          person.s2 === this.opsType.s2String) ||
          (this.twinNeed && // allow swapped needs
            person.s2 === this.opsType.s1String &&
            person.s1 === this.opsType.s2String))) {
          return; // needs don't match
        }

        if (!(this.twinMod ||
          person.mod === this.opsType.modalityString)) {
          return; // modalities don't match or aren't excluded
        }

        if (!(person.type.substring(9) === this.opsType.animalStringFormal ||
          (this.twinDom && person.animals.substring(0, 2) === this.opsType.animalString.substring(0, 2)))) {
          return; // animals don't match
        }
        this.twinPersons.push(person);
      });
      this.typeTwinsLoading = false;
    } else {
      setTimeout(() => {
        this.fetchTwins();
      }, 0);
    }
  }

  twin(type: string) {
    switch (type) {
      case 'core-need':
        this.twinNeed = !this.twinNeed;
        break;
      case 'modality':
        this.twinMod = !this.twinMod;
        break;
      case 'info-energy':
        this.twinDom = !this.twinDom;
        break;
    }
    this.fetchTwins();
  }
}
