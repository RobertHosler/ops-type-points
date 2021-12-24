import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    if (fix.reactive > 1) {
      return fix.reactive + 'x Reactive';
    } else if (fix.positive > 1) {
      return fix.positive + 'x Positive';
    } else if (fix.competency > 1) {
      return fix.competency + 'x Competency';
    } else {
      return '';
    }
  }

  hornevian(fix) {
    if (fix.assertive > 1) {
      return fix.assertive + 'x Assertive';
    } else if (fix.compliant > 1) {
      return fix.compliant + 'x Compliant';
    } else if (fix.withdrawn > 1) {
      return fix.withdrawn + 'x Withdrawn';
    } else {
      return '';
    }
  }

  object(fix) {
    if (fix.attachment > 1) {
      return fix.attachment + 'x Attachment';
    } else if (fix.frustration > 1) {
      return fix.frustration + 'x Frustration';
    } else if (fix.rejection > 1) {
      return fix.rejection + 'x Rejection';
    } else {
      return '';
    }
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
        d.numbers.includes(this.bodySelected) &&
        d.numbers.includes(this.headSelected) &&
        d.numbers.includes(this.heartSelected)
      ) {
        tempCombos.push(d);
      }
    });
    this.combinations = tempCombos;
  }
}
