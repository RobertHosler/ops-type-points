import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OpsTypeService } from './ops-type.service';
import { OpsType } from './ops-type';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import {
  OpsDataService,
  TypedPerson,
  TypeRoot,
} from '../service/ops-data.service';

@Component({
  selector: 'app-type-analyzer',
  templateUrl: './type-analyzer.component.html',
  styleUrls: ['./type-analyzer.component.scss'],
})
export class TypeAnalyzerComponent implements OnInit, OnDestroy {
  title = 'ops-type-points';

  opsTypes: OpsType[];
  private opsTypesSub: Subscription;

  opsCodeLink =
    'https://subjectivepersonality.wordpress.com/2021/04/30/the-objective-personality-type-code/';
  whatIsOpsLink =
    'https://subjectivepersonality.wordpress.com/2020/08/19/what-is-ops/';

  modalityString: string;
  s1String: string;
  s2String: string;
  animalString: string;

  compare: boolean;

  isValidMod: boolean;
  isValidSaviors: boolean;
  isValidAnimals: boolean;
  typeValid: boolean;

  typeTwinsLoading = true;
  twinType = 'modality';
  twinMod = true;
  twinNeed = false;
  twinDom = false;

  validModalities: string[] = ['MM', 'MF', 'FM', 'FF'];

  validDeciders: string[] = ['Fe', 'Te', 'Fi', 'Ti'];

  validObservers: string[] = ['Se', 'Ne', 'Si', 'Ni'];

  validAnimals: string[] = [
    'SCBP',
    'SCPB',
    'SBCP',
    'SBPC',
    'CSBP',
    'CSPB',
    'CPSB',
    'CPBS',
    'BSCP',
    'BSPC',
    'BPSC',
    'BPCS',
    'PBCS',
    'PBSC',
    'PCSB',
    'PCBS',
  ];

  allTypes: Map<string, TypedPerson[]>;
  twinPersons: TypedPerson[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private opsTypeService: OpsTypeService,
    private opsDataService: OpsDataService
  ) {
    this.opsTypesSub = this.opsTypeService.opsTypesSubject.subscribe(
      (opsTypes: OpsType[]) => {
        // console.log(opsTypes);
        this.opsTypes = opsTypes;
        this.typeTwinsLoading = false;
      }
    );
    this.opsDataService.allTypes.subscribe((result) => {
      this.allTypes = result;
    });
  }

  ngOnInit() {
    this.opsTypes = this.opsTypeService.opsTypes;
    this.route.queryParamMap.subscribe((params) => {
      //Default to my type!
      this.modalityString = params.get('m') ? params.get('m') : 'FF';
      this.s1String = params.get('s1') ? params.get('s1') : 'Fe';
      this.s2String = params.get('s2') ? params.get('s2') : 'Se';
      this.animalString = params.get('a') ? params.get('a') : 'PCSB';
      // this.orderObj = { ...params.keys, ...params };
    });
    if (
      this.modalityString &&
      this.s1String &&
      this.s2String &&
      this.animalString
    ) {
      this.newType();
    }
  }

  ngOnDestroy() {
    this.opsTypesSub.unsubscribe();
  }

  copyLinkTo() {
    // console.log(location.href);
    var val = location.href;
    if (val.indexOf('?') < 0) {
      val += '?';
    }
    if (val.indexOf('m=') < 0) {
      val += 'm=' + this.modalityString + '&';
    }
    if (val.indexOf('s1=') < 0) {
      val += 's1=' + this.s1String + '&';
    }
    if (val.indexOf('s2=') < 0) {
      val += 's2=' + this.s2String + '&';
    }
    if (val.indexOf('a=') < 0) {
      val += 'a=' + this.animalString + '&';
    }
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid) {
      this.newType();
    }
  }

  newType() {
    this.modalityString = this.modalityString.toUpperCase();
    this.s1String = this.formatFunction(this.s1String);
    this.s2String = this.formatFunction(this.s2String);
    this.animalString = this.animalString.toUpperCase();
    this.isValidMod = this.validModalities.includes(this.modalityString);
    this.isValidSaviors = this.validateSaviors();
    this.isValidAnimals = this.validAnimals.includes(this.animalString);
    if (this.isValidMod && this.isValidSaviors && this.isValidAnimals) {
      var type = new OpsType(
        this.modalityString,
        this.s1String,
        this.s2String,
        this.animalString
      );
      if (type.valid) {
        this.typeValid = true;
        if (!this.compare) {
          this.opsTypeService.clearOpsTypes();
        }
        this.opsTypeService.addOpsType(type);
        this.fetchTwins(type);

        const queryParams: Params = {
          m: this.modalityString,
          s1: this.s1String,
          s2: this.s2String,
          a: this.animalString,
        };
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: queryParams,
          queryParamsHandling: 'merge',
        });
      } else {
        this.typeValid = false;
      }
    }
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

  private fetchModTwins(type: OpsType) {
    let mod = ['MM', 'MF', 'FF', 'FM'];
    mod.forEach((m) => {
      if (m === type.modalityString) {
        return; // skip exact
      }
      var tempType = new OpsType(
        m,
        this.s1String,
        this.s2String,
        this.animalString
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

  private fetchExactTwins(type: OpsType) {
    this.concatTwins(type.opsCode);
  }

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
    var opType = new OpsType(
      this.modalityString,
      this.s1String,
      this.s2String,
      this.animalString
    );
    this.fetchTwins(opType);
  }

  private validateSaviors(): boolean {
    var result = false;
    if (
      (this.validDeciders.includes(this.s1String) &&
        this.validObservers.includes(this.s2String)) ||
      (this.validObservers.includes(this.s1String) &&
        this.validDeciders.includes(this.s2String))
    ) {
      result = true;
    }
    return result;
  }

  private formatFunction(f: string) {
    return f.charAt(0).toUpperCase() + f.charAt(1).toLowerCase();
  }

  onClear() {
    this.opsTypeService.clearOpsTypes();
    this.modalityString = '';
    this.s1String = '';
    this.s2String = '';
    this.animalString = '';
  }

  onRemoveOpsType(index: number) {
    this.opsTypeService.removeOpsType(index);
  }
}
