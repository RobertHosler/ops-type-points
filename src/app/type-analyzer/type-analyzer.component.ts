import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Function } from './function.model';
import { OpsTypeService } from './ops-type.service';
import { OpsType } from './ops-type';
import { Animal } from './animal';

@Component({
  selector: 'app-type-analyzer',
  templateUrl: './type-analyzer.component.html',
  styleUrls: ['./type-analyzer.component.css'],
})
export class TypeAnalyzerComponent implements OnInit {
  title = 'ops-type-points';

  opsTypes: OpsType[];

  modalityString: string;
  s1String: string;
  s2String: string;
  animalString: string;

  compare: boolean;

  functions: Function[] = new Array<Function>();
  animals: Animal[];
  opsCode: string;

  modalityStringB: string = '';
  s1StringB: string;
  s2StringB: string;
  animalStringB: string;

  functionsB: Function[] = new Array<Function>();
  animalsB: Animal[];
  opsCodeB: string;

  constructor(private route: ActivatedRoute, private opsTypeService: OpsTypeService) {}

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
      this.onSubmit();
    }
  }

  copyLinkTo() {
    console.log(location.href);
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

  onSubmit() {
    if (
      this.modalityString &&
      this.s1String &&
      this.s2String &&
      this.animalString
    ) {
      this.modalityString
      var type = new OpsType(
        this.modalityString,
        this.s1String,
        this.s2String,
        this.animalString
      );
      if (!this.compare) {
        this.opsTypeService.clearOpsTypes();
      }
      this.opsTypeService.addOpsType(type);
      this.functions = type.functions;
      this.animals = type.animals;
      this.opsCode = type.opsCode;
    }

    if (
      this.modalityStringB &&
      this.s1StringB &&
      this.s2StringB &&
      this.animalStringB
    ) {
      var typeB = new OpsType(
        this.modalityStringB,
        this.s1StringB,
        this.s2StringB,
        this.animalStringB
      );
      this.opsTypeService.clearOpsTypes();
      this.opsTypeService.addOpsType(typeB);
      this.functionsB = typeB.functions;
      this.animalsB = typeB.animals;
      this.opsCodeB = typeB.opsCode;
    }
  }

  onClear() {
    this.opsTypeService.clearOpsTypes();
    this.modalityString = '';
    this.s1String = '';
    this.s2String = '';
    this.animalStringB = '';
    this.animals = [];
    this.functions = [];
    this.opsCode = '';

    this.animalString = '';
    this.modalityStringB = '';
    this.s1StringB = '';
    this.s2StringB = '';
    this.animalsB = [];
    this.functionsB = [];
    this.opsCodeB = '';
  }

  onRemoveOpsType(index: number) {
    this.opsTypeService.removeOpsType(index);
  }
}
