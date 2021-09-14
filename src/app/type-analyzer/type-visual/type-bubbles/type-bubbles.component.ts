import { Component, OnInit, Input } from '@angular/core';
import { OpsType } from '../../ops-type';
import { OpsTypeService } from '../../ops-type.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-type-bubbles',
  templateUrl: './type-bubbles.component.html',
  styleUrls: ['./type-bubbles.component.scss'],
})
export class TypeBubblesComponent implements OnInit {

  @Input()
  opsTypes: OpsType[];

  private opsTypesSub: Subscription;

  @Input() index: number;
  @Input() showShadows: boolean = true;
  @Input() showOptiCode: boolean = false;
  @Input() showAnimals: boolean = true;
  @Input() showFunctions: boolean = true;
  @Input() showType: boolean = true;
  @Input() showOptions: boolean = true;
  
  sizing: string = 'activation';

  constructor(private opsTypeService : OpsTypeService) {
  }

  ngOnInit(): void {
    if (!this.opsTypes) {
      this.opsTypesSub = this.opsTypeService.opsTypesSubject.subscribe((opsTypes: OpsType[]) => {
        this.configureOpsTypes(opsTypes);
      });
      this.configureOpsTypes(this.opsTypeService.opsTypes);
    }
  }

  ngOnDestroy() {
    if (this.opsTypesSub) {
      this.opsTypesSub.unsubscribe();
    }
  }

  configureOpsTypes(opsTypeList: OpsType[]) {
    if (this.index === null || this.index === undefined) {
      this.opsTypes = opsTypeList;
    } else {
      let opsType = opsTypeList[this.index];
      this.opsTypes = [opsType];
    }
  }

}