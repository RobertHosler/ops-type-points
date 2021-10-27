import { Component, OnInit } from '@angular/core';
import { arrowReturnRight } from 'ngx-bootstrap-icons';
import { Socket } from 'ngx-socket-io';
import { OpsDataService } from '../service/ops-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  authenticated = false;
  authMsg = '';
  pw: string;

  refreshing = false;
  refreshMsg = '';
  refreshStart;

  allNamesArr = [];
  similarNames = new Map();

  excludedStrings = ['of', 'the', 'i', 'ii', 'iii', 'iv'];

  constructor(private opsDataService: OpsDataService, private socket: Socket) {
    this.socket.on('refreshComplete', (result) => {
      this.refreshing = false;
      let refreshTime = performance.now() - this.refreshStart;
      this.refreshMsg =
        'Refresh Complete in ' +
        Math.round(refreshTime / 10) / 100 +
        ' seconds';
    });
    this.socket.on('authenticateComplete', (result) => {
      this.authenticated = result;
      if (!this.authenticated) {
        this.authMsg = 'Authentication failed';
      }
    });
    this.opsDataService.allNames.subscribe((result) => {
      this.allNamesArr = [];
      result.forEach((record) => {
        this.allNamesArr.push(record.name);
      });
    });
  }

  ngOnInit(): void {}

  refresh() {
    this.refreshing = true;
    this.refreshStart = performance.now();
    this.refreshMsg = 'Refreshing';
    this.socket.emit('refresh');
  }

  auth() {
    this.authMsg = '';
    this.socket.emit('authenticate', this.pw);
  }

  /**
   * Form substrings of x length from each name and compare to every other name.
   *
   * If substring is found in both names, add to map sorted by the substring
   */
  findSimilarNames(count: number) {
    setTimeout(() => {
      this.similarNames = new Map();
      this.allNamesArr.forEach((n1) => {
        let similarArr = [];
        let similarStrings = [];
        this.allNamesArr.forEach((n2) => {
          // make substrings to look for inside the other string
          let startIndex = 0;
          let endIndex = count;
          if (n1 === n2) {
            return; // skip same names
          }
          while (endIndex < n1.length) {
            // make substring to compare to n2
            const substring = n1.substring(0, endIndex);
            if (!similarStrings.includes(substring) && n2.includes(substring)) {
              similarStrings.push(substring);
              similarArr.push(n2);
              return;
            }
            startIndex++;
            endIndex++;
          }
        });
        if (similarArr.length > 0) {
          similarStrings.forEach((s) => {
            if (this.similarNames.get(s)) {
              similarArr.forEach((name) => {
                if (!this.similarNames.get(s).arr.includes(name)) {
                  this.similarNames.get(s).arr.push(name);
                }
              });
            } else {
              this.similarNames.set(s, {
                arr: similarArr,
              });
            }
          });
        }
      });
    }, 0);
  }

  findSimilarNames2(count: number) {
    count = 3;
    setTimeout(() => {
      this.similarNames = new Map();
      this.allNamesArr.forEach((n1) => {
        let n1Arr = this.cleanName(n1).split(' ');
        // remove special chara
        this.allNamesArr.forEach((n2) => {
          if (n1 === n2) {
            return; // skip same names
          }
          let n2Arr = this.cleanName(n2).split(' ');
          n1Arr.forEach((s1) => {
            n2Arr.forEach((s2) => {
              if (s1 === s2) {
                // found matching string
                // add names to map's array
                if (this.excludedStrings.includes(s1.trim())) {
                  return;
                }
                this.addToMap(s1, n1, n2);
              }
            });
          });
        });
      });
      this.similarNames.forEach((value, key) => {
        let similarNames2 = [];
        value.arr.forEach((n1) => {
          value.arr.forEach((n2) => {
            if (n1 === n2) {
              return; //skip same name
            }
            // remove key from strings being compared
            let s1 = n1.toLowerCase().replace(key, '');
            let s2 = n2.toLowerCase().replace(key, '');
            // make substrings to look for inside the other string
            let startIndex = 0;
            let endIndex = count;
            while (endIndex < s1.length) {
              // make substring to compare to s2
              const substring = s1.substring(0, endIndex);
              startIndex++;
              endIndex++;
              if (s2.includes(substring)) {
                let included = false;
                similarNames2.forEach((sn) => {
                  if (included) {
                    return;
                  }
                  included = sn.term === substring;
                });
                if (!included) {
                  similarNames2.push({
                    term: substring,
                    s1: s1,
                    s2: s2,
                  });
                }
                // if (!similarNames2.includes(s1)) {
                //   similarNames2.push(s1);
                // }
                // if (!similarNames2.includes(s2)) {
                //   similarNames2.push(s2);
                // }
                return;
              }
            }
          });
        });
        if (similarNames2.length > 0) {
          this.similarNames.get(key).arr = similarNames2;
        } else {
          this.similarNames.delete(key);
        }
      });
    }, 0);
  }

  private cleanName(name: string) {
    name = name.toLowerCase();
    name = name.replace('(', '');
    name = name.replace(')', '');
    name = name.replace("'", '');
    name = name.replace('"', '');
    name = name.replace('&', '');
    return name;
  }

  private addToMap(substring: string, n1: string, n2: string) {
    if (this.similarNames.get(substring)) {
      if (!this.similarNames.get(substring).arr.includes(n1)) {
        this.similarNames.get(substring).arr.push(n1);
      }
      if (!this.similarNames.get(substring).arr.includes(n2)) {
        this.similarNames.get(substring).arr.push(n2);
      }
    } else {
      this.similarNames.set(substring, {
        arr: [n1, n2],
      });
    }
  }
}
