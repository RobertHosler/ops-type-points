import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OpsTypeService } from '../ops-type.service';
import { Subscription } from 'rxjs';
import { OpsType } from '../ops-type';
import { Animal } from '../animal';

@Component({
  selector: 'app-type-visual',
  templateUrl: './type-visual.component.html',
  styleUrls: ['./type-visual.component.css'],
})
export class TypeVisualComponent implements OnInit, OnDestroy {

  opsTypes: OpsType[];
  private opsTypesSub: Subscription;

  optToyBaseUrl = 'https://opt-toy.now.sh/#?';

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
    this.opsTypes = opsTypes;
  }

  optToyLink():string {
    let path = "";
    this.opsTypes.forEach((opsType) => {
      path += ("type[]=" + opsType.opsCode + "&");
    });
    return this.optToyBaseUrl + path;
  }
}
