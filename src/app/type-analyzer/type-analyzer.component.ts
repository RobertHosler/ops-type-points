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

  typeTwinsLoading = false;
  twinType = 'modality';

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

        this.opsDataService
          .getRecords(type.s1String, type.s2String, type.animalStringFormal)
          .subscribe((result: TypeRoot) => {
            type.twins = result.records;
            // console.log(result.records);
          });
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
    this.typeTwinsLoading = true;
    this.twinPersons = [];
    setTimeout(() => {
      if (this.allTypes && type) {
        switch (this.twinType) {
          case 'core-need':
            this.fetchNeedTwins(type);
            break;
          case 'info-energy':
            this.fetchDomTwins(type);
            break;
          case 'exact':
            this.fetchExactTwins(type);
            break;
          default:
            this.fetchModTwins(type);
        }
        this.typeTwinsLoading = false;
      } else {
        setTimeout(() => {
          this.fetchTwins(type);
        }, 200);
      }
      this.typeTwinsLoading = false;
    }, 200);
  }

  private fetchModTwins(type: OpsType) {
    let mfKey =
      'MF-' +
      type.s1String +
      '/' +
      type.s2String +
      '-' +
      type.animalStringFormal;
    this.concatTwins(
      'MM-' +
        type.s1String +
        '/' +
        type.s2String +
        '-' +
        type.animalStringFormal
    );
    this.concatTwins(mfKey);
    this.concatTwins(
      'FF-' +
        type.s1String +
        '/' +
        type.s2String +
        '-' +
        type.animalStringFormal
    );
    this.concatTwins(
      'FM-' +
        type.s1String +
        '/' +
        type.s2String +
        '-' +
        type.animalStringFormal
    );
  }

  private fetchNeedTwins(type: OpsType) {
    this.concatTwins(
      type.modalityString +
        '-' +
        type.s1String +
        '/' +
        type.s2String +
        '-' +
        type.animalStringFormal
    );
    this.concatTwins(
      type.modalityString +
        '-' +
        type.s2String +
        '/' +
        type.s1String +
        '-' +
        type.animalStringFormal
    );
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
        type.animalStringFormal
    );
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
    this.twinType = type;
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
