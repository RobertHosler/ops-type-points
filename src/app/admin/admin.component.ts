import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { OpsDataService } from '../service/ops-data.service';
import { searchModel } from '../search/search.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  authenticated = false;
  authMsg = '';
  pw: string;

  comparingEnnea = false;
  comparingAP = false;
  refreshing = false;
  finding = false;
  refreshMsg = '';
  refreshStart;

  findStart;
  findMsg = '';
  threshold = 11;
  skipPictures = true;
  skipCommunity = true;

  allNames;
  allNamesCount: number;
  allNamesArr = [];
  similarNames = new Map();

  excludedStrings = [
    ' ',
    'of',
    'de',
    'the',
    'i',
    'ii',
    'iii',
    'iv',
    'v',
    'vi',
    'vii',
    'viii',
    'ix',
    'x',
    'xi',
    'xii',
    'xiii',
    'xiv',
    'xv',
    'xvi',
    'xvii',
    'xviii',
    'xix',
    'xx',
    'england',
    'great',
    'britain',
    'france',
    'emperor',
    'duke',
    'king',
    'and',
    'royal',
    'princess',
    'holy',
    'united',
    'kingdom',
    'russia',
    'viscount',
    'brazil',
  ];

  similarRecords = [];
  similarNameResults = [];
  enneaDifferences;
  apDifferences;

  testArray = [
    'Mr. Rogers',
    'Fred Rogers',
    'Goonzsquad - Billy',
    'Goonzsquad - Simon',
    'Gordon Ramsay',
    'Gordon Ramsey',
    'Jeff Ramsay',
    'Jeff Ramsi',
    'Jay Z',
    'Jay-Z',
    'Shaq',
    'Shaquille O’Neal',
    'Dr. Drew',
    'Dr. Drew Pinsky',
    'R Kelly',
    'Robert Kelly',
    'J Spainy',
    'Jay Spainey',
    'richard black',
    'richard blackwater',
    'richard black water',
    'john quincy adams',
    'john adams',
    'dr. phil water',
    'dr. phillip',
    'Robbie Tinman',
    'Robby Tinman',
    'Hillary Clinton',
    'Hilary Clinton',
    'Al Yankovic',
    'Weird Al Yankovic',
  ];

  shortTerms = ['mr', 'dr', 'ms'];

  /**
   * List of potential matches confirmed to not be matches.
   */
  excludedMatches = [
    { n1: 'richard burton', n2: 'richard francis burton' },
    { n1: 'john adams', n2: 'john quincey adams' },
    { n1: 'Muhammad Ali', n2: 'Muhammad Ali Jinnah' },
    { n1: 'Pat Robertson', n2: 'Robert Pattinson' },
    { n1: 'George H. W. Bush', n2: 'George W. Bush' },
    { n1: 'Rich Benjamin', n2: 'Richard Benjamin' },
    { n1: 'David Bayer', n2: 'David Ayer' },
    { n1: 'Karl Ove Knarsgaard', n2: 'Karl Rove' },
    { n1: 'Colleen Ballinger', n2: 'Lee Lin Chin' },
    { n1: "Dwayne 'The Rock' Johnson", n2: 'John Wayne' },
    { n1: 'William Pitt the Younger', n2: 'William Pitt, 1st Earl of Chatham' },
    { n1: 'William James', n2: 'William James Sidis' },
    { n1: 'Tom Jones', n2: 'Tommy Lee Jones' },
    { n1: 'Martin Luther', n2: 'Martin Luther King Jr.' },
    { n1: 'John Paul DeJoria', n2: 'John Paul White' },
    { n1: 'Ron Paul', n2: 'Aaron Paul' },
    { n1: 'Ian Douglas Smith', n2: 'Dr. Ian Smith' },
  ];

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
      this.allNames = result;
      this.allNamesCount = this.allNames.size;
      this.allNamesArr.sort();
    });
    this.socket.on('findSimilarComplete1', (result) => {
      console.log('findSimilarComplete1', result);
    });
    this.socket.on('findSimilarComplete', (results) => {
      console.log('findSimilarComplete', results.length);
      this.similarNameResults = results;
    });
    this.socket.on('compareEnneaComplete', (results) => {
      console.log('compareEnneaComplete', results);
      this.enneaDifferences = results;
      this.comparingEnnea = false;
    });
    this.socket.on('compareAPComplete', (results) => {
      console.log('compareAPComplete', results);
      this.apDifferences = results;
      this.comparingAP = false;
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

  compareEnnea() {
    this.comparingEnnea = true;
    this.socket.emit('compareEnnea');
  }

  compareAP() {
    this.comparingAP = true;
    this.socket.emit('compareAP');
  }

  verboseTrifixAlt(fullEType) {
    // find the trifix in a full e type string, ex: 'so/sp 6w7 693(478)'
    const trifix = fullEType.substring(fullEType.lastIndexOf(' ')+1);
    return this.verboseTrifix(trifix);
  }

  verboseTrifix(trifix) {
    var result = trifix;
    if (trifix && trifix.indexOf('(') > 0) {
      let overlayIndex = trifix.indexOf('(');
      let overlay = trifix.substring(overlayIndex);
      overlay = overlay.replace(/[()]/g, '');
      const fix1 = trifix.substring(0, 1);
      const fix2 = trifix.substring(1, 2);
      const fix3 = trifix.substring(2, 3);
      let fix1wing = this.fixWing(fix1, trifix, overlay);
      let fix2wing = this.fixWing(fix2, trifix, overlay);
      let fix3wing = this.fixWing(fix3, trifix, overlay);
      if (fix1wing === '?') {
        let tempOverlay = overlay.replace(fix2wing, '');
        tempOverlay = tempOverlay.replace(fix3wing, '');
        fix1wing = tempOverlay ? tempOverlay : '?';
      } else if (fix2wing === '?') {
        let tempOverlay = overlay.replace(fix1wing, '');
        tempOverlay = tempOverlay.replace(fix3wing, '');
        fix2wing = tempOverlay ? tempOverlay : '?';
      } else if (fix3wing === '?') {
        let tempOverlay = overlay.replace(fix1wing, '');
        tempOverlay = tempOverlay.replace(fix2wing, '');
        fix3wing = tempOverlay ? tempOverlay : '?';
      }
      result = fix1 + 'w' + fix1wing + ' ' + fix2 + 'w' + fix2wing + ' ' + fix3 + 'w' + fix3wing;
    }
    return result;
  }

  fixWing(fix, trifix, overlay) {
    let result = null;
    searchModel.eTypes.forEach(eType => {
      if (result) {
        return;
      }
      if (eType.name === fix) {
        const overlayWingA = overlay.includes(eType.wings[0]);
        const overlayWingB = overlay.includes(eType.wings[1]);
        if (overlayWingA && !overlayWingB) {
          result = eType.wings[0];
        } else if (!overlayWingA && overlayWingB) {
          result = eType.wings[1];
        } else if (overlayWingA && overlayWingB) {
          // contains both wing options in overlay - what should we do?
          result = '?';
        } else { // !overlayWingA && !overlayWingB - includes neither, should be in trifix
          const trifixWingA = trifix.includes(eType.wings[0]);
          const trifixWingB = trifix.includes(eType.wings[1]);
          if (trifixWingA && !trifixWingB) {
            result = eType.wings[0];
          } else if (!trifixWingA && trifixWingB) {
            result = eType.wings[1];
          }
        }
      }
    });
    return result;
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
    this.finding = true;
    new Promise((resolve, reject) => {
      this.similarNames = new Map();
      // Step 1 - find names with matching words
      this.allNamesArr.forEach((n1) => {
        this.allNamesArr.forEach((n2) => {
          if (n1 === n2 || this.excludedMatch(n1, n2)) {
            return; // skip same names and known non-matches
          }
          let n1Arr = this.cleanName(n1).split(' ');
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
      // Step 2 - determine if names also match on another string
      this.similarNames.forEach((value, key) => {
        let similarNames2 = [];
        value.arr.forEach((n1) => {
          value.arr.forEach((n2) => {
            if (n1 === n2 || this.excludedMatch(n1, n2)) {
              return; // skip same names and known non-matches
            }
            // remove key from strings being compared
            let s1 = n1.toLowerCase().replace(key, '');
            let s2 = n2.toLowerCase().replace(key, '');
            // make substrings to look for inside the other string
            let startIndex = 0;
            let endIndex = count;
            while (endIndex < s1.length) {
              // make substring to compare to s2
              const substring = s1.substring(0, endIndex).trim();
              startIndex++;
              endIndex++;
              if (
                substring.length < count ||
                this.excludedStrings.includes(substring)
              ) {
                return;
              }
              // check if name without previous match has another small match
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
                    n1: n1,
                    n2: n2,
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
      resolve('success');
    }).then(() => {
      this.finding = false;
    });
  }

  findSimilarNames3(names: string[]) {
    this.findStart = performance.now();
    const checkedNames = [];
    const results = [];
    // for each name pair...
    names.forEach((n1) => {
      names.forEach((n2) => {
        if (
          n1 === n2 ||
          this.excludedMatch(n1, n2) ||
          checkedNames.includes(n2)
        ) {
          return; // skip same names, known non-matches, and already checked names as n1
        }
        // compare individual strings (removing special characters)
        let n1Arr = this.cleanName(n1).split(' ');
        let n2Arr = this.cleanName(n2).split(' ');
        let matches = [];
        const checkedStrings = [];
        n1Arr.forEach((s1) => {
          let matchFound = false;
          n2Arr.forEach((s2) => {
            if (matchFound || checkedStrings.includes(s2)) {
              return; // already checked as s1
            }
            if (this.isSimilarString(s1, s2)) {
              // similar name - matching term or includes term
              matches.push({ s1: s1, s2: s2 });
              matchFound = true;
              checkedStrings.push(s1);
              checkedStrings.push(s2);
            } else {
              // not similar
            }
          });
          checkedStrings.push(s1);
        });
        if (
          matches.length > 1 ||
          (matches.length === 1 && this.singleMatchCheck(matches, n1Arr, n2Arr))
        ) {
          const result = {
            n1: n1,
            n2: n2,
            matches: matches,
          };
          results.push(result);
        }
      });
      checkedNames.push(n1); // no longer needs compared to other strings
    });
    let findTime = performance.now() - this.refreshStart;
    this.findMsg =
      'Find Complete in ' + Math.round(findTime / 10) / 100 + ' seconds';
    this.similarRecords = results;
  }

  findSimilarNames5() {
    this.socket.emit('findSimilar', this.threshold);
  }

  findSimilarNames4(names: string[]) {
    this.findStart = performance.now();
    const checkedNames = [];
    const results = [];
    // for each name pair...
    names.forEach((n1) => {
      names.forEach((n2) => {
        if (
          n1 === n2 ||
          // this.excludedMatch(n1, n2) ||
          checkedNames.includes(n2) ||
          this.skipPerson(n1, n2)
        ) {
          return; // skip same names, known non-matches, and already checked names as n1
        }
        let points = 0;
        // compare individual strings (removing special characters)
        let n1Clean = this.cleanName(n1);
        let n2Clean = this.cleanName(n2);
        if (n1Clean === n2Clean) {
          points++;
        }
        let n1NoSpace = n1Clean.replace(' ', '');
        let n2NoSpace = n2Clean.replace(' ', '');
        if (n1NoSpace === n2NoSpace) {
          points++;
        }

        let n1Arr = n1Clean.split(' ');
        let n2Arr = n2Clean.split(' ');

        let includesAll1 = true;
        let includesAll2 = true;
        n1Arr.forEach((s1) => {
          if (includesAll1) {
            // set to false if the string doesn't contain one part
            // ex: shaq in shaqelle o'neal
            includesAll1 = n2Clean.includes(s1);
          }
          n2Arr.forEach((s2) => {
            if (includesAll2) {
              // set to false if the string doesn't contain one part
              includesAll2 = n1Clean.includes(s2);
            }
            if (
              s1.trim().length === 0 ||
              s2.trim().length === 0 ||
              this.excludedStrings.includes(s1) ||
              this.excludedStrings.includes(s2)
            ) {
              return;
            }
            if (s1 === s2) {
              points += 3;
            } else {
              if (this.replaceVowels(s1) === this.replaceVowels(s2)) {
                points += 1;
              }
              if (this.removeVowels(s1) === this.removeVowels(s2)) {
                points += 1;
              }
            }
            if (this.matchMinusOne(s1, s2) || this.matchMinusOne(s2, s1)) {
              points += 5;
            }
          });
        });
        if (includesAll1 || includesAll2) {
          if (n1Arr.length === 1 || n2Arr.length === 1) {
            points += this.threshold; // rare check - bonus points - unlikely to match anything else
          } else if (n1Arr.length > 1 && n2Arr.length > 1) {
            points += 4; // rare check - bonus points
          } else {
            points++; //short name
          }
        }

        if (this.removeVowels(n1Clean) === this.removeVowels(n2Clean)) {
          points += 2;
        }
        if (this.removeVowels(n1NoSpace) === this.removeVowels(n2NoSpace)) {
          points += 2;
        }
        if (this.replaceVowels(n1Clean) === this.replaceVowels(n2Clean)) {
          points += 2;
        }
        if (this.replaceVowels(n1NoSpace) === this.replaceVowels(n2NoSpace)) {
          points += 2;
        }
        if (
          this.matchMinusOne(n1Clean, n2Clean) ||
          this.matchMinusOne(n2Clean, n1Clean)
        ) {
          points += 2;
        }
        if (
          this.matchMinusOne(n1NoSpace, n2NoSpace) ||
          this.matchMinusOne(n1NoSpace, n1NoSpace)
        ) {
          points += 2;
        }

        if (points > this.threshold - 1) {
          // Add Result
          results.push({ points: points, n1: n1, n2: n2 });
        }
      });
      checkedNames.push(n1); // no longer needs compared to other strings
    });
    // sort by points
    results.sort((a, b) => {
      if (a.points > b.points) {
        return -1;
      }
      if (a.points < b.points) {
        return 1;
      }
      return 0;
    });
    this.similarNameResults = results;
  }

  private skipPerson(n1, n2) {
    let p1 = this.allNames.get(n1);
    let p2 = this.allNames.get(n2);
    if (!p1 && !p2) {
      return false;
    }
    if (
      this.skipCommunity &&
      (p1.tags.includes('Community Member') ||
        p2.tags.includes('Community Member'))
    ) {
      return true;
    }
    if (this.skipPictures && p1.pictureUrl && p2.pictureUrl) {
      return true;
    }
    return false;
  }

  private matchNoVowels(n1, n2) {
    let n1NoVowel = this.removeVowels(n1);
    let n2NoVowel = this.removeVowels(n2);
    return n1NoVowel === n2NoVowel;
  }

  /**
   * Determine if we should bypass the single match limit
   *
   * if name only has one word in it, ex: shaq
   *
   * if name is length 2 and includes a short term, ex: mr rogers vs fred rogers
   *  - short term should not be the only match though, ex: mr rogers vs mr green
   *
   */
  private singleMatchCheck(matches, n1Arr, n2Arr) {
    let result = n1Arr.length === 1 || n2Arr.length === 1;
    if (!result) {
      // can't always expect these short terms to be included
      this.shortTerms.forEach((st) => {
        if (!result && (n1Arr.includes(st) || n2Arr.includes(st))) {
          if (![matches[0].s1, matches[0].s2].includes(st)) {
            result = true;
          }
        }
      });
    }
    return result;
  }

  private isSimilarString(s1, s2) {
    if (
      this.excludedStrings.includes(s1) ||
      this.excludedStrings.includes(s2)
    ) {
      return false;
    }
    return (
      this.isMatch(s1, s2) ||
      this.matchMinusVowels(s1, s2) ||
      this.matchMinusOne(s1, s2) ||
      this.matchMinusOne(s2, s1)
    );
  }

  /**
   * Same string or contains the other.
   */
  private isMatch(s1, s2) {
    return (
      s1 === s2 ||
      ((s1.length > 2 || this.shortTerms.includes(s1)) && s2.includes(s1)) ||
      ((s2.length > 2 || this.shortTerms.includes(s2)) && s1.includes(s2))
    );
  }

  /**
   * Compare the strings removing one char at a time.
   *
   * Ex: Billy match with Billie (since y will be removed)
   */
  private matchMinusOne(s1, s2) {
    let result = false;
    for (var i = 1; i < s1.length - 1; i++) {
      let s1a = s1.slice(0, i) + s1.slice(i + 1);
      if (this.excludedStrings.includes(s1a)) {
        continue;
      }
      if (s1a === s2) {
        result = true;
        break;
      }
      if (s1.length === s2.length) {
        // same length - possible letter off ex: Ramsey vs Ramsay
        let s2a = s2.slice(0, i) + s2.slice(i + 1);
        if (s2a === s1a) {
          result = true;
          break;
        }
      }
    }
    return result;
  }

  private matchMinusVowels(s1, s2) {
    return this.removeVowels(s1) === this.removeVowels(s2);
  }

  private removeVowels(s: string) {
    s = s.replace(/e/g, '');
    s = s.replace(/a/g, '');
    s = s.replace(/i/g, '');
    s = s.replace(/o/g, '');
    s = s.replace(/u/g, '');
    s = s.replace(/y/g, '');
    return s;
  }

  private replaceVowels(s: string) {
    s = s.replace(/e/g, '@');
    s = s.replace(/a/g, '@');
    s = s.replace(/i/g, '@');
    s = s.replace(/o/g, '@');
    s = s.replace(/u/g, '@');
    s = s.replace(/y/g, '@');
    return s;
  }

  private cleanName(name: string) {
    name = name.toLowerCase();
    let stFound = false;
    this.shortTerms.forEach((st) => {
      if (!stFound && name.startsWith(st)) {
        name = name.replace(st, '');
        stFound = true;
      }
    });
    name = name.replace('(', '');
    name = name.replace(')', '');
    name = name.replace("'", '');
    name = name.replace('"', '');
    name = name.replace('&', '');
    name = name.replace(',', '');
    name = name.replace('`', '');
    name = name.replace('.', '');
    name = name.replace('-', ' ');
    return name.trim();
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

  private excludedMatch(n1: string, n2: string) {
    let result = false;
    this.excludedMatches.forEach((val) => {
      if (result) {
        return;
      }
      if (
        (val.n1.toLowerCase().trim() === n1.toLowerCase().trim() &&
          val.n2.toLowerCase().trim() === n2.toLowerCase().trim()) ||
        (val.n1.toLowerCase().trim() === n2.toLowerCase().trim() &&
          val.n2.toLowerCase().trim() === n1.toLowerCase().trim())
      ) {
        result = true;
      }
    });
    return result;
  }
}
