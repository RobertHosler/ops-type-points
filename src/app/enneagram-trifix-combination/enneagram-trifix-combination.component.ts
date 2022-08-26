import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Trifix } from '../enneagram-trifix/trifix.model';
import { TrifixCombinations } from './trifix-combination.model';

@Component({
  selector: 'app-enneagram-trifix-combination',
  templateUrl: './enneagram-trifix-combination.component.html',
  styleUrls: ['./enneagram-trifix-combination.component.scss'],
})
export class EnneagramTrifixCombinationComponent implements OnInit {
  @Input()
  trifix: string; // specific trifix to display
  @Input()
  clickable = false;

  combinations = TrifixCombinations.descriptions;

  body = ['8', '9', '1'];
  head = ['5', '6', '7'];
  heart = ['2', '3', '4'];

  bodySelected = '';
  headSelected = '';
  heartSelected = '';

  bodySelectedArr = this.body.slice();
  headSelectedArr = this.head.slice();
  heartSelectedArr = this.heart.slice();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initTrifix();
  }

  ngOnChanges(): void {
    this.initTrifix();
  }

  initTrifix() {
    if (this.trifix) {
      let fixArray = this.trifix.split('');
      let tempCombos = [];
      this.combinations.forEach((combo) => {
        if (
          combo.numbers.includes(fixArray[0]) &&
          combo.numbers.includes(fixArray[1]) &&
          combo.numbers.includes(fixArray[2])
        ) {
          tempCombos.push(combo);
        }
      });
      this.combinations = tempCombos;
    } else {
      this.combinations = TrifixCombinations.descriptions;
    }
  }

  harmonics(fix) {
    let arr = [];
    if (fix.reactive !== 1) {
      arr.push(fix.reactive + 'x Reactive');
    }
    if (fix.positive !== 1) {
      arr.push(fix.positive + 'x Positive');
    }
    if (fix.competency !== 1) {
      arr.push(fix.competency + 'x Competency');
    }
    return arr.join('\n ');
  }

  hornevian(fix) {
    let arr = [];
    if (fix.assertive !== 1) {
      arr.push(fix.assertive + 'x Assertive');
    }
    if (fix.compliant !== 1) {
      arr.push(fix.compliant + 'x Compliant');
    }
    if (fix.withdrawn !== 1) {
      arr.push(fix.withdrawn + 'x Withdrawn');
    }
    return arr.join('\n ');
  }

  object(fix) {
    let arr = [];
    if (fix.attachment !== 1) {
      arr.push(fix.attachment + 'x Attachment');
    }
    if (fix.frustration !== 1) {
      arr.push(fix.frustration + 'x Frustration');
    }
    if (fix.rejection !== 1) {
      arr.push(fix.rejection + 'x Rejection');
    }
    return arr.join('\n ');
  }

  fixClick(fix: string) {
    if (this.clickable) {
      const queryParams: Params = {
        fix: fix,
      };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });
    }
  }

  applyFilter() {
    let tempCombos = [];
    TrifixCombinations.descriptions.forEach((d) => {
      if (
        d.numbers.split('').some(n => this.bodySelectedArr.includes(n)) &&
        d.numbers.split('').some(n => this.headSelectedArr.includes(n)) &&
        d.numbers.split('').some(n => this.heartSelectedArr.includes(n))
      ) {
        tempCombos.push(d);
      }
    });
    this.combinations = tempCombos;
  }

  getCenter(name: string) {
    return Trifix.centers[name];
  }

  getDescription(number: string) {
    return Trifix.descriptions.get(number);
  }

  numberClick(array, number) {
    if (array.includes(number)) {
      this.removeNumber(array, number);
    } else {
      array.push(number);
    }
    this.applyFilter();
  }

  removeNumber(array, number) {
    const index = array.indexOf(number);
    if (index > -1) {
      // only splice array when item is found
      array = array.splice(index, 1); // 2nd parameter means remove one item only
    }
  }
}
