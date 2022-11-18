import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-ops-class',
  templateUrl: './ops-class.component.html',
  styleUrls: ['./ops-class.component.scss']
})
export class OpsClassComponent implements OnInit {

  debug = false;
  reverseOrder = false;
  includeQA = false;
  includeYT = false;
  displayTypes = false;
  displayPractice = false;
  showTypes = {
    ops: this.displayTypes,
    wss: false,
    ennea: false
  };
  loading = true;
  displayedRecords: TypedPerson[] = [];
  allNames: Map<string, TypedPerson>;

  constructor(private opsDataService: OpsDataService,
    private route: ActivatedRoute, private router: Router) {
    
    this.route.queryParamMap.subscribe((params) => {
      this.initRoutes(params);
    });
    this.opsDataService.allNames.subscribe((result) => {
      this.allNames = result;
      this.filterNames();
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.showTypes = {
      ops: this.displayTypes,
      wss: false,
      ennea: false
    };
  }

  initRoutes(params) {
    if(params.get('p')) {
      this.displayPractice = true;
    }
    if(params.get('r')) {
      this.reverseOrder = true;
    }
    if(params.get('qa')) {
      this.includeQA = true;
    }
  }

  filterNames() {
    this.displayedRecords = [];
    this.allNames.forEach((record) => {
      if (record.tags.includes('OPS Class Typing')) {
        if (!record.opsClassNumber) {
          if (this.debug) {console.log("No class number for", record.name); }
        } else if (!this.includeYT && record.opsClassNumber < 0) {
          if (this.debug) {console.log("Skip YT Class", record.name); }
          return;
        } else if (!this.includeQA && (record.opsClassNumber % 1 !== 0)) {
          if (this.debug) {console.log("Skip Q&A Class", record.name); }
          return;
        }
        this.displayedRecords.push(record);
      }
    });
    this.displayedRecords.sort((a,b) => {
      let result = 0;
      if (a.opsClassNumber && !b.opsClassNumber) {
        result = -1;
      } else if (!a.opsClassNumber && b.opsClassNumber) {
        result = 1;
      } else if (a.opsClassNumber && b.opsClassNumber) {
        result = Number(a.opsClassNumber) < Number(b.opsClassNumber) ? -1 : 1;
      }
      if (this.reverseOrder) {
        result = result * -1;
      }
      return result;
    });
  }

  personLink(typeRecord: TypedPerson) {
    return typeRecord.classLink;
  }

  toggleDisplayTypes() {
    this.displayTypes = !this.displayTypes;
    if (this.displayPractice) {
      this.displayPractice = false;
    }
    this.showTypes = {
      ops: this.displayTypes,
      wss: false,
      ennea: false
    };
  }
  
  togglePractice() {
    if (this.displayTypes) {
      this.toggleDisplayTypes();
    }
    this.displayPractice = !this.displayPractice;
  }

  toggleQA() {
    this.includeQA = !this.includeQA;
    this.filterNames();
  }

  toggleYT() {
    this.includeYT = !this.includeYT;
    this.filterNames();
  }

  toggleReverse() {
    this.reverseOrder = !this.reverseOrder;
    this.filterNames();
  }

  randomize() {
    this.displayedRecords = this.shuffleArray(this.displayedRecords).slice();
  }

  shuffleArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}
