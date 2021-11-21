import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private opsDataService: OpsDataService) {
    this.opsDataService.allNames.subscribe((result) => {
      this.allNames = result;
      this.fetchCounts(!this.displayCounts); // inverts since function will undo
    });
  }

  ngOnInit(): void {}

  fetchCounts(displayCounts?: boolean) {
    this.displayCounts = displayCounts ? displayCounts : !this.displayCounts;
    if (this.displayCounts && !this.counts) {
      this.counts = new Map();
      this.allNames.forEach((person, name) => {
        if (!person.type) {
          return;
        }
        this.opsTypeTable.animalStacks.forEach((stack) => {
          stack.orders.forEach((order) => {
            if (person.type.includes(order.stack)) {
              this.incrementCount(order.stack);
              order.functions.forEach((f) => {
                if (person.type.includes(f)) {
                  this.incrementCount(f + '-' + order.stack);
                  this.incrementCount(f);
                }
              });
            }
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
    let result;
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
