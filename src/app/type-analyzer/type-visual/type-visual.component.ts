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
  @Input('index') index: number = 0;

  opsType: OpsType;
  opsTypes: OpsType[];
  private opsTypesSub: Subscription;

  optToyLink: string;

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
    this.opsTypes = opsTypes;
    if (this.opsType) {
      this.setOptToyLink();
    } else {
      this.optToyLink = 'https://opt-toy.now.sh';
    }
  }

  setOptToyLink() {
    var base = 'https://opt-toy.now.sh/#?type[]=';
    this.optToyLink = base + this.opsType.opsCode;
  }
}
