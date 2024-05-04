import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Coin, coinMap, coinSideMap, extraCoins } from '../model/coin';
import { appLinks } from '../model/links';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';
import { ETypeModel, InstinctModel, searchModel } from './search.model';
import { ShowTypes } from '../type-record-item/type-record-item.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  enneagrammerLink = appLinks.enneagrammerDb;
  enneagrammerPinterest = appLinks.enneagrammerPinterest;
  opsDbInfo = appLinks.opsDbInfo;
  opsDbSource = appLinks.opsDbSource;
  appLinks = appLinks;

  textString: string;
  previousTextString: string;
  activeEType: ETypeModel;
  activeWing: string;
  activeInstinct: InstinctModel;
  activeInstinct2: string;

  displayedRecords: TypedPerson[] = [];
  maxRecords = 10000;

  isMaxRecords = false;

  placeholderText =
    'Try "fese", "enfj", "lii", "sosp 9", "s4" or New AP terms like: "velf", "dio", or "3v"';

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

  searchLoading = false;
  searchInitiated = false;
  searchRequests = 0;

  options = new Map<string, OptionModel>();
  optionValues: OptionModel[];

  clusters = searchModel.clusters;
  eTypes = searchModel.eTypes;
  instincts = searchModel.instincts;
  typeOnlyStrings = searchModel.typeOnlyStrings;
  searchModel = searchModel;

  allNames: Map<string, TypedPerson>;
  recordCount = 0;

  showTypes: ShowTypes = {
    ops: true,
    wss: true,
    ennea: true,
    ap: true
  };

  allNamesArr: string[];
  allNamesArrUnsorted: string[];
  sortBy = 'ops';
  sortInvert = false;
  searchSort = [];

  routerInit = false;

  @ViewChild('opsHeader') opsHeader: ElementRef;
  @ViewChild('enneaHeader') enneaHeader: ElementRef;
  @ViewChild('wssHeader') wssHeader: ElementRef;
  @ViewChild('apHeader') apHeader: ElementRef;

  @ViewChild('recordList') recordList: ElementRef;
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('container') private container: ElementRef;

  initialLoad = true;
  ignoreRouteUpdate = false;

  searchTerms = [];
  searches = new Map();

  grayscale = false;
  cards = false;
  showControls = false;
  showSort = false;
  showDisplay = false;
  showHelp = false;
  showPrevious = false;
  showSources = false;

  subscription: Subscription;

  constructor(
    private opsDataService: OpsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.time('allNames-search');
    this.subscription = this.opsDataService.allNames.subscribe((result) => {
      console.timeEnd('allNames-search');
      this.allNames = result;
      this.allNamesArr = [];
      this.recordCount = 0;
      this.allNames.forEach((record, key) => {
        this.allNamesArr.push(key);
        this.recordCount++;
      });
      this.allNamesArrUnsorted = this.allNamesArr.slice();
      this.allNamesArr.sort();
      if (!this.routerInit) {
        this.initRouter();
        this.routerInit = true;
      }
    });
  }

  ngOnInit(): void {
    this.initOptions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initRouter() {
    this.route.queryParamMap.subscribe((params) => {
      let newTextString = params.get('text');
      if (!newTextString) {
        newTextString = params.get('type');
      }
      if (!newTextString) {
        newTextString = params.get('name');
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

      const searchCallback = () => {
        const showString = params.get('show');
        if (showString) {
          this.showTypes.ops = showString.includes('ops');
          this.showTypes.wss = showString.includes('wss');
          this.showTypes.ennea = showString.includes('ennea');
          this.showTypes.ap = showString.includes('ap');
          this.updateRoute();
        }
      };

      if (newTextString !== this.textString) {
        this.textString = newTextString;
        if (!newTextString) {
          this.searchInitiated = false;
          this.initialLoad = false;
        } else {
          this.searchAll(searchCallback);
        }
      }
      
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

  resort(newSort?: string) {
    let sort = true;
    if (newSort) {
      if (newSort === this.sortBy) {
        sort = false;
      }
      this.sortBy = newSort;
    }
    if (sort) {
      this.displayedRecords.sort((a, b) => {
        let result = 0;
        if (this.sortBy === 'created') {
          result = this.sortModified(a.created, b.created);
        } else if (this.sortBy === 'modified') {
          result = this.sortModified(a.lastModified, b.lastModified);
        } else if (this.sortBy === 'name') {
          result = this.sortName(a, b);
        } else if (this.sortBy === 'ennea') {
          result = this.sortEType(a, b);
          if (result === 0) {
            result = this.sortOpsType(a, b);
          }
          if (result === 0) {
            result = this.sortName(a, b);
          }
        } else if (this.sortBy === 'wss') {
          result = this.sortWssType(a, b);
          if (result === 0) {
            result = this.sortName(a, b);
          }
        } else if (this.sortBy === 'ap') {
          result = this.sortApType(a, b);
          if (result === 0) {
            result = this.sortName(a, b);
          }
        } else {
          result = this.sortOpsType(a, b);
          if (result === 0) {
            result = this.sortEType(a, b);  
          }
          if (result === 0) {
            result = this.sortName(a, b);
          }
        }
        if (this.sortInvert) {
          return result * -1;
        } else {
          return result;
        }
      });
      this.displayedRecords = this.displayedRecords.splice(0);
    }
  }

  private sortModified(a: string, b: string) {
    if (!a && !b) {
      return 0;
    }
    if (a && !b) {
      return 1;
    }
    if (b && !a) {
      return -1;
    }
    return Date.parse(b) - Date.parse(a);
  }

  private sortName(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  }

  private sortOpsType(a: TypedPerson, b: TypedPerson) {
    if (a.type && (!b.type || b.type.length !== 16)) {
      return -1;
    } else if ((!a.type || a.type.length !== 16) && b.type) {
      return 1;
    } else if (
      a.type &&
      b.type &&
      a.type.length === 16 &&
      b.type.length === 16
    ) {
      if (a.s1 > b.s1) {
        return -1;
      }
      if (a.s1 < b.s1) {
        return 1;
      }
      if (a.s2 > b.s2) {
        return -1;
      }
      if (a.s2 < b.s2) {
        return 1;
      }
      if (a.animals > b.animals) {
        return -1;
      }
      if (a.animals < b.animals) {
        return 1;
      }
      if (a.mod > b.mod) {
        return -1;
      }
      if (a.mod < b.mod) {
        return 1;
      }
    }
    return 0;
  }

  private sortEType(a: TypedPerson, b: TypedPerson) {
    if (a.coreEType && !b.coreEType) {
      return -1;
    } else if (!a.coreEType && b.coreEType) {
      return 1;
    } else if (a.coreEType && b.coreEType) {
      if (parseInt(a.coreEType) > parseInt(b.coreEType)) {
        return 1;
      }
      if (parseInt(a.coreEType) < parseInt(b.coreEType)) {
        return -1;
      }
      if (a.wing && b.wing) {
        if (parseInt(a.wing) > parseInt(b.wing)) {
          return 1;
        }
        if (parseInt(a.wing) < parseInt(b.wing)) {
          return -1;
        }
        if (a.instinct && b.instinct) {
          if (a.instinct < b.instinct) {
            return 1;
          }
          if (a.instinct > b.instinct) {
            return -1;
          }
        }
      }
    }
    return 0;
  }

  private sortWssType(a: TypedPerson, b: TypedPerson) {
    // console.log(a.wssType, b.wssType);
    if (a.wssType && !b.wssType) {
      return -1;
    } else if (!a.wssType && b.wssType) {
      return 1;
    } else if (a.wssType && b.wssType) {
      const aIndex = searchModel.socionicsTypes.indexOf(a.wssType.toLowerCase());
      const bIndex = searchModel.socionicsTypes.indexOf(b.wssType.toLowerCase());
      console.log(a.wssType, aIndex, b.wssType, bIndex, aIndex - bIndex);
      if (aIndex !== bIndex) {
        return aIndex - bIndex > 0 ? 1 : -1;
      }
    }
    return 0;
  }

  private sortApType(a: TypedPerson, b: TypedPerson) {
    if (a.apType && !b.apType) {
      return -1;
    } else if (!a.apType && b.apType) {
      return 1;
    } else if (a.apType && b.apType) {
      const local = a.apType.localeCompare(b.apType);
      if (local === 0) {
        if (a.apSubtype && !b.apSubtype) {
          return -1;
        } else if (!a.apSubtype && b.apSubtype) {
          return 1;
        } else if (a.apSubtype && b.apSubtype) {
          return a.apSubtype.localeCompare(b.apSubtype);
        }
      } else {
        return local;
      }
    }
    return 0;
  }

  /**
   * Initiate search for all possible options.
   */
  searchAll(callback?) {
    // console.time('search');
    // initiate search
    this.searchRequests++;
    setTimeout(() => {
      // console.log(this.searchRequests);
      if (this.searchRequests === 1) {
        this.searchInitiated = true;
        if (
          !this.textString ||
          this.previousTextString === this.textString.trim()
        ) {
          this.searchRequests--;
          return;
        } else {
          this.previousTextString = this.textString
            ? this.textString.trim()
            : null;
        }
        this.sortBy = 'name';
        this.showTypes = {
          ops: false,
          ennea: false,
          wss: false,
          ap: false
        };
        this.displayedRecords = [];
        this.searchSort = [];
        this.searchNames();
        this.resort();
        if (!this.showTypes.ops && !this.showTypes.ennea && !this.showTypes.wss && !this.showTypes.ap) {
          this.showTypes.ops = true;
          this.showTypes.ennea = true;
          this.showTypes.wss = true;
          this.showTypes.ap = true;
        }
        this.updateRoute();
        if (this.initialLoad) {
          this.initialLoad = false;
        }
        this.ignoreRouteUpdate = true;
      }
      this.searchRequests--;
      if (callback) {
        callback();
      }
      // console.timeEnd('search');
    }, this.initialLoad ? 0 : 500);
  }

  /**
   * For each name, see if the person matches the selected criteria.
   */
  private searchNames() {
    this.searchTerms = [];
    this.allNamesArrUnsorted.forEach((name: string) => {
      let person = this.allNames.get(name);
      if (!this.matchText(person)) {
        return;
      }
      this.displayedRecords.push(person);
    });
    if (
      this.displayedRecords.length > 0 &&
      this.textString &&
      this.textString.length > 0 &&
      !this.searches.get(this.textString.trim().toLowerCase())
    ) {
      this.searches.set(this.textString.trim().toLowerCase(), {
        term: this.textString.trim(),
        count: this.displayedRecords.length,
      });
    }
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
  private matchText(person: TypedPerson, text?: string): boolean {
    if (!this.textString) {
      return true;
    }
    let strings = text ? text.toLowerCase().split(' ') : this.textString.toLowerCase().split(' ');
    let result = true;
    strings.forEach((string) => {
      if (result) {
        let s = string.toLowerCase();
        if (s === 'all') {
          this.sortBy = 'created';
          this.showTypes.ops = true;
          this.showTypes.ennea = true;
          this.showTypes.wss = true;
          this.showTypes.ap = true;
          result = true;
          return;
        } else if (s === 'new' || s === 'create' || s === 'created') {
          this.sortBy = 'created';
          this.showTypes.create = true;
          // result = true;
          return;
        } else if (s === 'modified' || s === 'modify' || s === 'recent') {
          this.sortBy = 'modified';
          this.showTypes.modify = true;
          // result = true;
          return;
        } else if (s.includes('|') ) {
          // Or Search
          let sArr = s.split('|');
          let found = false;
          for (let i = 0; i !== sArr.length; i++) {
            if (sArr[i].length > 0) {
              found = this.matchText(person, sArr[i]);
              if (found) {
                break;
              }
            }
          }
          result = found;
        } else if (s.startsWith('*')) {
          // Trifix (any order) Search
          s = s.substring(1);
          if (s.length < 4 && /^\d+$/.test(s)) {
            this.searchTerms.push(s);
            let sArr = s.split('');
            let found = true;
            for (let i = 0; i !== sArr.length; i++) {
              if (!person.trifix?.includes(sArr[i])) {
                found = false;
                break;
              }
            }
            result = found;
            if (result) {
              this.sortBy = 'ennea';
              this.showTypes.ennea = true;
            }
          } else {
            result = false;
          }
        } else if (/\(\d+/.test(s)) {
          // Overlay Search - starts with '(' and contains numbers
          s = s.substring(1);
          if (s.endsWith(')')) {
            s = s.substring(0, s.length -1);
          }
          if (person.fullTrifix && person.fullTrifix.length === 11) {
            let overlay = person.fullTrifix.charAt(2) + person.fullTrifix.charAt(6) + person.fullTrifix.charAt(10);
            let sArr = s.split('');
            result = true;
            for (let i = 0; i !== sArr.length; i++) {
              if (!overlay.includes(sArr[i])) {
                result = false;
                break;
              }
            }
            if (result) {
              this.sortBy = 'ennea';
              this.showTypes.ennea = true;
            }
          } else {
            result = false;
          }
        } else if (s.startsWith('!')) {
          // inverse matching
          s = s.substring(1);
          this.searchTerms.push(s);
          result = !this.matchTextParts(person, s);
        } else {
          this.searchTerms.push(s);
          result = this.matchTextParts(person, s);
        }
      }
    });
    return result;
  }

  private matchTextParts(person: TypedPerson, s: string) {

    // if the string partially matches one of these terms, search as if the whole term was entered
    searchModel.predictions.forEach((prediction) => {
      if (s.length > prediction.count && prediction.term.startsWith(s)) {
        s = prediction.term;
      }
    });

    if (s === 'image') {
      if (person.pictureUrl) {
        return true;
      } else {
        return false;
      }
    }

    let term = searchModel.comboTerms.get(s);
    if (term) {
      // is combo term
      let result = false;
      let firstEl = term.strings[0];
      if (Array.isArray(firstEl)) {
        // array of arrays - for each array - determine if successful
        // all arrays must pass
        let arrayResults = false;
        if (Array.isArray(firstEl[0])) {
          // array of arrays of arrays
          term.strings.forEach((arr: string[][]) => {
            if (!arrayResults) {
              arrayResults = this.matchArray(arr, person);
            }
          });
        } else {
          let options = term.strings;
          arrayResults = this.matchArray(options, person);
        }
        result = arrayResults;
      } else {
        term.strings.forEach((subS: string) => {
          if (!result) {
            result = this.matchTextPartsDecoded(person, subS);
          }
        });
      }
      if (result) {
        this.sortBy = 'ops';
        this.showTypes.ops = true;
      }
      return result;
    } else if (searchModel.enneaTerms.get(s)) {
      // is enneagram term
      let result = false;
      searchModel.enneaTerms.get(s).strings.forEach((subS: string) => {
        if (!result) {
          result = this.matchTextPartsDecoded(person, subS);
        }
      });
      if (result) {
        this.resort('ennea');
      }
      return result;
    } else if (searchModel.apTerms.get(s)) {
      // is AP term
      let result = false;
      searchModel.apTerms.get(s).strings.forEach((subS: string) => {
        if (!result) {
          result = this.matchTextPartsDecoded(person, subS.toLowerCase());
        }
      });
      if (result) {
        this.sortBy = 'ap';
        this.resort('ap');
      }
      return result;
    } else {
      return this.matchTextPartsDecoded(person, s);
    }
  }

  // private processSubS(subS: string) {
  //   // search until any match is found
  //   if (!arrResult) {
  //     arrResult = this.matchTextPartsDecoded(person, subS);
  //   }
  // }

  // private processArr(arr: string[], arrayResults: boolean, arr) {
  //   if (arrayResults) {
  //     arrResult = false;
  //     arr.forEach(this.processSubS);
  //     // if arrayResults indicate success - update to potential non-success
  //     arrayResults = arrResult;
  //   }
  // }

  private matchArray(options: string[][], person: TypedPerson) {
    let arrResult = false;
    let arrayResults = true;
    options.forEach((arr: string[]) => {
      if (arrayResults) {
        arrResult = false;
        arr.forEach((comboS: string) => {
          if (!arrResult) {
            arrResult = this.matchTextPartsDecoded(person, comboS);
          }
        });
        // if arrayResults indicate success - update to potential non-success
        arrayResults = arrResult;
      }
    });
    return arrayResults;
  }

  private matchTextPartsDecoded(person: TypedPerson, s: string) {
    let result = true;
    if (searchModel.personTerms.get(s)) {
      if (!searchModel.personTerms.get(s).match(person)) {
        result = false;
      } else {
        this.sortBy = 'ops';
        this.showTypes.ops = true;
      }
    } else if (searchModel.enneaMatchTerms.get(s)) {
        if (!searchModel.enneaMatchTerms.get(s).match(person)) {
          result = false;
        } else {
          this.sortBy = 'ennea';
          this.showTypes.ennea = true;
        }
      } else if (searchModel.socionicsTerms.get(s)) {
        if (!searchModel.socionicsTerms.get(s).match(person)) {
          result = false;
        } else {
          this.sortBy = 'wss';
          this.showTypes.wss = true;
        }
    } else if (searchModel.apMatchTerms.get(s)) {
        if (!searchModel.apMatchTerms.get(s).match(person)) {
          result = false;
        } else {
          this.sortBy = '';
          this.showTypes.ap = true;
        }
    } else if (searchModel.sexTerms.get(s)) {
      if (!searchModel.sexTerms.get(s).match(person)) {
        result = false;
      }
    } else if (searchModel.tagTerms.get(s)) {
      if (!person.tags) {
        result = false;
      } else {
        result = false;
        person.tags.forEach((tag) => {
          if (!result && tag.toLowerCase().includes(s)) {
            result = true;
            const term = searchModel.tagTerms.get(s);
            if (term.sortBy) {
              this.sortBy = term.sortBy;
              if (term.sortBy === 'ennea') {
                this.showTypes.ennea = true;
              } else if (term.sortBy === 'ops') {
                this.showTypes.ops = true;
              } else if (term.sortBy === 'wss') {
                this.showTypes.wss = true;
              } else if (term.sortBy === 'ap') {
                this.showTypes.ap = true;
              }
            }
          }
        });
      }
    } else if (this.typeOnlyStrings.includes(s)) {
      // fe, mm, sb, etc
      if (!person.type || !person.type.toLowerCase().includes(s)) {
        result = false;
      } else {
        this.sortBy = 'ops';
        this.showTypes.ops = true;
      }
    } else if (searchModel.coreETypeStrings.includes(s)) {
      // 3, 4, etc
      if (!person.coreEType || !person.coreEType.toLowerCase().includes(s)) {
        result = false;
      } else {
        this.sortBy = 'ennea';
        this.showTypes.ennea = true;
      }
    } else if (searchModel.coreETypeLong.includes(s)) {
      // three, four, etc
      if (
        !person.coreETypeLong ||
        !person.coreETypeLong.toLowerCase().includes(s)
      ) {
        result = false;
      } else {
        this.sortBy = 'ennea';
        this.showTypes.ennea = true;
      }
    } else if (searchModel.eTypeStrings.includes(s)) {
      // 9w1, 6w7, etc
      if (!person.eType || !person.eType.toLowerCase().includes(s)) {
        result = false;
      } else {
        this.sortBy = 'ennea';
        this.showTypes.ennea = true;
      }
    } else if (searchModel.trifixStrings.includes(s)) {
      // 936, 541, etc
      if (person.trifix !== s) {
        result = false;
      } else {
        this.sortBy = 'ennea';
        this.showTypes.ennea = true;
      }
    } else if (searchModel.socionicsTypes.includes(s)) {
      if (!person.wssType || person.wssType.toLowerCase() !== s) {
        result = false;
      } else {
        this.sortBy = 'wss';
        this.showTypes.wss = true;
      }
    } else if (person.apType && person.apType.toLowerCase() === s) {
      this.sortBy = 'ap';
      this.showTypes.ap = true;
    } else if (person.apType && person.apSubtype && person.apSubtype === s) {
      this.sortBy = 'ap';
      this.showTypes.ap = true;
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
      (!person.tags || !person.tags.includes('OPS Class Typing'))
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
    let showParam = [];
    if (this.showTypes.ops) { showParam.push('ops'); }
    if (this.showTypes.ennea) { showParam.push('ennea'); }
    if (this.showTypes.wss) { showParam.push('wss'); }
    if (this.showTypes.ap) { showParam.push('ap'); }
    const queryParams: Params = {
      type: null, //legacy
      name: null, //legacy
      text: this.searchInitiated ? this.textString : null,
      et: this.activeEType ? this.activeEType.name : null,
      w: this.activeWing,
      i1: this.activeInstinct ? this.activeInstinct.name : null,
      i2: this.activeInstinct2,
      show: this.searchInitiated ? showParam.join(',') : null
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

  clearSearch() {
    this.textString = '';
    this.nameInput.nativeElement.focus();
    this.searchInitiated = false;
    this.showDisplay = false;
    this.showSort = false;
    this.showPrevious = false;
    this.updateRoute();
    // this.displayedRecords = null;
  }

  showType(s?: string) {
    if (s === 'all') {
      this.showTypes.ops = true;
      this.showTypes.ennea = true;
      this.showTypes.wss = true;
      this.showTypes.ap = true;
    } else if (s === 'ops') {
      this.showTypes.ops = !this.showTypes.ops;
    } else if (s === 'ennea') {
      this.showTypes.ennea = !this.showTypes.ennea;
    } else if (s === 'wss') {
      this.showTypes.wss = !this.showTypes.wss;
    } else if (s === 'ap') {
      this.showTypes.ap = !this.showTypes.ap;
    }
    this.updateRoute();
  }

  scrollTo(el: ElementRef) {
    const y = el.nativeElement.getBoundingClientRect().top + window.scrollY - 60;
    // el.nativeElement.scrollIntoView();
    window.scroll({
      top: y,
      behavior: 'smooth'
    });
  }
}

class OptionModel {
  coin: Coin;
  val: string;
}
