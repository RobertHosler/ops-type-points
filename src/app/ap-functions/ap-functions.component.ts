import { Component, Input } from '@angular/core';
import { TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-ap-functions',
  templateUrl: './ap-functions.component.html',
  styleUrls: ['./ap-functions.component.scss']
})
export class ApFunctionsComponent {
  
  @Input()
  typedPerson: TypedPerson;

  functions = [
    {
      name: "Lifepath",
      slots: [1,2],
      trap: "Arrogance",
      gift: "Personal Meaning"
    },
    {
      name: "Growing Edge",
      slots: [1,3],
      trap: "Entrapment",
      gift: "Liberation"
    },
    {
      name: "Resolution",
      slots: [1,4],
      trap: "Overlooking",
      gift: "Discernment"
    },
    
    {
      name: "Construction",
      slots: [2,3],
      trap: "Foreboding",
      gift: "Serenity"
    },
    {
      name: "Insight",
      slots: [2,4],
      trap: "Vagueness",
      gift: "Clarity"
    },
    {
      name: "Outsource",
      slots: [3,4],
      trap: "Implosion",
      gift: "Attainment"
    },
  ];

  learnMoreLink = 'https://www.attitudinalpsyche.com/theory/functions/';

  automatingForce(apFunction) {
    return apFunction.slots[0] + this.typedPerson.apType.charAt(apFunction.slots[0]-1) + ' -> ' +
    apFunction.slots[1] + this.typedPerson.apType.charAt(apFunction.slots[1]-1);
  }

  restrainedForce(apFunction) {
    return apFunction.slots[0] + this.typedPerson.apType.charAt(apFunction.slots[1]-1) + ' -> ' +
    apFunction.slots[1] + this.typedPerson.apType.charAt(apFunction.slots[0]-1);
  }

  slotsIllustration(apFunction) {
    let x = '____';
    x = this.replaceAt(x, apFunction.slots[0], apFunction.slots[0]);
    x = this.replaceAt(x, apFunction.slots[1], apFunction.slots[1]);
    return x.split('').join(' ');
  }

  replaceAt(string, index, replacement) {
    return string.substring(0, index-1) + replacement + string.substring(index);
}

}
