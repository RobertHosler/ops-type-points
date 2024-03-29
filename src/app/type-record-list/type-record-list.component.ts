import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { appLinks } from '../model/links';
import { TypedPerson } from '../service/ops-data.service';
import { ShowTypes } from '../type-record-item/type-record-item.component';

@Component({
  selector: 'app-type-record-list',
  templateUrl: './type-record-list.component.html',
  styleUrls: ['./type-record-list.component.scss'],
})
export class TypeRecordListComponent implements OnInit, OnChanges {
  enneagrammerLink = appLinks.enneagrammerDb;
  enneagrammerPinterest = appLinks.enneagrammerPinterest;
  opsDbInfo = appLinks.opsDbInfo;
  opsDbSource = appLinks.opsDbSource;
  appLinks = appLinks;

  @Input()
  linkToAnalyzer = false;

  @Input()
  externalLink; // function?

  @Input()
  showMolecule = true;

  @Input()
  showReveal = false;

  @Input()
  loading = false;

  @Input()
  typeRecords: TypedPerson[];

  @Input()
  notFoundMessage = 'Sorry, no type records found';

  @Input()
  loadingMessage = 'Type Records are loading...';

  @Input()
  displayPracticeLink = false;

  @Input()
  maxDisplay;

  displayPages: TypedPerson[][];
  currentPage = 1;
  pageSize = 50;
  pages = [];

  @ViewChild('loaded') loadedEl: ElementRef;

  @Input()
  showSource = true;

  @Input()
  showTypes: ShowTypes = {
    ops: true,
    wss: true,
    ennea: true,
    ap: true
  };

  activeTag = '';

  @Input()
  grayscale = false;

  @Input()
  imageOnly = false;

  @Input()
  typeIndicator = false;

  constructor() {}

  ngOnInit(): void {}

  analyzerLinkMod(type: string) {
    return type.substring(0, 2);
  }
  analyzerLinkSav1(type: string) {
    return type.substring(3, 5);
  }
  analyzerLinkSav2(type: string) {
    return type.substring(6, 8);
  }
  analyzerLinkAnimals(type: string) {
    let animals = type.substring(9, 16);
    animals = animals.replace('(', '');
    animals = animals.replace(')', '');
    animals = animals.replace('/', '');
    return animals;
  }
  animal(type: string, i: number) {
    return this.analyzerLinkAnimals(type).substring(i, i + 1);
  }

  practiceLink(name: string) {
    return '/practice?name=' + name;
  }

  convert(type: string) {
    if (type.length === 16) {
      return (
        'type-indicator type-' +
        (type.substring(3, 5) + type.substring(6, 8)).toLowerCase()
      );
    } else {
      return '';
    }
  }

  missingImageLink(name: string) {
    return 'https://www.google.com/search?q=' + name + '&tbm=isch';
    //&hl=en&tbs=il:cl&rlz=1C1CHBF_enUS827US827&sa=X&ved=0CAAQ1vwEahcKEwioxM_gsNzzAhUAAAAAHQAAAAAQAg&biw=1903&bih=880#imgrc=DwdoIiO6d18ywM'
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes', changes);
    this.determineDisplayedRecords();
  }

  determineDisplayedRecords() {
    this.currentPage = 1;
    this.displayPages = [];
    this.pages = [];
    let count = 0;
    let page = [];
    let pageCount = 0;
    if (this.typeRecords && !this.loading) {
      this.typeRecords.forEach((record) => {
        page.push(record);
        count++;
        if (count >= this.pageSize) {
          count = 0; //reset count
          this.displayPages.push(page);
          page = [];
          pageCount++;
          this.pages.push(pageCount);
        }
      });
      if (page.length > 0) {
        this.displayPages.push(page);
        pageCount++;
        this.pages.push(pageCount);
      }
      // this.scrollToLoaded();
    }
  }

  emphasize(fullETypeOverlay: string, emphasizedNumbers: string[]) {
    let result = fullETypeOverlay;
    emphasizedNumbers.forEach((number) => {
      const index = result.indexOf(number);
      const s1 = result.substring(0, index);
      const s2 = result.substring(index + 1, result.length);
      result = s1 + '<u>' + number + '</u>' + s2;
    });
    // console.log(result);
    return result;
  }

  get currentDisplay() {
    let first = (this.currentPage - 1) * this.pageSize + 1;
    let last;
    if (this.currentPage === this.displayPages.length) {
      last =
        (this.currentPage - 1) * this.pageSize +
        this.displayPages[this.currentPage - 1].length;
    } else {
      last = this.currentPage * this.pageSize;
    }
    return first + ' - ' + last;
  }

  scrollToLoaded() {
    if (this.loadedEl) {
      setTimeout(() => {
        let top = this.loadedEl.nativeElement.offsetTop;
        window.scrollTo(0, top - 72);
      });
    }
  }

  imageRouterLink() {
    return this.displayPracticeLink ? ['/practice'] : ['/search/person'];
  }

  imageQueryParams(typeRecord) {
    return this.displayPracticeLink
      ? { name: typeRecord.key }
      : { person: typeRecord.name };
  }
}
