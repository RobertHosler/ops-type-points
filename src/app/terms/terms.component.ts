import { Component, OnInit } from '@angular/core';
import { OpsDataService, Source, Term } from '../service/ops-data.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  showSources = false;
  terms: Map<string, Term>;
  sources: Map<string, Source>;
  activeSource: string;

  constructor(private opsDataService: OpsDataService) {
    opsDataService.allTerms.subscribe((result) => {
      this.terms = result;
    });
    opsDataService.allSources.subscribe((result) => {
      this.sources = result;
    });
  }

  ngOnInit(): void {}

  selectSource(key?: string) {
    this.activeSource = '';
    if (key) {
      this.activeSource = key;
    }
  }
}

class SelectableSource {
  active: boolean;
  source: Source;
}
