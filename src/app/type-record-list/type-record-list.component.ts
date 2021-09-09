import { Component, Input, OnInit } from '@angular/core';
import { TypeRecord } from '../service/ops-data.service';

@Component({
  selector: 'app-type-record-list',
  templateUrl: './type-record-list.component.html',
  styleUrls: ['./type-record-list.component.scss']
})
export class TypeRecordListComponent implements OnInit {

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

}
