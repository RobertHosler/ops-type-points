import { Injectable, EventEmitter } from '@angular/core';
import { OpsType } from './ops-type';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpsTypeService {

  opsTypeObs: Observable<OpsType>;

  private opsTypeSub: Subject<OpsType>;
  private opsTypeSubB: Subject<OpsType>;

  opsType: OpsType;
  opsTypeB: OpsType;

  opsTypes: OpsType[] = [];

  opsTypesSubject: Subject<OpsType[]> = new Subject<OpsType[]>();

  // statusUpdated = new EventEmitter<boolean>();

  constructor() {
    this.opsTypeSub = new Subject<OpsType>();
    this.opsTypeObs = this.opsTypeSub.asObservable();
  }

  addOpsType(type: OpsType) {
    this.opsTypes.push(type);
    this.opsTypesSubject.next(this.opsTypes);
  }

  removeOpsType(index: number) {
    this.opsTypes.splice(index, 1);
    this.opsTypesSubject.next(this.opsTypes);
  }

  clearOpsTypes() {
    this.opsTypes.splice(0, this.opsTypes.length);
    this.opsTypesSubject.next(this.opsTypes);
  }



}
