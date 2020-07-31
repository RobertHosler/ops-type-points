import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeDescriptionService {
  constructor() {}

  getHumanNeed(saviorOne: string) {
    var result = 'Since this type is a';
    if (
      saviorOne === 'Fe' ||
      saviorOne === 'Fi' ||
      saviorOne === 'Te' ||
      saviorOne === 'Ti'
    ) {
      result += ` decider, they will be relatively balanced with control and chaos, 
        but feel stuck when it comes to self and tribe.`;
    } else if (
      saviorOne === 'Se' ||
      saviorOne === 'Si' ||
      saviorOne === 'Ne' ||
      saviorOne === 'Ni'
    ) {
      result += `n observer, they will be relatively balanced with self and tribe, 
        but feel stuck when it comes to control and chaos.`;
    } else {
      result = 'ErR0r';
    }
    return result;
  }

  getDecider(saviorOne: string, saviorTwo: string) {
    var deciderPriority;
    var deciderSecondary;
    var deciderType;
    if (saviorOne.startsWith('F') || saviorTwo.startsWith('F')) {
      deciderPriority = 'values';
      deciderSecondary = 'reasons';
      deciderType = 'feeler';
    } else {
      deciderPriority = 'reasons';
      deciderSecondary = 'values';
      deciderType = 'thinker';
    }
    var deciderMsg;
    if (
      saviorOne === 'Fi' ||
      saviorOne === 'Ti' ||
      saviorTwo === 'Fi' ||
      saviorTwo === 'Ti'
    ) {
      //Di
      deciderMsg = 'As an introverted ' + deciderType + 
        ', they will prioritize their own personal ' +
        deciderPriority +
        " first, then seek the spectrum of the tribe's " +
        deciderSecondary + ".";
    } else {
      //De
      deciderMsg = 'As an extroverted ' + deciderType + 
        ", they will prioritize the spectrum of the tribe's " +
        deciderPriority +
        " first, then seek their personal " +
        deciderSecondary + ".";
    }
    return deciderMsg;
  }

  getObserver(saviorOne: string, saviorTwo: string) {
    var observerPriority;
    var observerSecondary;
    var observerType;
    if (saviorOne.startsWith('N') || saviorTwo.startsWith('N')) {
      observerPriority = 'concepts';
      observerSecondary = 'facts';
      observerType = 'intuitive';
    } else {
      observerPriority = 'facts';
      observerSecondary = 'concepts';
      observerType = 'sens-sor';
    }
    var observerMsg;
    if (
      saviorOne === 'Si' ||
      saviorOne === 'Ni' ||
      saviorTwo === 'Si' ||
      saviorTwo === 'Ni'
    ) {
      //Oi
      observerMsg = 'As an introverted ' + observerType + 
      ", answers are found by going over the known " +
      observerPriority +
      " first, then gathering in new " +
      observerSecondary + " later.";
    } else {
      //Oe
      observerMsg = 'As an extroverted ' + observerType + 
      ", answers are found by gathering new " +
      observerPriority +
      " first, then organizing known " +
      observerSecondary + " later.";
    }
    return observerMsg;
  }
}
