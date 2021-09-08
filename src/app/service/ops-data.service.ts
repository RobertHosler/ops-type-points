import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpsDataService {


  baseUrl = 'https://ops-data-service.herokuapp.com';
  // baseUrl = 'http://localhost:8080';
  greetingPath = '/greeting';

//TODO: add access control header - Access-Control-Allow-Origin: https://developer.mozilla.org

  httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*'});
    // this.httpHeaders = this.httpHeaders.set('Access-Control-Allow-Origin', 'http://subjectivepersonality.com');
  }

  getGreeting():Observable<Greeting> {
    return this.httpClient.get<Greeting>(this.baseUrl + this.greetingPath,
      { 'headers': new HttpHeaders(
          {
            'Content-Type':'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          }
        )
      } );
  }
}

export class Greeting {
  id: number;
  content: string;
}