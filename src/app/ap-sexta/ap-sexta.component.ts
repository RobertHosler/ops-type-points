import { Component, Input, OnInit } from '@angular/core';
import { TypedPerson } from '../service/ops-data.service';
import { apModel } from '../model/ap-model';
import { searchModel } from '../search/search.model';

@Component({
  selector: 'app-ap-sexta',
  templateUrl: './ap-sexta.component.html',
  styleUrls: ['./ap-sexta.component.scss']
})
export class ApSextaComponent implements OnInit {

  @Input()
  typedPerson: TypedPerson;

  apType : {
    name: string;
    sexta: string;
    descriptionLink: string;
    sextaLink: string;
  };

  apSexta;

  searchModel = searchModel;
  
  ngOnInit(): void {
    this.apType = apModel.apTypeMap.get(this.typedPerson.apType);
    this.apSexta = searchModel.apSextas.get(this.apType.sexta);
  }


}
