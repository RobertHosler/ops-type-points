import { Component, OnInit } from '@angular/core';
import {
  OpsDataService,
  Parent,
  Source,
  Term,
  TypedPerson,
} from '../service/ops-data.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  showSources = false;
  showTerms = false;
  terms: Map<string, Term>;
  sources: Map<string, Source>;
  activeSource: string;
  activeTerms = [];

  parents: Map<string, Parent>;

  activeParent: string;

  constructor(private opsDataService: OpsDataService) {
    opsDataService.allTerms.subscribe((result) => {
      this.terms = result;
      this.allTerms();
    });
    opsDataService.allSources.subscribe((result) => {
      this.sources = result;
    });
    opsDataService.allParents.subscribe((result) => {
      this.parents = result;
    });
  }

  ngOnInit(): void {}

  selectSource(key?: string) {
    this.activeSource = '';
    if (key) {
      this.activeSource = key;
    }
  }

  get activeSourceVal() {
    return this.sources.get(this.activeSource);
  }

  toggleTermSet(keys: string[]) {
    this.activeTerms = [];
    this.addKeys(keys);
  }

  private addKeys(keys: string[]) {
    if (keys) {
      keys.forEach((key) => {
        this.activeTerms.push(key);
      });
    } else {
      console.log(keys);
    }
  }

  setParentTerms(parent: string) {
    let parentVal = this.terms.get(parent);
    this.toggleTermSet(parentVal.children);
    // this.activeTerms.unshift(parent);
    this.activeParent = parent;
  }

  /**
   * Set the terms based on the chosen child. Display child and
   * it's siblings.
   */
  setChildTerms(child: string) {
    this.activeTerms = [];
    this.terms.get(child).parents.forEach(parent => {
      let parentVal = this.terms.get(parent);
      this.addKeys(parentVal.children);
    });
  }

  toggleTerm(key: string) {
    const index = this.activeTerms.indexOf(key);
    if (index < 0) {
      this.activeTerms.push(key);
    } else {
      this.activeTerms.splice(index, 1);
    }
    this.activeTerms.sort();
  }

  allTerms() {
    this.activeTerms = [];
    this.terms.forEach((value, key) => {
      this.activeTerms.push(key);
    });
  }
}

class SelectableSource {
  active: boolean;
  source: Source;
}
