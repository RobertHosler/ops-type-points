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

  modalityString: string;
  s1String: string;
  s2String: string;
  animalString: string;

  functions: Function[] = new Array<Function>();
  animals: Animal[];
  opsCode: string;

  constructor(
    private route: ActivatedRoute,
    private opsType: OpsTypeService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
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
    var type = new OpsType(
      this.modalityString,
      this.s1String,
      this.s2String,
      this.animalString
    );
    this.opsType.opsType = type;
    this.functions = type.functions;
    this.animals = type.animals;
    this.opsCode = type.opsCode;
  }

  onClear() {
    this.modalityString = '';
    this.s1String = '';
    this.s2String = '';
    this.animalString = '';
    // this.opsType.opsType = null;
  }

}
