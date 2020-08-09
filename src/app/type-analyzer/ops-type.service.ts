import { Injectable } from '@angular/core';
import { OpsType } from './ops-type';

@Injectable({
  providedIn: 'root'
})
export class OpsTypeService {

  opsType: OpsType;
  opsTypeB: OpsType;

  constructor() { }


}
