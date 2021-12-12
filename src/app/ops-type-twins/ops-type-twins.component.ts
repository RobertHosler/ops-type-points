import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';
import { OpsType } from '../type-analyzer/ops-type';

@Component({
  selector: 'app-ops-type-twins',
  templateUrl: './ops-type-twins.component.html',
  styleUrls: ['./ops-type-twins.component.scss'],
})
export class OpsTypeTwinsComponent implements OnInit {
  @Input()
  opsType: OpsType;

  typeTwinsLoading = true;
  twinType = 'modality';
  twinMod = true;
  twinNeed = false;
  twinDom = false;
  twinPersons: TypedPerson[];
  allTypes: Map<string, TypedPerson[]>;

  constructor(private opsDataService: OpsDataService) {
    this.opsDataService.allTypes.subscribe((result) => {
      this.allTypes = result;
    });
  }

  ngOnInit(): void {
    this.fetchTwins(this.opsType);
  }

  private fetchTwins(type: OpsType) {
    this.twinPersons = [];
    if (this.allTypes && type) {
      this.fetchExactTwins(type);
      if (this.twinMod) {
        this.fetchModTwins(type);
      }
      if (this.twinNeed) {
        this.fetchNeedTwins(type);
      }
      if (this.twinDom) {
        this.fetchDomTwins(type);
      }
      this.typeTwinsLoading = false;
    } else {
      setTimeout(() => {
        this.fetchTwins(type);
      }, 0);
    }
  }

  private fetchExactTwins(type: OpsType) {
    this.concatTwins(type.opsCode);
  }

  private fetchModTwins(type: OpsType) {
    let mod = ['MM', 'MF', 'FF', 'FM'];
    mod.forEach((m) => {
      if (m === type.modalityString) {
        return; // skip exact
      }
      var tempType = new OpsType(
        m,
        this.opsType.s1String,
        this.opsType.s2String,
        this.opsType.animalString
      );
      let mfKey =
        m +
        '-' +
        type.s1String +
        '/' +
        type.s2String +
        '-' +
        type.animalStringFormal;
      this.concatTwins(mfKey);
      if (this.twinNeed) {
        this.fetchNeedTwins(tempType);
      }
      if (this.twinDom) {
        this.fetchDomTwins(tempType);
      }
    });
  }

  private fetchNeedTwins(type: OpsType) {
    const saviorAlt = type.s2String + '/' + type.s1String;
    this.concatTwins(
      type.modalityString + '-' + saviorAlt + '-' + type.animalStringFormal
    );
    if (this.twinDom) {
      var tempType = new OpsType(
        type.modalityString,
        type.s2String,
        type.s1String,
        type.animalString
      );
      this.fetchDomTwins(tempType);
    }
  }

  private fetchDomTwins(type: OpsType) {
    let animalAlt =
      type.animalStack[0] +
      type.animalStack[1] +
      '/' +
      type.animalStack[3] +
      '(' +
      type.animalStack[2] +
      ')';
    this.concatTwins(
      type.modalityString +
        '-' +
        type.s1String +
        '/' +
        type.s2String +
        '-' +
        animalAlt
    );
  }

  /**
   * Add twins with a specified type to the list.
   */
  private concatTwins(key: string) {
    let twins = this.allTypes.get(key);
    if (twins) {
      this.twinPersons = this.twinPersons.concat(twins);
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
    this.fetchTwins(this.opsType);
  }
}
