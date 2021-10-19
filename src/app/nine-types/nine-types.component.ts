import { Component, OnInit } from '@angular/core';
import { NineTypeSet, NineTypesService } from '../service/nine-types.service';

@Component({
  selector: 'app-nine-types',
  templateUrl: './nine-types.component.html',
  styleUrls: ['./nine-types.component.scss']
})
export class NineTypesComponent implements OnInit {

  nineTypes: Map<string, NineTypeSet>;

  numbers = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine'
  ];

  selectedNumbers = this.numbers.slice();
  selectedSources = ['Core Fear', 'Passions', 'Focus of Attention', 'Triggers'];

  sortBy = 'Number';

  sortOptions = ['Number', 'Source'];

  constructor(private nineTypesService: NineTypesService) {
    nineTypesService.nineTypes.subscribe((result) => {
      this.nineTypes = result;
    });
   }

  ngOnInit(): void {
  }

  chooseNumber(number: string) {
    const index = this.selectedNumbers.indexOf(number);
    if (index < 0) {
      this.selectedNumbers.push(number);
    } else {
      this.selectedNumbers.splice(index, 1);
    }
  }

  chooseSource(sourceKey: string) {
    const index = this.selectedSources.indexOf(sourceKey);
    if (index < 0) {
      this.selectedSources.push(sourceKey);
    } else {
      this.selectedSources.splice(index, 1);
    }
  }

  addAllSources() {
    this.selectedSources = [];
    this.nineTypes.forEach((value, key) => {
      this.selectedSources.push(key);
    });
  }

  addAllNumbers() {
    this.selectedNumbers = [];
    this.numbers.forEach((value) => {
      this.selectedNumbers.push(value);
    });
  }

  sourceText(source: string, number: string) {
    return this.nineTypes.get(source)[number.toLowerCase()];
  }

}
