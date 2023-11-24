import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Parent,
  Source, Term,
} from '../service/ops-data.service';
import { TermsService } from '../service/terms.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {

  showSources = false;
  showTerms = false;
  routerInit = false;

  activeSource: string;
  activeTermNames: string[];
  activeParent: string;

  terms: Map<string, Term>;
  sources: Map<string, Source>;
  parents: Map<string, Parent>;
  params: Params;

  @ViewChild('definition') loadedEl: ElementRef;

  constructor(
      private termsService: TermsService,
      private route: ActivatedRoute,
      private router: Router) {
    this.termsService.ready.subscribe({
      next: (bool) => {
        this.terms = this.termsService.terms;
        this.sources = this.termsService.sources;
        this.parents = this.termsService.parents;
        this.initRouter(this.params);
        if (!this.activeTermNames) {
          this.allTerms();
        }
      }
    });
    this.route.queryParamMap.subscribe((params: Params) => {
      this.params = params;
    });
  }

  ngOnInit(): void { }
  
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
    return this.termsService.sources.get(this.activeSource);
  }

  toggleTermSet(keys: string[]) {
    this.updateTerms(keys);
    this.updateRoute();
  }

  updateTerms(keys: string[]) {
    this.addKeys(keys);
  }

  /**
   * Add a list of keys to the active list, checking
   * to make sure a key isn't added again if they
   * are already in there.
   */
  private addKeys(keys: string[]) {
    if (!this.activeTermNames) {
      this.activeTermNames = [];
    }
    if (keys) {
      keys.forEach((key) => {
        if (!this.activeTermNames.includes(key)) {
          this.activeTermNames.push(key);
        }
      });
    } else {
      console.log(keys);
    }
  }

  updateParentTerms(parent: string) {
    let parentVal = this.termsService.terms ? this.termsService.terms.get(parent) : null;
    if (parentVal) {
      this.activeTermNames = [];
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
    this.activeTermNames = [];
    const tempTerms = this.termsService.getTermsBySibling(child);
    this.activeTermNames = this.termsService.getTermNames(tempTerms);
    this.updateRoute();
  }

  toggleTerm(key: string) {
    this.activeParent = null;
    const index = this.activeTermNames.indexOf(key);
    if (index < 0) {
      this.activeTermNames.push(key);
    } else {
      this.activeTermNames.splice(index, 1);
    }
    this.activeTermNames.sort();
    this.updateRoute();
  }

  allTerms() {
    this.activeTermNames = Array.from(this.termsService.terms.keys());
  }

  resetAllTerms() {
    this.allTerms();
    this.updateRoute();
  }

  get dataLoaded() {
    return this.activeTermNames && this.termsService.dataLoaded;
  }

  updateRoute() {
    let parentParams = null;
    let termParams = null;
    if (this.activeParent) {
      parentParams = this.activeParent;
    } else {
      termParams = this.activeTermNames.length < 12 ? this.activeTermNames.join(',') : null;
    }
    const queryParams: Params = {
      parent: parentParams,
      terms: termParams,
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
