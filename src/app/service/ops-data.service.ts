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
}

export class Greeting {
  id: number;
  content: string;
}