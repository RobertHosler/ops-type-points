import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private httpClient: HttpClient) {}

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
    demod: string
  ): Observable<TypeRoot> {
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
      maxRecords: maxRecords
    });
  }

  getRecords(
    s1: string,
    s2: string,
    animalStack: string
  ): Observable<TypeRoot> {
    return this.getList(this.recordsPath, {
      maxRecords: '100',
      s1: s1,
      s2: s2,
      as: animalStack
    });
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
  fields: TypeField[];
}
export class TypeField {
  name: string;
  picture: TypePicture[];
  type: string;
  tags: string[];
}
export class TypePicture {
  url: string;
}
