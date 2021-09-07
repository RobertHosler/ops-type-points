import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Function } from '../function.model';
import { Animal } from '../animal';
import { OpsTypeService } from '../ops-type.service';
import { OpsType } from '../ops-type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-type-dashboard',
  templateUrl: './type-dashboard.component.html',
  styleUrls: ['./type-dashboard.component.scss']
})
export class TypeDashboardComponent implements OnInit, OnDestroy {
  
  @Input('index') index: number = 0;

  opsType: OpsType;
  private opsTypesSub: Subscription;

  functions: Function[] = new Array<Function>();
  animals: Animal[] = [];
  headings = [
    { letter: 'A', title: 'Activation'},
    { letter: 'M', title: 'Modality'},
    { letter: 'F', title: 'Function'},
    { letter: 'S', title: 'Saviors'},
    { letter: 'S', title: 'Saviors'},
    { letter: 'A', title: 'Animals'}
  ];

  constructor(private opsTypeService: OpsTypeService) {
    this.opsTypesSub = this.opsTypeService.opsTypesSubject.subscribe((opsTypes: OpsType[]) => {
      this.setup(opsTypes);
    });
  }

  ngOnInit(): void {
    this.setup(this.opsTypeService.opsTypes);
  }

  ngOnDestroy() {
    this.opsTypesSub.unsubscribe();
  }

  setup(opsTypes: OpsType[]) {
    this.opsType = this.opsTypeService.getOpsType(this.index);
    if (this.opsType) {
      // console.log("Type Dashboard Update - success, index=" + this.index, this.opsType);
      this.functions = this.opsType.functions;
      this.animals = this.opsType.animals;
    }
  }

}
