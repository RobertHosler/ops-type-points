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
      result += ` Decider, they will be relatively balanced with control and chaos, 
        but feel stuck when it comes to self and tribe. The ability to move back and
        forth on Observations is what is called 'Double Observing' and all deciders
        are also 'Double Observers'. This means they will be able to observe the facts
        and abstract patterns in a relative balance, compared to being able to make 
        decisions with values and reasons.`;
    } else if (
      saviorOne === 'Se' ||
      saviorOne === 'Si' ||
      saviorOne === 'Ne' ||
      saviorOne === 'Ni'
    ) {
      result += `n Observer, they will be relatively balanced with self and tribe, 
        but feel stuck when it comes to control and chaos. The ability to move back
        and forth on decisions is what is called 'Double Deciding' and observers
        are all 'Double Deciders'. This means they will be able to decide for 
        themselves and for the tribe in a relative balance, compared to their ability 
        to observe and deal with control and chaos.`;
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
      deciderType = 'feelers';
    } else {
      deciderPriority = 'reasons';
      deciderSecondary = 'values';
      deciderType = 'thinkers';
    }
    var deciderMsg;
    var saviorD;
    if (
      saviorOne === 'Fi' ||
      saviorOne === 'Ti' ||
      saviorTwo === 'Fi' ||
      saviorTwo === 'Ti'
    ) {
      var self;
      var tribe;
      if (deciderType === 'feelers') {
        saviorD = 'Fi';
        self = 'is valuable';
        tribe = 'makes sense';
      } else {
        saviorD = 'Ti';
        self = 'makes sense';
        tribe = 'is valuable';
      }
      //Di
      deciderMsg =
        'When making a decision, introverted ' +
        deciderType +
        ' will prioritize their own personal ' +
        deciderPriority +
        " first, then seek the spectrum of the tribe's " +
        deciderSecondary +
        '. Savior ' +
        saviorD +
        ' will prefer to first ask themselves what ' +
        self +
        ', before asking for the tribe’s input on whether it ' +
        tribe +
        '.';
    } else {
      var tribe;
      var self;
      if (deciderType === 'feelers') {
        saviorD = 'Fe';
        tribe = 'if something is valuable';
        self = 'makes sense';
      } else {
        saviorD = 'Te';
        tribe = 'to figure out how things work';
        self = 'is valuable';
      }
      //De
      deciderMsg =
        'When making a decision, extroverted ' +
        deciderType +
        " will prioritize the spectrum of the tribe's " +
        deciderPriority +
        ' first, then seek their personal ' +
        deciderSecondary +
        '. Savior ' +
        saviorD +
        ' will prefer to first ask the tribe ' +
        tribe +
        ', before asking themselves whether it ' +
        self +
        ' to them.';
    }
    if (deciderType === 'feelers') {
      deciderMsg += ` Those that have Savior Feeling will generally struggle with 
      figuring out how things work, instead choosing to process the feelings and values.`;
    } else {
      deciderMsg += ` Those that have Savior Thinking will generally struggle with 
      processing the feelings and values, instead choosing to figure out how things work.`;
    }
    return deciderMsg;
  }

  getObserver(saviorOne: string, saviorTwo: string) {
    var observerPriority;
    var observerPriority2;
    var observerSecondary;
    var observerSecondary2;
    var observerType;
    if (saviorOne.startsWith('N') || saviorTwo.startsWith('N')) {
      observerPriority = 'concepts';
      observerPriority2 = 'patterns';
      observerSecondary = 'facts';
      observerSecondary2 = 'information';
      observerType = 'intuitives';
    } else {
      observerPriority = 'facts';
      observerPriority2 = 'information';
      observerSecondary = 'concepts';
      observerSecondary2 = 'patterns';
      observerType = 'sensors';
    }
    var observerMsg;
    var saviorO;
    if (
      saviorOne === 'Si' ||
      saviorOne === 'Ni' ||
      saviorTwo === 'Si' ||
      saviorTwo === 'Ni'
    ) {
      if (observerType === 'sensors') {
        saviorO = 'Si';
      } else {
        saviorO = 'Ni';
      }
      //Oi
      observerMsg =
        'In terms of observing, introverted ' +
        observerType +
        ' look to find answers by going over and developing the known ' +
        observerPriority +
        ' first, then gathering in new ' +
        observerSecondary +
        ' later. ' +
        saviorO +
        ' is responsible for narrowing down and limiting new ' +
        observerSecondary +
        ' coming in. When solving problems, the Savior ' +
        saviorO +
        ' will prefer to find answers in ' +
        observerPriority2 +
        ' they are already familiar with, as opposed to seeking out new ' +
        observerSecondary2 +
        '. They tend to seek control by planning and organizing the same known ' +
        observerPriority2 +
        ' again and again to create order.';
    } else {
      if (observerType === 'sensors') {
        saviorO = 'Se';
      } else {
        saviorO = 'Ne';
      }
      //Oe
      observerMsg =
        'In terms of observing, extroverted ' +
        observerType +
        ' look to find answers by gathering new ' +
        observerPriority +
        ' first, then organizing known the ' +
        observerSecondary +
        ' later. Savior ' +
        saviorO +
        ' is responsible to see the different ' +
        observerPriority2 +
        ' in the world and gets frustrated when having to go back to a routine or the same old ' +
        observerSecondary2 +
        '. When solving problems, the Savior ' +
        saviorO +
        ' will prefer to seek out new experiences and new sources to find more ' +
        observerPriority2 +
        `. They tend to seek freedom, and 
        will not readily accept that they already have answers in their known ` +
        observerSecondary2 +
        '.';
    }
    if (observerType === 'sensors') {
      observerMsg += ` Those that have Savior Sensing will generally struggle with understanding 
          or trusting the causes or the “why” behind things that occur, prefering to focus on the 
          facts, details, data, and statistics of what is actually trackable in reality.`;
    } else {
      observerMsg += ` Those that have Savior Intuition will generally struggle with tracking the 
          details or trusting the facts of a situation, prefing to instead focus on why things are
          connected through abstract groupings and contextual pattern recognition.`;
    }
    return observerMsg;
  }

  getEnergyAnimal(animals: string) {
    var playIndex = animals.indexOf('P');
    var sleepIndex = animals.indexOf('S');
    var energyMsg;
    if (playIndex < sleepIndex) {
      //Play before Sleep
      energyMsg = `Play savior types tend to expend energy for the tribe, before processing
        and preserving energy for the self. Play is the Extroverted Energy Animal, and is 
        responsible for getting things done while learning from the tribe. Those that have 
        this high are constantly moving, going, taking action, and trying to work with others. 
        They tend to have a difficult time with wasting energy earlier on in the day, and may 
        need to crash later on in the evenings.  Since they have Sleep low they will generally
        have a harder time stopping themselves and protecting their energy and the energy of
        those around them.`;
    } else if (playIndex > sleepIndex) {
      //Sleep before Play
      energyMsg = `Sleep savior types tend to process and preserves energy for self, 
        before expending energy for the tribe. Sleep is the Introverted Energy Animal, and 
        is responsible for stopping to go back over known information. Those that have this 
        are constantly putting on the brakes to protect themselves and preserve their energy. 
        They tend to have a difficult time with getting things done earlier on in the day, 
        and may spike in their energy later on in the evenings. Since they have Play low
        they will generally have a harder time performing tasks such as driving, shopping, 
        or chores that require gathering and interacting with others.`;
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
      infoMsg = `Blast savior types tend to get started and and teach to the tribe, 
        before respecting and gathering info for the self. Blast is the Extroverted 
        Information Animal, and is responsible for taking their same known organized 
        information and sharing it or teaching it. Those that have this high are quick 
        to communicate and get projects started as it isn’t necessary for them to gather 
        in all the information first.  They will often unconsciously consume information 
        and re-share it before they own it or know where it came from. Those with Consume 
        low will often have a shallow understanding of information, 
        and are more willing to teach what they know even if the information isn’t valuable.
        `;
    } else if (blastIndex > consumeIndex) {
      infoMsg = `Consume savior types tend to take in and respects info for the self, 
        before getting started and teaching to the tribe. Consume is the Introverted 
        Information Animal, and is responsible for taking in new information that they 
        are interested in.  Those that have this high are constantly bored with old 
        information and seek new things about what they love to learn. They tend to 
        have a difficult time starting projects because there is never enough new 
        information to gather, often not finishing and moving on to the next thing. 
        Those with Blast low will often have a very difficult time communicating or 
        getting new projects started.
        `;
    } else {
      infoMsg = 'Error';
    }
    return infoMsg;
  }

  getAnimalDominance(animals: string) {
    var blastIndex = animals.indexOf('B');
    var consumeIndex = animals.indexOf('C');
    var playIndex = animals.indexOf('P');
    var dominanceMsg;
    if (blastIndex < 3 && consumeIndex < 3) {
      //info dominant
      dominanceMsg = `Having blast and consume in the top 3 animals, this type is info
        dominant.  They are balanced on the taking in and teaching of information and
        have an imbalance in the preservation and expenditure
        of energy. `;
      if (playIndex === 3) {
        dominanceMsg += `Play last types are all in on preserving energy for the self
        and will avoid expending energy for the tribe.`;
      } else {
        dominanceMsg += `Sleep last types are all in on expending energy for the tribe
        and will avoid preserving energy for the self.`;
      }
    } else {
      //energy dominant
      dominanceMsg = `Having play and sleep in the top 3 animals, this type is energy
        dominant.  They are balanced on the expenditure of energy for the tribe and
        the preservation of energy for the self and have an imbalance in the taking
        in and teaching of information. `;
      if (blastIndex === 3) {
        dominanceMsg += `Blast last types are all in on taking in and respecting info
            for the self and will avoid getting started and teaching for the tribe.`;
      } else {
        dominanceMsg += `Consume last types are all in on getting started and teaching
            for the tribe and will avoid taking in and respecting info for the self.`;
      }
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
    //TODO: add note about last animals being something they will avoid.
    //Ex: BS last will avoid working the same info and sharing with the tribe
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
    } else if (consumeIndex === 3 || sleepIndex === 3) {
      eScaleMsg = `This type is considered an overall extrovert since they have two extroverted animals
        and are missing an introverted animal.`;
    } else {
      eScaleMsg = 'Extroversion scale message failed.';
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
      styleString += `Tester learning style. This learning style prefers sampling and trying out different things
          before going all in on something.`;
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
