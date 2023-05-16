import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  OpsDataService,
  Parent,
  Source,
  Term,
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
  activeTerms: string[];
  activeParent: string;

  parents: Map<string, Parent>;

  routerInit = false;
  
  @ViewChild('definition') loadedEl: ElementRef;

  constructor(
    private opsDataService: OpsDataService,
    private route: ActivatedRoute,
    private router: Router) {
    opsDataService.allTerms.subscribe((result) => {
      this.terms = result;
      if (!this.activeTerms) {
        this.allTerms();
      }
    });
    opsDataService.allSources.subscribe((result) => {
      this.sources = result;
    });
    opsDataService.allParents.subscribe((result) => {
      this.parents = result;
    });
    this.route.queryParamMap.subscribe((params: Params) => {
      this.initRouter(params);
    });
  }

  ngOnInit(): void {}
  
  private initRouter(params: Params) {
    if (!this.routerInit) {
      let parent = params.get('parent');
      let termsParam = params.get('terms');
      let sourceParam = params.get('source');
      if (parent) {
        this.activeParent = parent;
        this.updateParentTerms(parent);
      } else if (termsParam) {
        this.showTerms = true;
        let terms = termsParam.split(',');
        this.addKeys(terms);
      } else if (sourceParam) {
        this.showSources = true;
        this.activeSource = sourceParam;
      }
      this.routerInit = true;
    }
  }

  selectSource(key?: string) {
    if (this.activeSource !== key) {
      this.activeSource = key;
    } else {
      this.activeSource = '';
    }
    this.updateRoute();
  }

  get activeSourceVal() {
    return this.sources.get(this.activeSource);
  }

  toggleTermSet(keys: string[]) {
    this.updateTerms(keys);
    this.updateRoute();
  }

  updateTerms(keys: string[]) {
    this.addKeys(keys);
  }

  private addKeys(keys: string[]) {
    if (!this.activeTerms) {
      this.activeTerms = [];
    }
    if (keys) {
      keys.forEach((key) => {
        if (!this.activeTerms.includes(key)) {
          this.activeTerms.push(key);
        }
      });
    } else {
      console.log(keys);
    }
  }

  updateParentTerms(parent: string) {
    let parentVal = this.terms ? this.terms.get(parent) : null;
    if (parentVal) {
      this.activeTerms = [];
      this.toggleTermSet(parentVal.children);
      // this.activeTerms.unshift(parent);
      this.activeParent = parent;
    }
  }

  setParentTerms(parent: string) {
    if (this.activeParent !== parent) {
      this.updateParentTerms(parent);
    } else {
      this.activeParent = null;
      this.allTerms();
    }
    this.updateRoute();
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
    this.updateRoute();
  }

  toggleTerm(key: string) {
    this.activeParent = null;
    const index = this.activeTerms.indexOf(key);
    if (index < 0) {
      this.activeTerms.push(key);
    } else {
      this.activeTerms.splice(index, 1);
    }
    this.activeTerms.sort();
    this.updateRoute();
  }

  allTerms() {
    this.activeTerms = [];
    this.terms.forEach((value, key) => {
      this.activeTerms.push(key);
    });
  }

  resetAllTerms() {
    this.allTerms();
    this.updateRoute();
  }

  get dataLoaded() {
    return this.activeTerms && this.sources && this.parents && this.terms;
  }

  updateRoute() {
    let parent = null;
    let terms = null;
    if (this.activeParent) {
      parent = this.activeParent;
    } else {
      terms = this.activeTerms.length < 12 ? this.activeTerms.join(',') : null;
    }
    const queryParams: Params = {
      parent: parent,
      terms: terms,
      source: this.activeSource
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

}

class SelectableSource {
  active: boolean;
  source: Source;
}
