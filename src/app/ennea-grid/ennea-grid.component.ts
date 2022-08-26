import { Component, Input, OnInit } from '@angular/core';
import { TrifixCombinations } from '../enneagram-trifix-combination/trifix-combination.model';
import { searchModel } from '../search/search.model';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-ennea-grid',
  templateUrl: './ennea-grid.component.html',
  styleUrls: ['./ennea-grid.component.scss'],
})
export class EnneaGridComponent implements OnInit {
  coreTriad = '';
  heartFix = '';
  headFix = '';
  gutFix = '';

  selectedHeartFixes = ['2', '3', '4'];
  selectedHeadFixes = ['5', '6', '7'];
  selectedGutFixes = ['8', '9', '1'];
  selectedHarmonic = '';
  selectedHornevian = '';
  selectedObjRelation = '';

  trifixSet1 = [

    // 2+ Rejection
    '258',
    '259',
    '251',
    '286',
    '287',
    '583',
    '584',
  ];

  trifixSet2 = [
    '279',
    '351', //351
    '468', 
  ];

  trifixSet3 = [
    // 2+ Attachment
    '369',
    '368',
    '361',
    '395',
    '397',
    '692',
    '694',
  ];

  trifixSet4 = [
    '261', //261
    '378',
    '459',
  ];
    
  trifixSet5 = [
    // 2+ Frustration
    '147',
    '478',
    '479',
    '145',
    '146',
    '172',
    '173',
  ];

  trifixSets = [
    { name: 'Rejection', set: this.trifixSet1},
    { name: 'Attachment', set: this.trifixSet3},
    { name: 'Frustration', set: this.trifixSet5},
    { name: 'Harmonics', set: this.trifixSet2},
    { name: 'Hornevians', set: this.trifixSet4},
  ]
  searchModel = searchModel;

  counts: Map<string, number>;

  selectedFix = '';

  @Input()
  enableControls = false;
  @Input()
  searchLinkEnabled = false;
  @Input()
  selectableTrifix = false;

  @Input()
  displayCounts = false;
  @Input()
  displayLabels = false;

  constructor(private opsDataService: OpsDataService) {
    this.opsDataService.allNames.subscribe((result) => {
      this.fetchCounts(result);
    });
  }

  ngOnInit(): void {}

  fetchCounts(allNames: Map<string, TypedPerson>) {
    if (!this.counts) {
      this.counts = new Map();
      // For each Person
      allNames.forEach((person, name) => {
        if (person.eType) {
          this.incrementCount(person.eType);
          this.incrementCount(person.coreEType);
        }
        if (person.trifix) {
          this.incrementCount('total');
          this.incrementCount(person.trifix);
          const stack = person.trifix.split('');
          stack.sort();
          this.incrementCount('*' + stack.join(''));
          if (person.coreEType) {
            this.incrementCount(
              TrifixCombinations.getObjRelString(person.coreEType)
            );
          }
          if (searchModel.enneaMatchTerms.get('headheart').match(person)) {
            this.incrementCount('Head Heart');
          } else if (
            searchModel.enneaMatchTerms.get('hearthead').match(person)
          ) {
            this.incrementCount('Heart Head');
          } else if (
            searchModel.enneaMatchTerms.get('headbody').match(person)
          ) {
            this.incrementCount('Head Body');
          } else if (
            searchModel.enneaMatchTerms.get('heartbody').match(person)
          ) {
            this.incrementCount('Heart Body');
          } else if (
            searchModel.enneaMatchTerms.get('bodyhead').match(person)
          ) {
            this.incrementCount('Body Head');
          } else if (
            searchModel.enneaMatchTerms.get('bodyheart').match(person)
          ) {
            this.incrementCount('Body Heart');
          }
        }
      });
    }
  }

  private incrementCount(key: string) {
    let val = this.counts.get(key);
    if (val) {
      this.counts.set(key, val + 1);
    } else {
      this.counts.set(key, 1);
    }
  }

  getCount(stack: string) {
    let result;
    if (stack && stack.length === 4) {
      result = this.counts.get(stack.split('').sort().join(''));
    } else if (stack) {
      result = this.counts.get(stack);
    }
    return result ? result : '0';
  }

  selectNumber(arr, number: string) {
    if (arr.includes(number)) {
      this.removeNumber(arr, number);
    } else {
      arr.push(number);
    }
  }

  selectHead(number: string) {
    if (this.selectedHeadFixes.includes(number)) {
      this.removeNumber(this.selectedHeadFixes, number);
    } else {
      this.selectedHeadFixes.push(number);
    }
  }

  removeNumber(array, number) {
    const index = array.indexOf(number);
    if (index > -1) {
      // only splice array when item is found
      array = array.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  matchFilter(trifix: string) {
    let result = true;
    if (
      this.coreTriad &&
      !this.heartFixFilter(trifix) &&
      !this.gutFixFilter(trifix) &&
      !this.headFixFilter(trifix)
    ) {
      result = false;
    } else if (
      !this.selectedHeadFixes.some((n) => trifix.includes(n)) ||
      !this.selectedGutFixes.some((n) => trifix.includes(n)) ||
      !this.selectedHeartFixes.some((n) => trifix.includes(n))
    ) {
      result = false;
    }
    
    const core = parseInt(trifix.charAt(0));
    if (false) {
      if (this.selectedHarmonic && this.selectedHarmonic !== TrifixCombinations.getHarmonics(core)) {
        result = false;
      }
      if (this.selectedHornevian && this.selectedHornevian !== TrifixCombinations.getHornevian(core)){
        result = false;
      }
      if (this.selectedObjRelation && this.selectedObjRelation !== TrifixCombinations.getObjRel(core)){
        result = false;
      }
    } else {
      if (this.selectedHarmonic && !trifix.split('').some((n) => this.selectedHarmonic === TrifixCombinations.getHarmonicsString(n))) {
        result = false;
      }
      if (this.selectedHornevian && !trifix.split('').some((n) => this.selectedHornevian === TrifixCombinations.getHornevianString(n))) {
        result = false;
      }
      if (this.selectedObjRelation && !trifix.split('').some((n) => this.selectedObjRelation === TrifixCombinations.getObjRelString(n))){
        result = false;
      }
    }

    return result;
  }

  heartFixFilter(trifix: string) {
    return (
      this.coreTriad === 'Heart' && ['2', '3', '4'].includes(trifix.charAt(0))
    );
  }

  headFixFilter(trifix: string) {
    return (
      this.coreTriad === 'Head' && ['5', '6', '7'].includes(trifix.charAt(0))
    );
  }

  gutFixFilter(trifix: string) {
    return (
      this.coreTriad === 'Gut' && ['8', '9', '1'].includes(trifix.charAt(0))
    );
  }

  isAttachment(trifix: string) {
    return ['3', '6', '9'].includes(trifix.charAt(0));
  }
  isFrustration(trifix: string) {
    return ['1', '4', '7'].includes(trifix.charAt(0));
  }
  isRejection(trifix: string) {
    return ['2', '5', '8'].includes(trifix.charAt(0));
  }

  selectFix(text: string) {
    if (text.length === 3) {
      this.selectedFix = text;
    }
  }

  resetAll() {
    this.coreTriad = '';
    this.selectedFix = '';
    this.selectedHarmonic = '';
    this.selectedHornevian = '';
    this.selectedObjRelation = '';
    this.selectedHeartFixes = ['2', '3', '4'];
    this.selectedHeadFixes = ['5', '6', '7'];
    this.selectedGutFixes = ['8', '9', '1'];
  }
}
