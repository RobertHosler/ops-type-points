import { Component, OnInit } from '@angular/core';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-ennea-daa-chronological',
  templateUrl: './ennea-daa-chronological.component.html',
  styleUrls: ['./ennea-daa-chronological.component.scss']
})
export class EnneaDaaChronologicalComponent implements OnInit {

  displayTypes = false;
  showTypes = {
    ops: false,
    wss: false,
    ennea: true,
    ap: false
  };
  loading = true;
  displayPractice = false;
  displayedRecords: TypedPerson[] = [];
  allNames: Map<string, TypedPerson>;

  constructor(private opsDataService: OpsDataService) {
    this.opsDataService.allNames.subscribe((result) => {
      result.forEach((record) => {
        if (record.daaClassNumber) {
          this.displayedRecords.push(record);
        }
      });
      this.displayedRecords.sort((a,b) => {
        let result = 0;
        if (a.daaClassNumber && !b.daaClassNumber) {
          result = -1;
        } else if (!a.daaClassNumber && b.daaClassNumber) {
          result = 1;
        } else if (a.daaClassNumber && b.daaClassNumber) {
          result = a.daaClassNumber * 1.0 < b.daaClassNumber * 1.0 ? -1 : 1;
        }
        return result;
      });
      this.loading = false;
    });
  }

  ngOnInit(): void {

  }

  personLink(typeRecord: TypedPerson) {
    return typeRecord.daaLink;
  }

  toggleDisplayTypes() {
    this.displayTypes = !this.displayTypes;
  }
  
  togglePractice() {
    if (this.displayTypes) {
      this.toggleDisplayTypes();
    }
    this.displayPractice = !this.displayPractice;
  }

}
