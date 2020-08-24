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
  private opsTypesSub: Subscription;

  optToyLink: string;

  feeling: Function;
  thinking: Function;
  sensing: Function;
  intuition: Function;

  blast: Animal;
  consume: Animal;
  play: Animal;
  sleep: Animal;

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
      this.setOptToyLink();
      this.opsType.animals.forEach((a) => {
        if (a.shortName === 'S') {
          this.sleep = a;
        } else if (a.shortName === 'P') {
          this.play = a;
        } else if (a.shortName === 'C') {
          this.consume = a;
        } else if (a.shortName === 'B') {
          this.blast = a;
        }
      });
    } else {
      this.optToyLink = 'https://opt-toy.now.sh';
    }
  }

  setOptToyLink() {
    var base = 'https://opt-toy.now.sh/#?type[]=';
    this.optToyLink = base + this.opsType.opsCode;
  }
}
