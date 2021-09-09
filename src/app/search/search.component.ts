import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OpsDataService, TypeRecord, TypeRoot } from '../service/ops-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  nameString: string;

  displayedRecords: TypeRecord[];

  constructor(private opsDataService: OpsDataService) { }

  ngOnInit(): void {
  }

  onSubmitName(form: NgForm) {
    this.opsDataService.getName(this.nameString).subscribe((result:TypeRoot) => {
      this.displayedRecords = result.records;
    });
  }

}
