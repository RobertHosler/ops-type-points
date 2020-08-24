import { Component, OnInit, Input } from '@angular/core';
import { OpsType } from '../../ops-type';
import { Animal } from '../../animal';
import { OpsTypeService } from '../../ops-type.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-type-bubbles',
  templateUrl: './type-bubbles.component.html',
  styleUrls: ['./type-bubbles.component.css'],
})
export class TypeBubblesComponent implements OnInit {
  
  opsTypes: OpsType[];
  private opsTypesSub: Subscription;

  showShadows: boolean = true;
  showOptiCode: boolean = false;
  sizing: string = 'activation';

  constructor(private opsTypeService : OpsTypeService) {
    this.opsTypesSub = this.opsTypeService.opsTypesSubject.subscribe((opsTypes: OpsType[]) => {
      this.opsTypes = opsTypes;
    });
  }

  ngOnInit(): void {
    this.opsTypes = this.opsTypeService.opsTypes;
  }

  ngOnDestroy() {
    this.opsTypesSub.unsubscribe();
  }

}