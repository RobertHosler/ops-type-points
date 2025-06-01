import { Component, Input } from '@angular/core';
import { TypedPerson } from '../service/ops-data.service';
import { apModel } from '../model/ap-model';

@Component({
  selector: 'app-ap-shadow',
  templateUrl: './ap-shadow.component.html',
  styleUrls: ['./ap-shadow.component.scss']
})
export class ApShadowComponent {

  @Input()
  typedPerson: TypedPerson;

  apModel = apModel;

  apType: {
    name: string;
    sexta: string;
    descriptionLink: string;
    sextaLink: string;
  };

  aspects: string[];
  subtypes;

  ngOnInit(): void {
    this.apType = apModel.apTypeMap.get(this.typedPerson.apType);
    this.aspects = this.apType.name.split('');
    if (this.typedPerson.apSubtype) {
      this.subtypes = [];
      this.typedPerson.apSubtype.split('').forEach((subtype, index) => {
        const subtypeName = (index + 1) + '-' + subtype;
        const subTypeObj = apModel.subtypesMap.get(subtypeName);
        if (!subTypeObj) {
          return;
        }
        this.subtypes.push({
          name: subtypeName,
          type: subTypeObj.type,
          highContrast: subTypeObj.highContrast,
          description: subTypeObj.description
        });
      });
    }
  }

}
