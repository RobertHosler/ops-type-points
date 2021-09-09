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
  typeString: string;

  displayedRecords: TypeRecord[];
  maxRecords = 100;

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

  constructor(private opsDataService: OpsDataService) { }

  ngOnInit(): void {
  }

  onSubmitName(form: NgForm) {
    this.searchLoading = true;
    this.opsDataService.getName(this.maxRecords, this.nameString).subscribe((result:TypeRoot) => {
      this.displayedRecords = result.records;
      this.isMaxRecords = result.records.length >= this.maxRecords;
      this.searchLoading = false;
    });
  }

  onSubmitType(form: NgForm) {
    this.searchLoading = true;
    this.opsDataService.getType(this.maxRecords, this.typeString).subscribe((result:TypeRoot) => {
      this.displayedRecords = result.records;
      this.isMaxRecords = result.records.length >= this.maxRecords;
      this.searchLoading = false;
    });
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
    } else if (this.dhnLabel === 'De') {
      this.dhnLabel = 'Di';
    } else {
      this.dhnLabel = '';
    }
  }

  ohn() {
    if (!this.ohnLabel) {
      this.ohnLabel = 'Oe';
    } else if (this.ohnLabel === 'Oe') {
      this.ohnLabel = 'Oi';
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
    this.opsDataService.getCoins(this.maxRecords,
        this.hn1Label, this.ohnLabel, this.dhnLabel,
        this.olLabel, this.dlLabel, this.iaLabel, this.eaLabel, this.domLabel,
        this.smodLabel, this.demodLabel).subscribe((result:TypeRoot) => {
      this.displayedRecords = result.records;
      this.isMaxRecords = result.records.length >= this.maxRecords;
      this.searchLoading = false;
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
  }

}
