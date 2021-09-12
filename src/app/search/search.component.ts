import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  OpsDataService,
  TypeRecord,
  TypeRoot,
} from '../service/ops-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  nameString: string;
  typeString: string;

  displayedRecords: TypeRecord[];
  maxRecords = 10000;

  isMaxRecords = false;

  searchType = 'coins';

  searchLoading = false;

  //Needs
  hn1Label = '';
  dhnLabel = '';
  ohnLabel = '';
  //Letters
  olLabel = '';
  dlLabel = '';
  //Animals
  eaLabel = '';
  iaLabel = '';
  domLabel = '';
  //Modalities
  smodLabel = '';
  demodLabel = '';

  sexLabel = 'Sex';
  classLabel = 'Class';

  constructor(
    private route: ActivatedRoute,
    private opsDataService: OpsDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('name')) {
        this.nameString = params.get('name');
        this.searchType = 'name';
        this.onSubmitName(null);
      } else if (params.get('type')) {
        this.typeString = params.get('type');
        this.searchType = 'type';
        this.onSubmitType(null);
      } else {
        this.searchType = 'coins';
        this.hn1Label = params.get('hn1') ? params.get('hn1') : '';
        this.dhnLabel = params.get('dhn') ? params.get('dhn') : '';
        this.ohnLabel = params.get('ohn') ? params.get('ohn') : '';
        this.olLabel = params.get('ol') ? params.get('ol'): '';
        this.dlLabel = params.get('dl') ? params.get('dl') : '';
        this.iaLabel = params.get('ia') ? params.get('ia') : '';
        this.eaLabel = params.get('ea') ? params.get('ea') : '';
        this.domLabel = params.get('dom') ? params.get('dom') : '';
        this.smodLabel = params.get('smod') ? params.get('smod') : '';
        this.demodLabel = params.get('demod') ? params.get('demod') : '';
        this.sexLabel = params.get('sex') ? params.get('sex') : 'Sex';
        this.searchCoins();
      }
    });
  }

  onSubmitName(form: NgForm) {
    this.searchLoading = true;
    this.opsDataService
      .getName(this.maxRecords, this.nameString)
      .subscribe((result: TypeRoot) => {
        this.displayedRecords = result.records;
        this.isMaxRecords = result.records.length >= this.maxRecords;
        this.searchLoading = false;
      });
    const queryParams: Params = {
      name: this.nameString,
      type: null,
      hn1: null,
      ohn: null,
      dhn: null,
      ol: null,
      dl: null,
      ia: null,
      ea: null,
      dom: null,
      smod: null,
      demod: null,
      sex: null,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onSubmitType(form: NgForm) {
    this.searchLoading = true;
    this.opsDataService
      .getType(this.maxRecords, this.typeString)
      .subscribe((result: TypeRoot) => {
        this.displayedRecords = result.records;
        this.isMaxRecords = result.records.length >= this.maxRecords;
        this.searchLoading = false;
      });
    const queryParams: Params = {
      name: null,
      type: this.typeString,
      hn1: null,
      ohn: null,
      dhn: null,
      ol: null,
      dl: null,
      ia: null,
      ea: null,
      dom: null,
      smod: null,
      demod: null,
      sex: null,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onSubmitClusters(form: NgForm) {
    this.searchCoins();
  }

  hn1() {
    if (!this.hn1Label) {
      this.hn1Label = 'Observer';
    } else if (this.hn1Label === 'Observer') {
      this.hn1Label = 'Decider';
    } else {
      this.hn1Label = '';
    }
  }

  dhn() {
    if (!this.dhnLabel) {
      this.dhnLabel = 'De';
      // if (this.ohnLabel === 'Oi') {
      //   this.iaLabel = 'Blast';
      // } else if (this.ohnLabel === 'Oe') {
      //   this.eaLabel = 'Play';
      // }
    } else if (this.dhnLabel === 'De') {
      this.dhnLabel = 'Di';
      // if (this.ohnLabel === 'Oi') {
      //   this.eaLabel = 'Sleep';
      // } else if (this.ohnLabel === 'Oe') {
      //   this.iaLabel = 'Consume';
      // }
    } else {
      this.dhnLabel = '';
    }
  }

  ohn() {
    if (!this.ohnLabel) {
      this.ohnLabel = 'Oe';
      // if (this.dhnLabel === 'Di') {
      //   this.iaLabel = 'Consume';
      // } else if (this.dhnLabel === 'De') {
      //   this.eaLabel = 'Play';
      // }
    } else if (this.ohnLabel === 'Oe') {
      this.ohnLabel = 'Oi';
      // if (this.dhnLabel === 'Di') {
      //   this.eaLabel = 'Sleep';
      // } else if (this.dhnLabel === 'De') {
      //   this.iaLabel = 'Blast';
      // }
    } else {
      this.ohnLabel = '';
    }
  }

  ol() {
    if (!this.olLabel) {
      this.olLabel = 'Sensory';
    } else if (this.olLabel === 'Sensory') {
      this.olLabel = 'Intuition';
    } else {
      this.olLabel = '';
    }
  }

  dl() {
    if (!this.dlLabel) {
      this.dlLabel = 'Thinking';
    } else if (this.dlLabel === 'Thinking') {
      this.dlLabel = 'Feeling';
    } else {
      this.dlLabel = '';
    }
  }

  ea() {
    if (!this.eaLabel) {
      this.eaLabel = 'Play';
    } else if (this.eaLabel === 'Play') {
      this.eaLabel = 'Sleep';
    } else {
      this.eaLabel = '';
    }
  }

  ia() {
    if (!this.iaLabel) {
      this.iaLabel = 'Blast';
    } else if (this.iaLabel === 'Blast') {
      this.iaLabel = 'Consume';
    } else {
      this.iaLabel = '';
    }
  }

  dom() {
    if (!this.domLabel) {
      this.domLabel = 'Info';
    } else if (this.domLabel === 'Info') {
      this.domLabel = 'Energy';
    } else {
      this.domLabel = '';
    }
  }

  smod() {
    if (!this.smodLabel) {
      this.smodLabel = 'M S';
    } else if (this.smodLabel === 'M S') {
      this.smodLabel = 'F S';
    } else {
      this.smodLabel = '';
    }
  }

  demod() {
    if (!this.demodLabel) {
      this.demodLabel = 'M De';
    } else if (this.demodLabel === 'M De') {
      this.demodLabel = 'F De';
    } else {
      this.demodLabel = '';
    }
  }

  searchCoins() {
    this.searchLoading = true;
    this.opsDataService
      .getCoins(
        this.maxRecords,
        this.hn1Label,
        this.ohnLabel,
        this.dhnLabel,
        this.olLabel,
        this.dlLabel,
        this.iaLabel,
        this.eaLabel,
        this.domLabel,
        this.smodLabel,
        this.demodLabel,
        this.sexLabel === 'Sex' ? null : this.sexLabel
      )
      .subscribe((result: TypeRoot) => {
        if (this.classLabel === 'Class Only') {
          this.displayedRecords = [];
          result.records.forEach((record) => {
            if (
              record.fields.Tags &&
              record.fields.Tags.includes('Class Typing')
            ) {
              this.displayedRecords.push(record);
            }
          });
        } else {
          this.displayedRecords = result.records;
        }
        this.searchLoading = false;
      });
    const queryParams: Params = {
      name: null,
      type: null,
      hn1: this.hn1Label ? this.hn1Label : null,
      ohn: this.ohnLabel ? this.ohnLabel : null,
      dhn: this.dhnLabel ? this.dhnLabel : null,
      ol: this.olLabel ? this.olLabel : null,
      dl: this.dlLabel ? this.dlLabel : null,
      ia: this.iaLabel ? this.iaLabel : null,
      ea: this.eaLabel ? this.eaLabel : null,
      dom: this.domLabel ? this.domLabel : null,
      smod: this.smodLabel ? this.smodLabel : null,
      demod: this.demodLabel ? this.demodLabel : null,
      sex: this.sexLabel !== 'Sex' ? this.sexLabel : null,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  resetCoins() {
    //Needs
    this.hn1Label = '';
    this.dhnLabel = '';
    this.ohnLabel = '';
    //Letters
    this.olLabel = '';
    this.dlLabel = '';
    //Animals
    this.eaLabel = '';
    this.iaLabel = '';
    this.domLabel = '';
    //Modalities
    this.smodLabel = '';
    this.demodLabel = '';
    //Other
    this.sexLabel = 'Sex';
    this.classLabel = 'Class';
  }

  exxj() {
    this.hn1Label = 'Decider';
    this.dhnLabel = 'De';
  }

  ixxp() {
    this.hn1Label = 'Decider';
    this.dhnLabel = 'Di';
  }

  exxp() {
    this.hn1Label = 'Observer';
    this.ohnLabel = 'Oe';
  }

  ixxj() {
    this.hn1Label = 'Observer';
    this.ohnLabel = 'Oi';
  }

  nf() {
    this.olLabel = 'Intuition';
    this.dlLabel = 'Feeling';
  }

  nt() {
    this.olLabel = 'Intuition';
    this.dlLabel = 'Thinking';
  }

  sf() {
    this.olLabel = 'Sensory';
    this.dlLabel = 'Feeling';
  }

  st() {
    this.olLabel = 'Sensory';
    this.dlLabel = 'Thinking';
  }

  mm() {
    this.smodLabel = 'M S';
    this.demodLabel = 'M De';
  }

  mf() {
    this.smodLabel = 'M S';
    this.demodLabel = 'F De';
  }

  ff() {
    this.smodLabel = 'F S';
    this.demodLabel = 'F De';
  }

  fm() {
    this.smodLabel = 'F S';
    this.demodLabel = 'M De';
  }

  skib() {
    this.eaLabel = 'Play';
    this.iaLabel = 'Consume';
  }

  crack() {
    this.eaLabel = 'Play';
    this.iaLabel = 'Blast';
  }

  bs() {
    this.eaLabel = 'Sleep';
    this.iaLabel = 'Blast';
  }

  mope() {
    this.eaLabel = 'Sleep';
    this.iaLabel = 'Consume';
  }

  sex() {
    if (this.sexLabel === 'Sex') {
      this.sexLabel = 'Male';
    } else if (this.sexLabel === 'Male') {
      this.sexLabel = 'Female';
    } else {
      this.sexLabel = 'Sex';
    }
  }

  class() {
    if (this.classLabel === 'Class') {
      this.classLabel = 'Class Only';
    } else {
      this.classLabel = 'Class';
    }
  }
}
