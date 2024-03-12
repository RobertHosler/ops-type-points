import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { heart } from 'ngx-bootstrap-icons';
import { Trifix } from '../enneagram-trifix/trifix.model';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-ennea-trifix-stems',
  templateUrl: './ennea-trifix-stems.component.html',
  styleUrls: ['./ennea-trifix-stems.component.scss'],
})
export class EnneaTrifixStemsComponent implements OnInit, OnChanges {
  @Input()
  trifix: string;

  @Input()
  heartFix: string;
  @Input()
  headFix: string;
  @Input()
  gutFix: string;

  trifixModel = Trifix;

  stems = [];
  activeStems = [];

  @Input()
  collapsible = false;
  collapsed = false;

  darkMode: DarkModeService;

  constructor(darkMode: DarkModeService) {
    this.darkMode = darkMode;
  }

  ngOnInit(): void {
    if (this.collapsible) {
      this.collapsed = true;
    }
    this.initStems();
  }

  ngOnChanges(): void {
    this.initStems();
  }

  initStems(): void {
    if (this.trifix && this.trifix.length === 3) {
      let fixArr = this.trifix.split('');
      let s1 = this.combineFixes(fixArr[0], fixArr[1]);
      let s2 = this.combineFixes(fixArr[0], fixArr[2]);
      let s3 = this.combineFixes(fixArr[1], fixArr[2]);
      this.stems = [];
      this.addStem(s1);
      this.addStem(s2);
      this.addStem(s3);
      // } else if (this.heartFix || this.gutFix || this.headFix) {
      //   this.stems = [];
      //   // if (s1 || s2 || s3) {
      //   //   this.addStem(s1);
      //   //   this.addStem(s2);
      //   //   this.addStem(s3);
      //   // } else {
      //     // let fix = this.heartFix ? this.heartFix : this.headFix ? this.headFix : this.gutFix;
      //   let arr = [];
      //   if (this.heartFix) {
      //   this.trifixModel.stems.forEach((val, key) => {
      //     if (!this.heartFix) {
      //       this.addStem(this.combineFixes(this.heartFix, this.headFix));
      //     } else if (this.heartFix && this.headFix) {
      //       this.addStem(this.combineFixes(this.heartFix, this.headFix));
      //     } else if (this.heartFix) {

      //     }
      //     let found = false;
      //     if (key.includes(this.heartFix)) {
      //       this.stems.push({ val: key, description: val });
      //     }
      //   });
      //   }
      //   if (this.headFix) {
      //     arr.push(this.headFix);
      //   }
      //   if (this.gutFix) {
      //     arr.push(this.gutFix);
      //   }
      //   this.trifixModel.stems.forEach((val, key) => {
      //     let found = false;
      //     arr.forEach(val => {
      //       if (key.includes(val)) {
      //         found = true;
      //       }
      //     });
      //     if (found ) {
      //       this.stems.push({ val: key, description: val });
      //     }
      //   });
      //   // }
    } else {
      this.stems = [];
      this.trifixModel.stems.forEach((val, key) => {
        if (
          ['2', '3', '4'].some((r) => key.includes(r)) &&
          this.heartFix &&
          !key.includes(this.heartFix)
        ) {
          return;
        }
        if (
          ['5', '6', '7'].some((r) => key.includes(r)) &&
          this.headFix &&
          !key.includes(this.headFix)
        ) {
          return;
        }
        if (
          ['8', '9', '1'].some((r) => key.includes(r)) &&
          this.gutFix &&
          !key.includes(this.gutFix)
        ) {
          return;
        }
        this.stems.push({ val: key, description: val });
      });
      this.activeStems = [];
      let s1 =
        this.heartFix && this.headFix
          ? this.combineFixes(this.heartFix, this.headFix)
          : '';
      let s2 =
        this.headFix && this.gutFix
          ? this.combineFixes(this.gutFix, this.headFix)
          : '';
      let s3 =
        this.heartFix && this.gutFix
          ? this.combineFixes(this.heartFix, this.gutFix)
          : '';
      if (s1) {
        this.activeStems.push(s1);
      }
      if (s2) {
        this.activeStems.push(s2);
      }
      if (s3) {
        this.activeStems.push(s3);
      }
    }
  }

  combineFixes(fix1: string, fix2: string) {
    return fix1 > fix2 ? fix2 + fix1 : fix1 + fix2;
  }

  addStem(stemKey: string) {
    if (!stemKey) {
      return;
    }
    this.stems.push({
      val: stemKey,
      description: this.trifixModel.stems.get(stemKey),
    });
  }

  activeStem(stemKey: string) {
    if (this.activeStems.includes(stemKey)) {
      return true;
    } else {
      return false;
    }
  }
}
