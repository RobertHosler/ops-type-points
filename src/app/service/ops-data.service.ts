import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpsDataService {


  baseUrl = 'https://ops-data-service.herokuapp.com';
  // baseUrl = 'http://localhost:8080';
  greetingPath = '/greeting';
  airtablePath = '/airtable';
  recordsPath = '/opsRecords';

  constructor(private httpClient: HttpClient) {
  }

  getGreeting():Observable<Greeting> {
    return this.httpClient.get<Greeting>(this.baseUrl + this.greetingPath,
      { 'headers': new HttpHeaders(
          {
            'Content-Type':'application/json; charset=utf-8',
          }
        )
      } );
  }

  getAirtable() {
    return this.httpClient.get(this.baseUrl + this.airtablePath,
      { 'headers': new HttpHeaders(
          {
            'Content-Type':'application/json; charset=utf-8',
          }
        )
      } );
  }

  getRecords(s1: string, s2: string, animalStack: string):Observable<TypeRoot> {
    return this.httpClient.get<TypeRoot>(this.baseUrl + this.recordsPath,
      {
        'headers': new HttpHeaders({
            'Content-Type':'application/json; charset=utf-8',
        }),
        'params': {
          'maxRecords': '100',
          's1': s1,
          's2': s2,
          'as': animalStack
        }
      });
  }
}

export class Greeting {
  id: number;
  content: string;
}

export class TypeRoot {
  records:TypeRecord[];
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