import { Component, Input, OnInit } from '@angular/core';
import { TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-type-record-item',
  templateUrl: './type-record-item.component.html',
  styleUrls: ['./type-record-item.component.scss'],
})
export class TypeRecordItemComponent implements OnInit {

  @Input()
  typeRecord: TypedPerson;

  @Input()
  externalLink; // function?

  @Input()
  showTypes = true;

  @Input()
  imageOnly = false;

  @Input()
  grayscale = false;

  @Input()
  enneaOnly = false;

  @Input()
  typeIndicator = false;

  @Input()
  displayPracticeLink = false;

  activeTag = '';

  constructor() {}

  ngOnInit(): void {}

  imageRouterLink() {
    return this.displayPracticeLink ? ['/practice'] : ['/search/person'];
  }

  imageQueryParams(typeRecord) {
    return this.displayPracticeLink
      ? { name: typeRecord.name }
      : { person: typeRecord.name };
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
}
