import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { coinMap, coinSideMap } from '../model/coin';
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

  sexLabel = 'Sex';
  classLabel = 'Class';

  //Needs
  hn1Key = 'Core Need';
  dhnKey = 'Decider Need';
  ohnKey = 'Observer Need';
  //Letters
  olKey = 'Observer Letter';
  dlKey = 'Decider Letter';
  //Animals
  eaKey = 'Energy Animal';
  iaKey = 'Info Animal';
  domKey = 'Info Energy Dominance';
  //Modalities
  smodKey = 'Sensory Modality';
  demodKey = 'De Modality';

  sexKey = 'Sex';
  classKey = 'Class';

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
    {
      label: 'xx',
      coins: [
        { optionKey: 'ol', sideKey: 'x' },
        { optionKey: 'dl', sideKey: 'x' },
      ],
    },
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
    {
      label: 'Px/x(x)',
      coins: [
        { optionKey: 'ohn', sideKey: 'gather' },
        { optionKey: 'dhn', sideKey: 'tribe' },
        { optionKey: 'ea', sideKey: 'play' },
      ],
    },
    {
      label: 'Bx/x(x)',
      coins: [
        { optionKey: 'ohn', sideKey: 'organize' },
        { optionKey: 'dhn', sideKey: 'tribe' },
        { optionKey: 'ia', sideKey: 'blast' },
      ],
    },
    {
      label: 'Sx/x(x)',
      coins: [
        { optionKey: 'ohn', sideKey: 'organize' },
        { optionKey: 'dhn', sideKey: 'self' },
        { optionKey: 'ea', sideKey: 'sleep' },
      ],
    },
    {
      label: 'Cx/x(x)',
      coins: [
        { optionKey: 'ohn', sideKey: 'gather' },
        { optionKey: 'dhn', sideKey: 'self' },
        { optionKey: 'ia', sideKey: 'consume' },
      ],
    },
    {
      label: 'xx/x(P)',
      coins: [
        { optionKey: 'dom', sideKey: 'info' },
        { optionKey: 'ea', sideKey: 'sleep' },
      ],
    },
    {
      label: 'xx/x(B)',
      coins: [
        { optionKey: 'dom', sideKey: 'energy' },
        { optionKey: 'ia', sideKey: 'consume' },
      ],
    },
    {
      label: 'xx/x(S)',
      coins: [
        { optionKey: 'dom', sideKey: 'info' },
        { optionKey: 'ea', sideKey: 'play' },
      ],
    },
    {
      label: 'xx/x(C)',
      coins: [
        { optionKey: 'dom', sideKey: 'energy' },
        { optionKey: 'ia', sideKey: 'blast' },
      ],
    },
    {
      label: 'X',
      coins: [
        { optionKey: 'ia', sideKey: 'x' },
        { optionKey: 'ea', sideKey: 'x' },
        { optionKey: 'dom', sideKey: 'x' },
      ],
    },
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
    {
      label: 'xx',
      coins: [
        { optionKey: 'smod', sideKey: 'x' },
        { optionKey: 'demod', sideKey: 'x' },
      ],
    },
  ];

  clusters = [
    {
      name: 'Need',
      cluster: this.needClusters,
    },
    {
      name: 'Functions',
      cluster: this.functions,
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
        this.sexLabel = params.get('sex') ? params.get('sex') : 'Sex';
        this.classLabel = params.get('co') ? params.get('co') : 'Class';
        this.searchCoins();
      }
    });
  }

  private initOptions() {
    Array.from(coinMap.values()).forEach((coin) => {
      this.options.set(coin.param, { coin: coin, val: '' });
    });
    this.optionValues = Array.from(this.options.values());
  }

  isSide(optionKey: string, sideKey: string) {
      return this.options.get(optionKey).val === (coinSideMap.get(sideKey) ? coinSideMap.get(sideKey).val : '');
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
      hn1: null,
      ohn: null,
      dhn: null,
      ol: null,
      dl: null,
      ia: null,
      ea: null,
      dom: null,
      smod: null,
      demod: null,
      sex: null,
      co: null,
    };
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
      hn1: null,
      ohn: null,
      dhn: null,
      ol: null,
      dl: null,
      ia: null,
      ea: null,
      dom: null,
      smod: null,
      demod: null,
      sex: null,
      co: null,
    };
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
        this.sexLabel === 'Sex' ? null : this.sexLabel
      )
      .subscribe((result: TypeRoot) => {
        if (this.classLabel === 'Class Only') {
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
      hn1: this.options.get('hn1').val ? this.options.get('hn1').val : null,
      ohn: this.options.get('ohn').val ? this.options.get('ohn').val : null,
      dhn: this.options.get('dhn').val ? this.options.get('dhn').val : null,
      ol: this.options.get('ol').val ? this.options.get('ol').val : null,
      dl: this.options.get('dl').val ? this.options.get('dl').val : null,
      ia: this.options.get('ia').val ? this.options.get('ia').val : null,
      ea: this.options.get('ea').val ? this.options.get('ea').val : null,
      dom: this.options.get('dom').val ? this.options.get('dom').val : null,
      smod: this.options.get('smod').val ? this.options.get('smod').val : null,
      demod: this.options.get('demod').val
        ? this.options.get('demod').val
        : null,
      sex: this.sexLabel !== 'Sex' ? this.sexLabel : null,
      co: this.sexLabel !== 'Class' ? this.classLabel : null,
    };
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
    //Other
    this.sexLabel = 'Sex';
    this.classLabel = 'Class';
  }

  sex() {
    if (this.sexLabel === 'Sex') {
      this.sexLabel = 'Male';
    } else if (this.sexLabel === 'Male') {
      this.sexLabel = 'Female';
    } else {
      this.sexLabel = 'Sex';
    }
  }

  class() {
    if (this.classLabel === 'Class') {
      this.classLabel = 'Class Only';
    } else {
      this.classLabel = 'Class';
    }
  }
}
