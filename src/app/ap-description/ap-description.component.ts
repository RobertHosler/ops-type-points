import { Component, Input, OnInit } from '@angular/core';
import { TypedPerson } from '../service/ops-data.service';
import { apModel } from '../model/ap-model';

@Component({
  selector: 'app-ap-description',
  templateUrl: './ap-description.component.html',
  styleUrls: ['./ap-description.component.scss']
})
export class ApDescriptionComponent implements OnInit {

  @Input()
  typedPerson: TypedPerson;

  aspects : string[];

  apType : {
    name: string;
    sexta: string;
    descriptionLink: string;
    sextaLink: string;
  };

  apModel = apModel;

  positions = [
    {
      name: 'Confident',
      description: ''
    },
    {
      name: 'Flexible',
      description: ''
    },
    {
      name: 'Insecure',
      description: ''
    },
    {
      name: 'Unbothered',
      description: ''
    },
  ];


  
  ngOnInit(): void {
    this.apType = apModel.apTypeMap.get(this.typedPerson.apType);
    this.aspects = this.apType.name.split('');
    this.aspects.forEach((aspect, index) => {
      aspect = apModel.aspectMap.get(aspect).name;
      let description = '';
      switch (index) {
        case 0:
          description = 'I have ' + aspect + ' managed, I’m uninterested in the input/feedback/opinions of others. I do not like unsolicited advice about ' + aspect + 
          ' and I’m unlikely to solicit advice about it. I take what I want from the world in relation to ' + aspect + '.';
          break;
        case 1:
          description = 'I have ' + aspect + ' managed, but I’m curious and interested in the input/feedback/opinions of others, even if unsolicited. I can choose to get on the wave or just watch it and observe it with others.';
          break;
        case 2:
          description = 'I do not have ' + aspect + ' managed. I’m doubtful/unsure/uncertain about ' + aspect + '. Sometimes I’m curious about others’ input/feedback/opinions but only when solicited and even then, I may still be skeptical. I do not like unsolicited advice about ' 
            + aspect + '. I cannot control ' + aspect + ' naturally unless I pay extreme attention to it.'
          break;
        case 3:
          description = 'I may or may not have ' + aspect + ' managed, but it doesn’t matter much to me. Sometimes I’m interested in the input/feedback/opinions of others about ' + aspect + 
          ', even if unsolicited. I give away ' + aspect + ' freely to the world. I don’t need it unless it is imperative to my survival.';
          break;
      }
      this.positions[index].description = description;
    });
  }

}
