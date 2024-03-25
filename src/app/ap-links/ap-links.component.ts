import { Component, Input } from '@angular/core';
import { apModel } from '../model/ap-model';
import { TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-ap-links',
  templateUrl: './ap-links.component.html',
  styleUrls: ['./ap-links.component.scss']
})
export class ApLinksComponent {

  @Input()
  typedPerson: TypedPerson;

  apModel = apModel;
  aspects : string[];
  
  apType : {
    name: string;
    sexta: string;
    descriptionLink: string;
    sextaLink: string;
  };
  
  ngOnInit(): void {
    this.apType = apModel.apTypeMap.get(this.typedPerson.apType);
    this.aspects = this.apType.name.split('');
  }

}
