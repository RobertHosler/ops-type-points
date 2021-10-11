import { Component, OnInit } from '@angular/core';
import { OpsDataService, Term } from '../service/ops-data.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  showSources = false;
  terms: Map<string, Term>;

  constructor(private opsDataService: OpsDataService) {
    opsDataService.allTerms.subscribe(result => {
      this.terms = result;
    });
  }

  ngOnInit(): void {
  }

}
