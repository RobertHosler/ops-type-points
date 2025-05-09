import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Link } from '../ops-type-links/ops-type-links.component';

@Injectable({
  providedIn: 'root',
})
export class OpsDataService {
  baseUrl = 'https://ops-data-service.herokuapp.com';
  greetingPath = '/greeting';
  airtablePath = '/airtable';
  recordsPath = '/opsRecords';
  coinsPath = '/tenCoins';
  namePath = '/name';

  allRecords: TypeRoot;
  allTerms: Observable<Map<string, Term>>;
  allSources: Observable<Map<string, Source>>;

  allTypes: Observable<Map<string, TypedPerson[]>>;
  allNames: Observable<Map<string, TypedPerson>>;
  allParents: Observable<Map<string, Parent>>;

  allTermsMap: Map<string, Term>;
  allNamesMap: Map<string, TypedPerson>;

  constructor(private httpClient: HttpClient, socket: Socket) {
    this.allTerms = new Observable((observer) => {
      if (this.allTermsMap) {
        observer.next(this.allTermsMap);
      } else {
        socket.on('terms', (terms) => {
          this.allTermsMap = new Map<string, Term>(terms);
          observer.next(this.allTermsMap);
        });
        socket.emit('getTerms');
      }
    });
    this.allSources = new Observable((observer) => {
      socket.on('sources', (sources) => {
        let map = new Map<string, Source>(sources);
        map.delete('');
        observer.next(map);
      });
      socket.emit('getSources');
    });
    this.allNames = new Observable((observer) => {
      if (this.allNamesMap) {
        observer.next(this.allNamesMap);
      } else {
        socket.on('names', (names) => {
          this.allNamesMap = new Map<string, TypedPerson>(names);
          observer.next(this.allNamesMap);
        });
        socket.emit('getNames');
      }
    });
    this.allTypes = new Observable((observer) => {
      socket.on('types', (types) => {
        let map = new Map<string, TypedPerson[]>(types);
        observer.next(map);
      });
      socket.emit('getTypes');
    });
    this.allParents = new Observable((observer) => {
      socket.on('parents', (types) => {
        let map = new Map<string, Parent>(types);
        observer.next(map);
      });
      socket.emit('getParents');
    });
  }

  getGreeting(): Observable<Greeting> {
    return this.httpClient.get<Greeting>(this.baseUrl + this.greetingPath, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }),
    });
  }

  getAirtable() {
    return this.httpClient.get(this.baseUrl + this.airtablePath, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }),
    });
  }

  getName(maxRecords: number, name: string): Observable<TypeRoot> {
    return this.getList(this.namePath, {
      maxRecords: maxRecords,
      name: name,
    });
  }

  getType(maxRecords: number, type: string): Observable<TypeRoot> {
    return this.getList('/type', {
      maxRecords: maxRecords,
      type: type,
    });
  }

  private getList(path: string, params): Observable<TypeRoot> {
    return this.httpClient.get<TypeRoot>(this.baseUrl + path, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }),
      params: params,
    });
  }

  getAllRecords(): Observable<TypeRoot> {
    let recordsResult = null;
    if (this.allRecords) {
      recordsResult = of(this.allRecords);
    } else {
      recordsResult = this.getList(this.coinsPath, {
        maxRecords: 10000,
      });
      recordsResult.subscribe((result: TypeRoot) => {
        this.allRecords = result;
      });
    }
    return recordsResult;
  }

  getCoins(
    maxRecords: number,
    hn1: string,
    ohn: string,
    dhn: string,
    ol: string,
    dl: string,
    ia: string,
    ea: string,
    dom: string,
    smod: string,
    demod: string,
    sex: string
  ): Observable<TypeRoot> {
    if (
      !hn1 &&
      !ohn &&
      !dhn &&
      !ol &&
      !dl &&
      !ia &&
      !ea &&
      !dom &&
      !smod &&
      !demod &&
      !sex
    ) {
      return this.getAllRecords();
    } else {
      return this.getList(this.coinsPath, {
        hn1: hn1,
        ohn: ohn,
        dhn: dhn,
        ol: ol,
        dl: dl,
        ia: ia,
        ea: ea,
        dom: dom,
        smod: smod,
        demod: demod,
        sex: sex,
        maxRecords: maxRecords,
      });
    }
  }

}

export class Greeting {
  id: number;
  content: string;
}

export class TypeRoot {
  records: TypeRecord[];
}
export class TypeRecord {
  id: string;
  fields: TypeField;
}
export class TypeField {
  Name: string;
  Picture: TypePicture[];
  Type: string;
  Tags: string[];
}
export class TypePicture {
  url: string;
}

export class Term {
  name: string;
  definitions: Definition[];
  tags?: string[];
  types?: string[];
  altNames?: string[];
  children: string[];
  parents: string[];
}
export class Definition {
  definition: string;
  sourceName?: string;
  sourceUrl?: string;
}

export class Source {
  definitions: SourceDefinition[];
  url: string;
}
export class SourceDefinition {
  term: string;
  definition: string;
}

export class TypedPerson {
  key?: string;
  name: string;
  pictureUrl?: string;
  type?: string;
  socialType?: string;
  typeNumber?: string;
  tags?: string[];
  personTags?: string[];
  opsTags?: string[];
  enneaTags?: string[];
  apTags?: string[];
  coreNeed?: string;
  deciderNeed?: string;
  observerNeed?: string;
  observerLetter?: string;
  deciderLetter?: string;
  infoAnimal?: string;
  energyAnimal?: string;
  animalBalance?: string;
  sensoryMod?: string;
  deMod?: string;
  mod?: string;
  s1?: string; // Fi
  s2?: string; // Si
  animals?: string;
  sex?: string;
  trans?: boolean;
  eType?: string; // 9w1
  instinct?: string; // so/sp
  trifix?: string; // 963 (no wings)
  overlay?: string; // (125)
  emphasizedNumbers?: string[]; // ['5'] (double numbers from overlay)
  fullTrifix?: string; // may contain wings '9w1 6w5 3w2'
  coreEType?: string; // 9
  coreETypeLong?: string; // Nine
  wing?: string; // 1
  fullEType?: string;// so/sp - 9w1 - 963
  fullETypeOverlay?: string; // so/sp 963(125)
  apEpisode?: string;
  apType?: string;
  apSubtype?: string;
  wssType?: string;
  wssLink?: string;
  binLink?: string;
  enfpLink?: string;
  otherLinks?: string;
  opsLinks?: string; // from ops database
  opsClassNumber?: number;
  classLink?: Link;
  classLinks?: Link[];
  opsYtLinks?: Link[];
  moreLinks?: Link[];
  daaLink?: string;
  daaClassNumber?: number;
  apLink?: string;
  enneaLinks?: string;
  enneaNotes?: string;
  collageUrl?: string;
  ytLink?: string;
  lastModified?: string;
  created?: string;
}

export class Parent {
  name: string;
  children: string[];
  parents: string[];
}
