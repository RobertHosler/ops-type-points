import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Coin, coinMap, coinSideMap } from '../model/coin';
import { appLinks } from '../model/links';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';
import { searchModel } from './search.model';

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

  nameString: string;
  typeString: string;
  activeEType;
  activeWing;
  activeInstinct;
  activeInstinct2;

  displayedRecords: TypedPerson[];
  maxRecords = 10000;

  isMaxRecords = false;

  searchType = 'Coins';
  searchTypes = ['Coins', 'Name', 'Type', 'Enneagram'];

  searchLoading = false;

  options = new Map(); //ESMap<string, { val: string; coin: Coin }>;
  optionValues;

  functions = searchModel.functions;
  observerFunctions = searchModel.observerFunctions;
  needClusters = searchModel.needClusters;
  letterClusters = searchModel.letterClusters;
  animalClusters = searchModel.animalClusters;
  modalityClusters = searchModel.modalityClusters;
  clusters = searchModel.clusters;
  eTypes = searchModel.eTypes;
  instincts = searchModel.instincts;

  allNames: Map<string, TypedPerson>;

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
      this.allNames.forEach((record) => {
        this.allNamesArr.push(record.name);
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
      if (params.get('name')) {
        this.nameString = params.get('name');
        this.searchType = 'Name';
      } else if (params.get('type')) {
        this.typeString = params.get('type');
        this.searchType = 'Type';
      } else if (params.get('et') || params.get('i1')) {
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
        this.searchType = 'Enneagram';
      } else {
        this.searchType = 'Coins';
        this.options.forEach((option) => {
          option.val = params.get(option.coin.param)
            ? params.get(option.coin.param)
            : '';
        });
      }
      this.searchAll();
    });
  }

  private initOptions() {
    Array.from(coinMap.values()).forEach((coin) => {
      this.options.set(coin.param, { coin: coin, val: '' });
    });
    // this.options.set('coin', {
    //   coin: customCoin,
    //   val: '',
    // });
    const sexCoin: Coin = {
      name: 'Sex',
      param: 'sex',
      sides: [
        {
          name: 'Male',
          val: 'Male',
        },
        {
          name: 'Female',
          val: 'Female',
        },
      ],
    };
    this.options.set('sex', {
      coin: sexCoin,
      val: '',
    });
    const classCoin: Coin = {
      name: 'Class',
      param: 'co',
      sides: [
        {
          name: 'Class Only',
          val: 'Class Only',
        },
      ],
    };
    const incompleteCoin: Coin = {
      name: 'Incomplete',
      param: 'hi',
      sides: [
        {
          name: 'Hide Incomplete',
          val: 't',
        },
      ],
    };
    const speculationCoin: Coin = {
      name: 'Speculation',
      param: 'hs',
      sides: [
        {
          name: 'Hide Speculation',
          val: 't',
        },
      ],
    };
    this.options.set('co', {
      coin: classCoin,
      val: '',
    });
    this.options.set('hi', {
      coin: incompleteCoin,
      val: '',
    });
    this.options.set('hs', {
      coin: speculationCoin,
      val: '',
    });
    this.optionValues = Array.from(this.options.values());
  }

  isSide(optionKey: string, sideKey: string) {
    return (
      this.options.get(optionKey).val ===
      (coinSideMap.get(sideKey) ? coinSideMap.get(sideKey).val : '')
    );
  }

  isCoins(coins: { optionKey: string; sideKey: string }[]) {
    let result = true;
    coins.forEach((coin) => {
      if (result) {
        result = this.isSide(coin.optionKey, coin.sideKey);
      }
    });
    return result;
  }

  setSide(optionKey: string, sideKey: string) {
    this.options.get(optionKey).val = coinSideMap.get(sideKey)
      ? coinSideMap.get(sideKey).val
      : '';
  }

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

  searchAll() {
    if (this.searchLoading) {
      return;
    }
    this.searchLoading = true;
    this.displayedRecords = [];
    setTimeout(() => {
      this.searchNames();
      this.searchLoading = false;
    }, 1500);
    this.updateRoute();
  }

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
        !this.matchCoins(person) ||
        !this.matchName(person) ||
        !this.matchType(person) ||
        !this.matchEnnea(person)
      ) {
        return;
      }
      this.displayedRecords.push(person);
    });
  }

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

  private matchName(person: TypedPerson): boolean {
    return (
      !this.nameString ||
      person.name.toLowerCase().includes(this.nameString.toLowerCase())
    );
  }

  private matchType(person: TypedPerson): boolean {
    return (
      !this.typeString ||
      (person.type &&
        person.type.toLowerCase().includes(this.typeString.toLowerCase())) ||
      (person.fullEType &&
        person.fullEType.toLowerCase().includes(this.typeString.toLowerCase()))
    );
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

  resetCoins() {
    this.options.forEach((option) => {
      option.val = '';
    });
  }

  updateRoute() {
    const queryParams: Params = {
      name: this.nameString,
      type: this.typeString,
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
    this.nameString = null;
    this.typeString = null;
    this.activeEType = null;
    this.activeWing = null;
    this.activeInstinct = null;
    this.activeInstinct2 = null;
    this.options.forEach((option) => {
      option.val = null;
    });
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

  scrollToList() {
    if (!this.initialLoad) {
      setTimeout(() => {
        let top = this.recordList.nativeElement.offsetTop;
        window.scrollTo(0, top - 56);
      });
    } else {
      this.initialLoad = false;
    }
  }
}
