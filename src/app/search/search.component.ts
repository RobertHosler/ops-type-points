import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Coin, coinMap, coinSideMap } from '../model/coin';
import {
  OpsDataService,
  TypedPerson,
  TypeRecord,
  TypeRoot,
} from '../service/ops-data.service';
import { searchModel } from './search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  nameString: string;
  typeString: string;

  displayedRecords: TypedPerson[];
  maxRecords = 10000;

  isMaxRecords = false;

  searchType = 'coins';

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

  allNames: Map<string, TypedPerson>;

  routerInit = false;

  constructor(
    private opsDataService: OpsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.opsDataService.allNames.subscribe((result) => {
      this.allNames = result;
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
        this.searchType = 'name';
        this.onSubmitName(null);
      } else if (params.get('type')) {
        this.typeString = params.get('type');
        this.searchType = 'type';
        this.onSubmitType(null);
      } else {
        this.searchType = 'coins';
        this.options.forEach((option) => {
          option.val = params.get(option.coin.param)
            ? params.get(option.coin.param)
            : '';
        });
        this.searchCoins();
      }
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

  onSubmitName(form: NgForm) {
    if (this.searchLoading || !this.nameString) {
      return;
    }
    this.searchLoading = true;
    this.displayedRecords = [];
    setTimeout(() => {
      this.allNames.forEach((value, key) => {
        if (value.name.toLowerCase().includes(this.nameString.toLowerCase())) {
          this.displayedRecords.push(value);
        }
      });
      this.searchLoading = false;
    }, 200);
    const queryParams: Params = {
      name: this.nameString,
      type: null,
    };
    this.options.forEach((option) => {
      queryParams[option.coin.param] = null;
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onSubmitType(form: NgForm) {
    if (this.searchLoading || !this.typeString) {
      return;
    }
    this.searchLoading = true;
    this.displayedRecords = [];
    setTimeout(() => {
      this.allNames.forEach((value, key) => {
        if (
          value.type &&
          value.type.toLowerCase().includes(this.typeString.toLowerCase())
        ) {
          this.displayedRecords.push(value);
        }
      });
      this.searchLoading = false;
    }, 200);
    const queryParams: Params = {
      name: null,
      type: this.typeString,
    };
    this.options.forEach((option) => {
      queryParams[option.coin.param] = null;
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onSubmitClusters(form: NgForm) {
    this.searchCoins();
  }

  searchCoins() {
    if (this.searchLoading) {
      return;
    }
    this.searchLoading = true;
    this.displayedRecords = [];
    setTimeout(() => {
      this.allNames.forEach((value, key) => {
        if (
          this.options.get('hn1').val &&
          this.options.get('hn1').val !== value.coreNeed
        ) {
          return;
        }
        if (
          this.options.get('dhn').val &&
          this.options.get('dhn').val !== value.deciderNeed
        ) {
          return;
        }
        if (
          this.options.get('ohn').val &&
          this.options.get('ohn').val !== value.observerNeed
        ) {
          return;
        }
        if (
          this.options.get('ol').val &&
          this.options.get('ol').val !== value.observerLetter
        ) {
          return;
        }
        if (
          this.options.get('dl').val &&
          this.options.get('dl').val !== value.deciderLetter
        ) {
          return;
        }
        if (
          this.options.get('ia').val &&
          this.options.get('ia').val !== value.infoAnimal
        ) {
          return;
        }
        if (
          this.options.get('ea').val &&
          this.options.get('ea').val !== value.energyAnimal
        ) {
          return;
        }
        if (
          this.options.get('dom').val &&
          this.options.get('dom').val !== value.animalBalance
        ) {
          return;
        }
        if (
          this.options.get('smod').val &&
          this.options.get('smod').val !== value.sensoryMod
        ) {
          return;
        }
        if (
          this.options.get('demod').val &&
          this.options.get('demod').val !== value.deMod
        ) {
          return;
        }
        if (
          this.options.get('sex').val &&
          ((!value.trans && this.options.get('sex').val !== value.sex) ||
            (value.trans && this.options.get('sex').val === value.sex))
        ) {
          return;
        }
        if (
          this.options.get('co').val === 'Class Only' &&
          (!value.tags ||
          !value.tags.includes('Class Typing'))
        ) {
          return;
        }
        if (
          this.options.get('hi') &&
          this.options.get('hi').val === 't' &&
          (value.tags &&
          value.tags.includes('Incomplete'))
        ) {
          return;
        }
        if (
          this.options.get('hs') &&
          this.options.get('hs').val === 't' &&
          (value.tags &&
          value.tags.includes('Speculation'))
        ) {
          return;
        }
        this.displayedRecords.push(value);
      });
      this.searchLoading = false;
    }, 200);
    const queryParams: Params = {
      name: null,
      type: null,
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

  resetCoins() {
    this.options.forEach((option) => {
      option.val = '';
    });
  }
}
