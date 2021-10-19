import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NineTypesService {

  nineTypes: Observable<Map<string, NineTypeSet>>;

  constructor(private socket: Socket) {
    this.nineTypes = new Observable((observer) => {
      socket.on('nineTypes', (names) => {
        let map = new Map<string, NineTypeSet>(names);
        observer.next(map);
      });
      socket.emit('getNineTypes');
    });
  }
}

export class NineTypeSet {
  one: [];
  two: [];
  three: [];
  four: [];
  five: [];
  six: [];
  seven: [];
  eight: [];
  nine: [];
}