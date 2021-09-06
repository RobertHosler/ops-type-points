import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Function } from './function.model';
import { OpsTypeService } from './ops-type.service';
import { OpsType } from './ops-type';
import { Animal } from './animal';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-type-analyzer',
  templateUrl: './type-analyzer.component.html',
  styleUrls: ['./type-analyzer.component.css'],
})
export class TypeAnalyzerComponent implements OnInit, OnDestroy {
  title = 'ops-type-points';

  opsTypes: OpsType[];
  private opsTypesSub: Subscription;

  opsCodeLink = 'https://subjectivepersonality.wordpress.com/2021/04/30/the-objective-personality-type-code/';
  whatIsOpsLink = 'https://subjectivepersonality.wordpress.com/2020/08/19/what-is-ops/';

  modalityString: string;
  s1String: string;
  s2String: string;
  animalString: string;

  compare: boolean;

  isValidMod: boolean;
  isValidSaviors: boolean;
  isValidAnimals: boolean;
  typeValid: boolean;

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

  constructor(
    private route: ActivatedRoute,
    private opsTypeService: OpsTypeService
  ) {
    this.opsTypesSub = this.opsTypeService.opsTypesSubject.subscribe(
      (opsTypes: OpsType[]) => {
        // console.log(opsTypes);
        this.opsTypes = opsTypes;
      }
    );
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
      } else {
        this.typeValid = false;
      }
    }
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
