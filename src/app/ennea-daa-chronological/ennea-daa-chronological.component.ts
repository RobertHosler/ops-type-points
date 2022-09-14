import { Component, OnInit } from '@angular/core';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-ennea-daa-chronological',
  templateUrl: './ennea-daa-chronological.component.html',
  styleUrls: ['./ennea-daa-chronological.component.scss']
})
export class EnneaDaaChronologicalComponent implements OnInit {

  displayTypes = false;
  loading = true;
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
          result = a.daaClassNumber - b.daaClassNumber;
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

}
