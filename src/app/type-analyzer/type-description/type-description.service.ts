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
      deciderMsg =
        'As an introverted ' +
        deciderType +
        ', they will prioritize their own personal ' +
        deciderPriority +
        " first, then seek the spectrum of the tribe's " +
        deciderSecondary +
        '.';
    } else {
      //De
      deciderMsg =
        'As an extroverted ' +
        deciderType +
        ", they will prioritize the spectrum of the tribe's " +
        deciderPriority +
        ' first, then seek their personal ' +
        deciderSecondary +
        '.';
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
      observerType = 'sensor';
    }
    var observerMsg;
    if (
      saviorOne === 'Si' ||
      saviorOne === 'Ni' ||
      saviorTwo === 'Si' ||
      saviorTwo === 'Ni'
    ) {
      //Oi
      observerMsg =
        'As an introverted ' +
        observerType +
        ', answers are found by going over the known ' +
        observerPriority +
        ' first, then gathering in new ' +
        observerSecondary +
        ' later.';
    } else {
      //Oe
      observerMsg =
        'As an extroverted ' +
        observerType +
        ', answers are found by gathering new ' +
        observerPriority +
        ' first, then organizing known ' +
        observerSecondary +
        ' later.';
    }
    return observerMsg;
  }

  getEnergyAnimal(animals: string) {
    var playIndex = animals.indexOf('P');
    var sleepIndex = animals.indexOf('S');
    var energyMsg;
    if (playIndex < sleepIndex) {
      //Play before Sleep
      energyMsg =
        'Expends energy for the tribe, before processing and preserving energy for the self.';
    } else if (playIndex > sleepIndex) {
      //Sleep before Play
      energyMsg = `Process and preserves energy for self, 
        before expending energy for the tribe.`;
    } else {
      energyMsg = 'Error';
    }
    return energyMsg;
  }

  getInfoAnimal(animals: string) {
    var blastIndex = animals.indexOf('B');
    var consumeIndex = animals.indexOf('C');
    var infoMsg;
    if (blastIndex < consumeIndex) {
      //Blast before consume
      infoMsg = `Gets started and is able to teach, 
        before respecting and gathering info. 
        `;
    } else if (blastIndex > consumeIndex) {
      infoMsg = `Takes in and respects info, 
        before getting started and teaching.
        `;
    } else {
      infoMsg = 'Error';
    }
    return infoMsg;
  }

  getAnimalDominance(animals: string) {
    var blastIndex = animals.indexOf('B');
    var consumeIndex = animals.indexOf('C');
    var dominanceMsg;
    if (blastIndex < 3 && consumeIndex < 3) {
      //info dominant
      dominanceMsg = `Having blast and consume in the top 3 animals, this type is info
        dominant.  They are balanced on the taking in and teaching of information.`;
    } else {
      //energy dominant
      dominanceMsg = `Having play and sleep in the top 3 animals, this type is energy
        dominant.  They are balanced on the expenditure and preservation of energy.`;
    }
    return dominanceMsg;
  }

  getSaviorAnimal(animals: string) {
    var blastIndex = animals.indexOf('B');
    var consumeIndex = animals.indexOf('C');
    var playIndex = animals.indexOf('P');
    var sleepIndex = animals.indexOf('S');
    var sAnimalMsg = '';
    if (consumeIndex < 3 && sleepIndex < 3) {
      //CS - mope
      sAnimalMsg = `Deep inner world of taking in info and processing.`;
    }
    if (blastIndex < 3 && sleepIndex < 3) {
      //BS
      if (sAnimalMsg) {
        sAnimalMsg += ' ';
      }
      sAnimalMsg += `Reworks same info and then shares knowledge.`;
    }
    if (blastIndex < 3 && playIndex < 3) {
      //BP
      if (sAnimalMsg) {
        sAnimalMsg += ' ';
      }
      sAnimalMsg += `Expends energy and shares knowledge.`;
    }
    if (consumeIndex < 3 && playIndex < 3) {
      //CP - skib
      if (sAnimalMsg) {
        sAnimalMsg += ' ';
      }
      sAnimalMsg += `Over gathers then wants to do something with it.`;
    }
    return sAnimalMsg;
  }

  //TODO - possible refactor to seperate tab with I E I E order.
  getExtroversionScale(animals: string) {
    var blastIndex = animals.indexOf('B');
    var consumeIndex = animals.indexOf('C');
    var playIndex = animals.indexOf('P');
    var sleepIndex = animals.indexOf('S');
    var eScaleMsg;
    if (blastIndex === 3 || playIndex === 3) {
      eScaleMsg = `This type is considered an overall introvert since they have two introverted animals
        and are missing an extroverted animal.`;
    } else {
      eScaleMsg = `This type is considered an overall extrovert since they have two extroverted animals
        and are missing an introverted animal.`;
    }
    return eScaleMsg;
  }

  getExDecider(exDeMod: string) {
    var exDeModMsg;
    if (exDeMod === 'M') {
      exDeModMsg = `Direct with the tribe, moveable on identity.`;
    } else {
      exDeModMsg = `Moveable with the tribe, direct on identity.`;
    }
    return exDeModMsg;
  }

  getSensoryMod(sMod: string) {
    var sModMsg;
    if (sMod === 'M') {
      sModMsg = `Solid with the facts, moveable with the concepts.
      Kinesthetic & audio modalities. 
      `;
    } else {
      sModMsg = `Solid with the concepts, moveable with the facts.
      Tester and visual modalities.
      `;
    }
    return sModMsg;
  }

  getLearningStyle(mod: string) {
    var styleString = 'This type tends to prefer the ';
    if (mod === 'FF') {
      styleString += 'Tester learning style.';
      // will want to try things out and play with things before going all in on something.'
    } else if (mod === 'FM') {
      styleString += 'Visual learning style.';
    } else if (mod === 'MM') {
      styleString += 'Kinesthetic learning style.';
    } else if (mod === 'MF') {
      styleString += 'Audio learning style.';
    }
    return styleString;
  }
}
