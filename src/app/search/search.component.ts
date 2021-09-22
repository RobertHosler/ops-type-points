import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Coin, coinMap, coinSideMap, customCoin } from '../model/coin';
import {
  OpsDataService,
  TypeRecord,
  TypeRoot,
} from '../service/ops-data.service';

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

  functions = [
    {
      label: 'Fe',
      coins: [
        { optionKey: 'dhn', sideKey: 'tribe' },
        { optionKey: 'dl', sideKey: 'feeling' },
      ],
    },
    {
      label: 'Fi',
      coins: [
        { optionKey: 'dhn', sideKey: 'self' },
        { optionKey: 'dl', sideKey: 'feeling' },
      ],
    },
    {
      label: 'Te',
      coins: [
        { optionKey: 'dhn', sideKey: 'tribe' },
        { optionKey: 'dl', sideKey: 'thinking' },
      ],
    },
    {
      label: 'Ti',
      coins: [
        { optionKey: 'dhn', sideKey: 'self' },
        { optionKey: 'dl', sideKey: 'thinking' },
      ],
    },
  ];

  observerFunctions = [
    {
      label: 'Ne',
      coins: [
        { optionKey: 'ohn', sideKey: 'gather' },
        { optionKey: 'ol', sideKey: 'intuition' },
      ],
    },
    {
      label: 'Ni',
      coins: [
        { optionKey: 'ohn', sideKey: 'organize' },
        { optionKey: 'ol', sideKey: 'intuition' },
      ],
    },
    {
      label: 'Se',
      coins: [
        { optionKey: 'ohn', sideKey: 'gather' },
        { optionKey: 'ol', sideKey: 'sensory' },
      ],
    },
    {
      label: 'Si',
      coins: [
        { optionKey: 'ohn', sideKey: 'organize' },
        { optionKey: 'ol', sideKey: 'sensory' },
      ],
    },
  ];

  needClusters = [
    {
      label: 'ExxJ',
      coins: [
        { optionKey: 'hn1', sideKey: 'decider' },
        { optionKey: 'dhn', sideKey: 'tribe' },
      ],
    },
    {
      label: 'IxxP',
      coins: [
        { optionKey: 'hn1', sideKey: 'decider' },
        { optionKey: 'dhn', sideKey: 'self' },
      ],
    },
    {
      label: 'ExxP',
      coins: [
        { optionKey: 'hn1', sideKey: 'observer' },
        { optionKey: 'ohn', sideKey: 'gather' },
      ],
    },
    {
      label: 'IxxJ',
      coins: [
        { optionKey: 'hn1', sideKey: 'observer' },
        { optionKey: 'ohn', sideKey: 'organize' },
      ],
    },
  ];

  letterClusters = [
    {
      label: 'NF',
      coins: [
        { optionKey: 'ol', sideKey: 'intuition' },
        { optionKey: 'dl', sideKey: 'feeling' },
      ],
    },
    {
      label: 'NT',
      coins: [
        { optionKey: 'ol', sideKey: 'intuition' },
        { optionKey: 'dl', sideKey: 'thinking' },
      ],
    },
    {
      label: 'SF',
      coins: [
        { optionKey: 'ol', sideKey: 'sensory' },
        { optionKey: 'dl', sideKey: 'feeling' },
      ],
    },
    {
      label: 'ST',
      coins: [
        { optionKey: 'ol', sideKey: 'sensory' },
        { optionKey: 'dl', sideKey: 'thinking' },
      ],
    },
    // {
    //   label: 'xx',
    //   coins: [
    //     { optionKey: 'ol', sideKey: 'x' },
    //     { optionKey: 'dl', sideKey: 'x' },
    //   ],
    // },
  ];

  animalClusters = [
    {
      label: 'PB',
      coins: [
        { optionKey: 'ia', sideKey: 'blast' },
        { optionKey: 'ea', sideKey: 'play' },
        { optionKey: 'dhn', sideKey: 'tribe' },
      ],
    },
    {
      label: 'BS',
      coins: [
        { optionKey: 'ia', sideKey: 'blast' },
        { optionKey: 'ea', sideKey: 'sleep' },
        { optionKey: 'ohn', sideKey: 'organize' },
      ],
    },
    {
      label: 'CP',
      coins: [
        { optionKey: 'ia', sideKey: 'consume' },
        { optionKey: 'ea', sideKey: 'play' },
        { optionKey: 'ohn', sideKey: 'gather' },
      ],
    },
    {
      label: 'SC',
      coins: [
        { optionKey: 'ia', sideKey: 'consume' },
        { optionKey: 'ea', sideKey: 'sleep' },
        { optionKey: 'dhn', sideKey: 'self' },
      ],
    },
  ];
  firstAnimals = [
    {
      label: 'P First',
      coins: [
        { optionKey: 'ohn', sideKey: 'gather' },
        { optionKey: 'dhn', sideKey: 'tribe' },
        { optionKey: 'ea', sideKey: 'play' },
      ],
    },
    {
      label: 'B First',
      coins: [
        { optionKey: 'ohn', sideKey: 'organize' },
        { optionKey: 'dhn', sideKey: 'tribe' },
        { optionKey: 'ia', sideKey: 'blast' },
      ],
    },
    {
      label: 'S First',
      coins: [
        { optionKey: 'ohn', sideKey: 'organize' },
        { optionKey: 'dhn', sideKey: 'self' },
        { optionKey: 'ea', sideKey: 'sleep' },
      ],
    },
    {
      label: 'C First',
      coins: [
        { optionKey: 'ohn', sideKey: 'gather' },
        { optionKey: 'dhn', sideKey: 'self' },
        { optionKey: 'ia', sideKey: 'consume' },
      ],
    },
  ];
  lastAnimals = [
    {
      label: 'P Last',
      coins: [
        { optionKey: 'dom', sideKey: 'info' },
        { optionKey: 'ea', sideKey: 'sleep' },
      ],
    },
    {
      label: 'B Last',
      coins: [
        { optionKey: 'dom', sideKey: 'energy' },
        { optionKey: 'ia', sideKey: 'consume' },
      ],
    },
    {
      label: 'S Last',
      coins: [
        { optionKey: 'dom', sideKey: 'info' },
        { optionKey: 'ea', sideKey: 'play' },
      ],
    },
    {
      label: 'C Last',
      coins: [
        { optionKey: 'dom', sideKey: 'energy' },
        { optionKey: 'ia', sideKey: 'blast' },
      ],
    },
    // {
    //   label: 'X',
    //   coins: [
    //     { optionKey: 'ia', sideKey: 'x' },
    //     { optionKey: 'ea', sideKey: 'x' },
    //     { optionKey: 'dom', sideKey: 'x' },
    //   ],
    // },
  ];

  modalityClusters = [
    {
      label: 'MM',
      coins: [
        { optionKey: 'smod', sideKey: 'msensory' },
        { optionKey: 'demod', sideKey: 'mde' },
      ],
    },
    {
      label: 'MF',
      coins: [
        { optionKey: 'smod', sideKey: 'msensory' },
        { optionKey: 'demod', sideKey: 'fde' },
      ],
    },
    {
      label: 'FF',
      coins: [
        { optionKey: 'smod', sideKey: 'fsensory' },
        { optionKey: 'demod', sideKey: 'fde' },
      ],
    },
    {
      label: 'FM',
      coins: [
        { optionKey: 'smod', sideKey: 'fsensory' },
        { optionKey: 'demod', sideKey: 'mde' },
      ],
    },
    // {
    //   label: 'xx',
    //   coins: [
    //     { optionKey: 'smod', sideKey: 'x' },
    //     { optionKey: 'demod', sideKey: 'x' },
    //   ],
    // },
  ];

  clusters = [
    {
      name: 'Need',
      cluster: this.needClusters,
    },
    {
      name: 'Decider Functions',
      cluster: this.functions,
    },
    {
      name: 'Observer Functions',
      cluster: this.observerFunctions,
    },
    {
      name: 'Letters',
      cluster: this.letterClusters,
    },
    {
      name: 'Animals',
      cluster: this.animalClusters,
    },
    {
      name: 'First Animal',
      cluster: this.firstAnimals,
    },
    {
      name: 'Last Animal',
      cluster: this.lastAnimals,
    },
    {
      name: 'Modalities',
      cluster: this.modalityClusters,
    },
  ];

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
    coins.forEach((coin) => {
      this.setSide(coin.optionKey, coin.sideKey);
    });
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
