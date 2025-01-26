import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-type-record-item',
  templateUrl: './type-record-item.component.html',
  styleUrls: ['./type-record-item.component.scss']
})
export class TypeRecordItemComponent implements OnInit, OnChanges {

  @Input()
  typeRecord: TypedPerson;

  @Input()
  personKey: string;

  @Input()
  externalLink; // function?

  @Input()
  imageOnly = false;

  @Input()
  showReveal = false;

  @Input()
  grayscale = false;

  @Input()
  typeIndicator = false;

  @Input()
  displayPracticeLink = false;

  @Input()
  showTypes: ShowTypes = {
    ops: true,
    wss: true,
    ennea: true,
    ap: true
  };

  opsShow: boolean;
  wssShow: boolean;
  enneaShow: boolean;
  apShow: boolean;

  activeTag = '';

  constructor() {}

  ngOnInit(): void {
    this.opsShow = this.showTypes.ops;
    this.wssShow = this.showTypes.wss;
    this.enneaShow = this.showTypes.ennea;
    this.apShow = this.showTypes.ap;
  }

  ngOnChanges() {
    this.opsShow = this.showTypes.ops;
    this.wssShow = this.showTypes.wss;
    this.enneaShow = this.showTypes.ennea;
    this.apShow = this.showTypes.ap;
  }

  imageRouterLink() {
    return this.displayPracticeLink ? ['/practice'] : ['/search/person'];
  }

  imageQueryParams(typeRecord) {
    return this.displayPracticeLink
      ? { name: typeRecord.key }
      : { person: typeRecord.key };
  }

  emphasize(fullETypeOverlay: string, emphasizedNumbers: string[]) {
    let result = fullETypeOverlay;
    emphasizedNumbers.forEach((number) => {
      const index = result.indexOf(number);
      const s1 = result.substring(0, index);
      const s2 = result.substring(index + 1, result.length);
      result = s1 + '<u>' + number + '</u>' + s2;
    });
    // console.log(result);
    return result;
  }

  parseNumber(s) {
    parseInt(s);
  }

}

export class ShowTypes {
  ops: boolean;
  wss: boolean;
  ennea: boolean;
  ap: boolean;
  create?: boolean;
  modify?: boolean;
}