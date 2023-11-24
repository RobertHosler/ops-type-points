import { Injectable } from '@angular/core';
import {
  OpsDataService,
  Parent,
  Source,
  Term,
} from '../service/ops-data.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TermsService {
  
  terms: Map<string, Term>;
  sources: Map<string, Source>;
  parents: Map<string, Parent>;

  ready: Subject<boolean>;

  constructor(private opsDataService: OpsDataService) {
    this.ready = new Subject<boolean>();
    opsDataService.allTerms.subscribe((result) => {
      this.terms = result;
      if (this.dataLoaded()) {
        this.ready.next(true);
      }
    });
    opsDataService.allSources.subscribe((result) => {
      this.sources = result;
      if (this.dataLoaded()) {
        this.ready.next(true);
      }
    });
    opsDataService.allParents.subscribe((result) => {
      this.parents = result;
      if (this.dataLoaded()) {
        this.ready.next(true);
      }
    });
  }

  /**
   * Get all the values from the terms map.
   */
  getAllTerms() : Term[] {
    const result = [];
    this.terms.forEach((value, key) => {
      result.push(key);
    });
    return result;
  }

  /**
   * Get the Parent's Child Terms.
   */
  getTermsByParent(parentName: string) : Term[] {
    var result: Term[] = [];
    const parent = this.parents.get(parentName);
    parent.children.forEach(child => {
      result.push(this.terms.get(child));
    });
    return result;
  }

  /**
   * Get all the terms for a source.
   */
  getTermsBySource(sourceName: string) : Term[] {
    var result: Term[] = [];
    const source = this.sources.get(sourceName);
    source.definitions.forEach(definition => {
      result.push(this.terms.get(definition.term));
    });
    return result;
  }

  /**
   * Get the Child's Parent Terms.
   */
  getTermsByChild(childName: string) : Term[] {
    var result: Term[] = [];
    const term = this.terms.get(childName);
    term.parents.forEach(parent => {
      result.push(this.terms.get(parent));
    });
    return result;
  }

  getTermsBySibling(siblingName: string) : Term[] {
    var result: Term[] = [];
    const siblingTerm = this.terms.get(siblingName);
    // for each parent, grab its children
    siblingTerm.parents.forEach(parentName => {
      const parentTerm = this.terms.get(parentName);
      parentTerm.children.forEach(childName => {
        const childTerm = this.terms.get(childName);
        if (!result.includes(childTerm)) { // no duplicates !!!
          result.push(childTerm);
        }
      });
    });
    return result;
  }

  getTermNames(terms: Term[]) : string[] {
    var result: string[] = [];
    terms.forEach(term => {
      result.push(term.name);
    });
    return result;
  }

  dataLoaded() : boolean {
    return !!(this.sources && this.parents && this.terms);
  }

}