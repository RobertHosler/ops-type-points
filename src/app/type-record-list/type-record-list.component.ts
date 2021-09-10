import { Component, Input, OnInit } from '@angular/core';
import { TypeRecord } from '../service/ops-data.service';
import { AnimalStack } from '../type-analyzer/type-animal/animal-stack';

@Component({
  selector: 'app-type-record-list',
  templateUrl: './type-record-list.component.html',
  styleUrls: ['./type-record-list.component.scss']
})
export class TypeRecordListComponent implements OnInit {

  @Input()
  linkToAnalyzer = false;

  @Input()
  loading = false;

  @Input()
  typeRecords: TypeRecord[];

  @Input()
  notFoundMessage = 'Sorry, no type records found';

  @Input()
  loadingMessage = 'Type Records are loading...';

  constructor() { }

  ngOnInit(): void {
  }

  analyzerLink(type:string) {
    const mod = type.substring(0, 2);
    const sav1 = type.substring(3, 5);
    const sav2 = type.substring(6, 8);
    let animals = type.substring(9, 16);
    animals = animals.replace('(', '');
    animals = animals.replace(')', '');
    animals = animals.replace('/', '');
    return '/analyzer?m=' + mod + '&s1=' + sav1 + '&s2=' + sav2 + '&a=' + animals;
  }

}
