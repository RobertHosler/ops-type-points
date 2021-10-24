import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Coin, coinMap, coinSideMap, extraCoins } from '../model/coin';
import { appLinks } from '../model/links';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';
import { ETypeModel, InstinctModel, searchModel } from './search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  enneagrammerLink = appLinks.enneagrammerDb;
  enneagrammerPinterest = appLinks.enneagrammerPinterest;
  opsDbInfo = appLinks.opsDbInfo;
  opsDbSource = appLinks.opsDbSource;
  appLinks = appLinks;

  textString: string;
  activeEType: ETypeModel;
  activeWing: string;
  activeInstinct: InstinctModel;
  activeInstinct2: string;

  displayedRecords: TypedPerson[];
  maxRecords = 10000;

  isMaxRecords = false;

  searchType = '';
  searchTypes = ['Coins', 'Name', 'Type', 'Enneagram'];
  opsToggle = {
    name: 'OPS',
    active: false,
    reset: () => {
      this.resetAllOptions();
    },
  };
  enneaToggle = {
    name: 'Enneagram',
    active: false,
    reset: () => {
      this.resetEnnea();
    },
  };
  searchToggles = [this.opsToggle, this.enneaToggle];

  searchLoading = true;

  options = new Map<string, OptionModel>();
  optionValues: OptionModel[];

  clusters = searchModel.clusters;
  eTypes = searchModel.eTypes;
  instincts = searchModel.instincts;
  typeOnlyStrings = searchModel.typeOnlyStrings;

  allNames: Map<string, TypedPerson>;
  recordCount = 0;

  allNamesArr: string[];
  allNamesArrUnsorted: string[];
  sortByName = false;

  routerInit = false;

  @ViewChild('recordList') recordList: ElementRef;

  initialLoad = true;

  constructor(
    private opsDataService: OpsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.opsDataService.allNames.subscribe((result) => {
      this.allNames = result;
      this.allNamesArr = [];
      this.recordCount = 0;
      this.allNames.forEach((record) => {
        this.allNamesArr.push(record.name);
        this.recordCount++;
      });
      this.allNamesArrUnsorted = this.allNamesArr.slice();
      this.allNamesArr.sort();
      if (!this.routerInit) {
        this.routerInit = true;
        this.initRouter();
      }
    });
  }

  ngOnInit(): void {
    this.initOptions();
  }

  private initRouter() {
    this.route.queryParamMap.subscribe((params) => {
      this.textString = params.get('text');
      if (!this.textString) {
        this.textString = params.get('type');
      }
      if (!this.textString) {
        this.textString = params.get('name');
      }
      this.eTypes.forEach((eType) => {
        if (eType.name === params.get('et')) {
          this.activeEType = eType;
        }
      });
      this.instincts.forEach((instinct) => {
        if (instinct.name === params.get('i1')) {
          this.activeInstinct = instinct;
        }
      });
      this.activeInstinct2 = params.get('i2');
      this.activeWing = params.get('w');
      this.options.forEach((option) => {
        option.val = params.get(option.coin.param)
          ? params.get(option.coin.param)
          : '';
      });
      this.searchAll();
    });
  }

  private initOptions() {
    Array.from(coinMap.values()).forEach((coin) => {
      this.options.set(coin.param, { coin: coin, val: '' });
    });
    extraCoins.forEach((coin, key) => {
      this.options.set(coin.param, { coin: coin, val: '' });
    });
    this.optionValues = Array.from(this.options.values());
  }

  /**
   * Determines if a cluster is active based on its corresponding coin side list.
   *
   * Ex: NF is active if Intuition and Feeling are active.
   */
  isCoins(coins: { optionKey: string; sideKey: string }[]) {
    let result = true;
    coins.forEach((coin) => {
      if (result) {
        result = this.isSide(coin.optionKey, coin.sideKey);
      }
    });
    return result;
  }

  /**
   * Determines if the coin is set to the value of the provided side.
   *
   * Ex: Determine if Feeling/Thinking coin is Feeling or Thinking side
   */
  private isSide(optionKey: string, sideKey: string) {
    return (
      this.options.get(optionKey).val ===
      (coinSideMap.get(sideKey) ? coinSideMap.get(sideKey).val : '')
    );
  }

  /**
   * Sets the coins to the sides in a given cluster
   *
   * Ex: Fe sets Decider Need to Tribe and F vs T to Feeling
   */
  setCoins(coins: { optionKey: string; sideKey: string }[]) {
    let alreadySet = true;
    coins.forEach((coin) => {
      const coinVal = this.options.get(coin.optionKey).val;
      const sideVal = coinSideMap.get(coin.sideKey).val;
      if (coinVal !== sideVal) {
        alreadySet = false;
      }
    });
    if (!alreadySet) {
      coins.forEach((coin) => {
        this.setSide(coin.optionKey, coin.sideKey);
      });
    } else {
      coins.forEach((coin) => {
        this.setSide(coin.optionKey, '');
      });
    }
  }

  private setSide(optionKey: string, sideKey: string) {
    this.options.get(optionKey).val = coinSideMap.get(sideKey)
      ? coinSideMap.get(sideKey).val
      : '';
  }

  /**
   * Initiate search for all possible options.
   */
  searchAll() {
    this.displayedRecords = [];
    this.searchNames();
    this.updateRoute();
    this.searchLoading = false;
  }

  /**
   * For each name, see if the person matches the selected criteria.
   */
  private searchNames() {
    let nameList: string[];
    if (this.sortByName) {
      nameList = this.allNamesArr;
    } else {
      nameList = this.allNamesArrUnsorted;
    }
    nameList.forEach((name: string) => {
      let person = this.allNames.get(name);
      if (
        !this.matchText(person) ||
        !this.matchCoins(person) ||
        !this.matchEnnea(person)
      ) {
        return;
      }
      this.displayedRecords.push(person);
    });
  }

  /**
   * Determine if the person matches the selected enneagram options.
   */
  private matchEnnea(person): boolean {
    if (
      (this.activeEType && this.activeEType.name !== person.coreEType) ||
      (this.activeWing && this.activeWing !== person.wing) ||
      (this.activeInstinct &&
        (!person.instinct ||
          this.activeInstinct.name !== person.instinct.substring(0, 2))) ||
      (this.activeInstinct2 &&
        this.activeInstinct2 !== person.instinct.substring(3, 5))
    ) {
      return false;
    }
    return true;
  }

  /**
   * Split up the text string by spaces and apply text matching for each part.
   */
  private matchText(person: TypedPerson): boolean {
    if (!this.textString) {
      return true;
    }
    let strings = this.textString.toLowerCase().split(' ');
    let result = true;
    strings.forEach((string) => {
      if (result) {
        let s = string.toLowerCase();
        if (s.startsWith('!')) {
          // inverse matching
          s = s.substring(1);
          result = !this.matchTextParts(person, s);
        } else {
          result = this.matchTextParts(person, s);
        }
      }
    });
    return result;
  }

  private matchTextParts(person: TypedPerson, s: string) {
    if (searchModel.comboTerms.get(s)) {
      let result = false;
      searchModel.comboTerms.get(s).strings.forEach((subS: string) => {
        if (!result) {
          result = this.matchTextPartsDecoded(person, subS);
        }
      });
      return result;
    } else {
      return this.matchTextPartsDecoded(person, s);
    }
  }

  private matchTextPartsDecoded(person: TypedPerson, s: string) {
    let result = true;
    if (searchModel.personTerms.get(s)) {
      if (!searchModel.personTerms.get(s).match(person)) {
        result = false;
      }
    } else if (searchModel.tagTerms.includes(s)) {
      if (!person.tags) {
        result = false;
      } else {
        result = false;
        person.tags.forEach((tag) => {
          if (!result && tag.toLowerCase().includes(s)) {
            result = true;
          }
        });
      }
    } else if (this.typeOnlyStrings.includes(s)) {
      // fe, mm, sb, etc
      if (!person.type || !person.type.toLowerCase().includes(s)) {
        result = false;
      }
    } else if (searchModel.coreETypeStrings.includes(s)) {
      // 3, 4, etc
      if (!person.fullEType || !person.coreEType.toLowerCase().includes(s)) {
        result = false;
      }
    } else if (searchModel.eTypeStrings.includes(s)) {
      // 9w1, 6w7, etc
      if (!person.eType || !person.eType.toLowerCase().includes(s)) {
        result = false;
      }
    } else if (searchModel.trifixStrings.includes(s)) {
      // 936, 541, etc
      if (person.trifix !== s) {
        result = false;
      }
    } else if (
      !(
        person.name.toLowerCase().includes(s) ||
        (person.type && person.type.toLowerCase().includes(s)) ||
        (person.fullEType && person.fullEType.toLowerCase().includes(s))
      )
    ) {
      result = false;
    }
    return result;
  }

  private matchCoins(person: TypedPerson): boolean {
    if (
      this.options.get('hn1').val &&
      this.options.get('hn1').val !== person.coreNeed
    ) {
      return false;
    }
    if (
      this.options.get('dhn').val &&
      this.options.get('dhn').val !== person.deciderNeed
    ) {
      return false;
    }
    if (
      this.options.get('ohn').val &&
      this.options.get('ohn').val !== person.observerNeed
    ) {
      return false;
    }
    if (
      this.options.get('ol').val &&
      this.options.get('ol').val !== person.observerLetter
    ) {
      return false;
    }
    if (
      this.options.get('dl').val &&
      this.options.get('dl').val !== person.deciderLetter
    ) {
      return false;
    }
    if (
      this.options.get('ia').val &&
      this.options.get('ia').val !== person.infoAnimal
    ) {
      return false;
    }
    if (
      this.options.get('ea').val &&
      this.options.get('ea').val !== person.energyAnimal
    ) {
      return false;
    }
    if (
      this.options.get('dom').val &&
      this.options.get('dom').val !== person.animalBalance
    ) {
      return false;
    }
    if (
      this.options.get('smod').val &&
      this.options.get('smod').val !== person.sensoryMod
    ) {
      return false;
    }
    if (
      this.options.get('demod').val &&
      this.options.get('demod').val !== person.deMod
    ) {
      return false;
    }
    if (
      this.options.get('sex').val &&
      ((!person.trans && this.options.get('sex').val !== person.sex) ||
        (person.trans && this.options.get('sex').val === person.sex))
    ) {
      return false;
    }
    if (
      this.options.get('co').val === 'Class Only' &&
      (!person.tags || !person.tags.includes('Class Typing'))
    ) {
      return false;
    }
    if (
      this.options.get('hi') &&
      this.options.get('hi').val === 't' &&
      person.tags &&
      person.tags.includes('Incomplete')
    ) {
      return false;
    }
    if (
      this.options.get('hs') &&
      this.options.get('hs').val === 't' &&
      person.tags &&
      person.tags.includes('Speculation')
    ) {
      return false;
    }
    return true;
  }

  updateRoute() {
    const queryParams: Params = {
      type: null, //legacy
      name: null, //legacy
      text: this.textString,
      et: this.activeEType ? this.activeEType.name : null,
      w: this.activeWing,
      i1: this.activeInstinct ? this.activeInstinct.name : null,
      i2: this.activeInstinct2,
    };
    this.options.forEach((option) => {
      if (option.val) {
        queryParams[option.coin.param] = option.val;
      } else {
        queryParams[option.coin.param] = null;
      }
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  resetAll() {
    this.textString = null;
    this.resetEnnea();
    this.resetAllOptions();
  }

  toggleEType(eType) {
    if (this.activeEType === eType) {
      this.activeEType = null;
      this.activeWing = null;
    } else {
      this.activeEType = eType;
      this.activeWing = null;
    }
  }

  toggleInstinct(instinct) {
    if (this.activeInstinct === instinct) {
      this.activeInstinct = null;
      this.activeInstinct2 = null;
    } else {
      this.activeInstinct = instinct;
      this.activeInstinct2 = null;
    }
  }

  toggleSearchOptions(searchType: string) {
    this.searchToggles.forEach((toggle) => {
      if (toggle.name === searchType) {
        toggle.active = !toggle.active;
      }
      if (!toggle.active) {
        toggle.reset();
      }
    });
  }

  private resetEnnea() {
    this.activeEType = null;
    this.activeWing = null;
    this.activeInstinct = null;
    this.activeInstinct2 = null;
  }

  private resetAllOptions() {
    this.options.forEach((option) => {
      option.val = null;
    });
  }

}

class OptionModel {
  coin: Coin;
  val: string;
}
