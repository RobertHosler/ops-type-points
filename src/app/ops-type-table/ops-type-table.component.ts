import { Component, Input, OnInit } from '@angular/core';
import { searchModel } from '../search/search.model';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';
import { OpsTypeTable } from './ops-type-table.model';

@Component({
  selector: 'app-ops-type-table',
  templateUrl: './ops-type-table.component.html',
  styleUrls: ['./ops-type-table.component.scss'],
})
export class OpsTypeTableComponent implements OnInit {
  opsTypeTable = OpsTypeTable;

  @Input()
  displayCounts = false;
  counts: Map<string, number>;
  sex;

  allNames: Map<string, TypedPerson>;
  
  searchModel = searchModel;

  ixxp = ['IxxP', 'INTP', 'INFP', 'ISTP', 'ISFP'];
  ixxj = ['IxxJ', 'INTJ', 'INFJ', 'ISTJ', 'ISFJ'];
  exxp = ['ExxP', 'ENTP', 'ENFP', 'ESTP', 'ESFP'];
  exxj = ['ExxJ', 'ENTJ', 'ENFJ', 'ESTJ', 'ESFJ'];

  constructor(private opsDataService: OpsDataService) {
    this.opsDataService.allNames.subscribe((result) => {
      this.allNames = result;
      this.fetchCounts();
    });
  }

  ngOnInit(): void {}

  fetchCounts() {
    if (!this.counts) {
      this.counts = new Map();
      // For each Person
      this.allNames.forEach((person, name) => {
        if (!person.type) {
          return;
        }
        // For each Animal - S/C/B/P
        this.opsTypeTable.animalStacks.forEach((stack) => {
          if (person.animals && person.animals.startsWith(stack.short)) {
            this.incrementCount(stack.animal);
            // console.log(person.animals);
          }
          // For each Stack 'Order' - 4 each
          stack.orders.forEach((order) => {
            if (person.type.includes(order.stack)) {
              this.incrementCount(order.stack);
              order.functions.forEach((f) => {
                // f: Fe/Se, Ti/Ne etc
                if (person.type.includes(f)) {
                  this.incrementCount(f + '-' + order.stack);
                  this.incrementCount(f);
                }
              });
            }
          });
        });
        const typeLower = person.type.toLowerCase();
        [this.ixxp, this.ixxj, this.exxp, this.exxj].forEach(y => {
          y.forEach(x => { //intp, istp, etc
            const lower = x.toLowerCase();
            this.searchModel.comboTerms.get(lower).strings.forEach(s => { // ti/ne ti/si, etc
              if (typeLower.includes(s)) {
                this.incrementCount(x);
              }
            });
          });
        });
      });
    }
  }

  private incrementCount(key: string) {
    let val = this.counts.get(key);
    if (val) {
      this.counts.set(key, val + 1);
    } else {
      this.counts.set(key, 1);
    }
  }

  getCount(stack: string, f?: string) {
    let result : number;
    if (f && stack) {
      result = this.counts.get(f + '-' + stack);
    } else if (stack) {
      result = this.counts.get(stack);
    } else if (f) {
      result = this.counts.get(f);
    }
    return result ? result : 0;
  }

  isEp(f: string) {
    return f.startsWith('Ne') || f.startsWith('Se');
  }

  isEj(f: string) {
    return f.startsWith('Te') || f.startsWith('Fe');
  }

  isIj(f: string) {
    return f.startsWith('Ni') || f.startsWith('Si');
  }

  isIp(f: string) {
    return f.startsWith('Ti') || f.startsWith('Fi');
  }
}
