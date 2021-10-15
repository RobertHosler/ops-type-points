import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Coin, coinMap, coinSideMap } from '../model/coin';
import {
  OpsDataService,
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

  displayedRecords: TypeRecord[];
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

  constructor(
    private opsDataService: OpsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initOptions();
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
    this.options.set('co', {
      coin: classCoin,
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
    this.searchLoading = true;
    this.opsDataService
      .getName(this.maxRecords, this.nameString)
      .subscribe((result: TypeRoot) => {
        this.displayedRecords = result.records;
        this.isMaxRecords = result.records.length >= this.maxRecords;
        this.searchLoading = false;
      });
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
    this.searchLoading = true;
    this.opsDataService
      .getType(this.maxRecords, this.typeString)
      .subscribe((result: TypeRoot) => {
        this.displayedRecords = result.records;
        this.isMaxRecords = result.records.length >= this.maxRecords;
        this.searchLoading = false;
      });
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
    this.searchLoading = true;
    this.opsDataService
      .getCoins(
        this.maxRecords,
        this.options.get('hn1').val,
        this.options.get('ohn').val,
        this.options.get('dhn').val,
        this.options.get('ol').val,
        this.options.get('dl').val,
        this.options.get('ia').val,
        this.options.get('ea').val,
        this.options.get('dom').val,
        this.options.get('smod').val,
        this.options.get('demod').val,
        this.options.get('sex').val
      )
      .subscribe((result: TypeRoot) => {
        if (this.options.get('co').val === 'Class Only') {
          this.displayedRecords = [];
          result.records.forEach((record) => {
            if (
              record.fields.Tags &&
              record.fields.Tags.includes('Class Typing')
            ) {
              this.displayedRecords.push(record);
            }
          });
        } else {
          this.displayedRecords = result.records;
        }
        this.searchLoading = false;
      });
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
