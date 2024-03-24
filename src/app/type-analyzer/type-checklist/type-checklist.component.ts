import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { OpsType } from '../ops-type';
import { TypedPerson } from 'src/app/service/ops-data.service';

@Component({
  selector: 'app-type-checklist',
  templateUrl: './type-checklist.component.html',
  styleUrls: ['./type-checklist.component.scss'],
})
export class TypeChecklistComponent implements OnInit, OnChanges {
  @Input()
  opsType: OpsType;
  @Input()
  person: TypedPerson;

  coins: Coin[];

  showAll = true;

  //Human Needs
  obsDeciderCoin: Coin = {
    heading: 'Human Needs',
    sides: [
      {
        description: [
          'Stuck on info & pathways, not stuck on others point of view.',
          'Relatively balanced with self and tribe, but feels stuck when it comes to control and chaos.',
          'Worries about things, people are safe.',
        ],
        labels: ['Single Observer', 'IxxJ or ExxP', 'O/DD'],
      },
      {
        description: [
          'Stuck on people, judgment, fairness, not stuck on missing info.',
          'Relatively balanced with control and chaos, but feels stuck when it comes to self and tribe.',
          'Nervous about people, things are safe',
        ],
        labels: ['Single Decider', 'IxxP or ExxJ', 'D/OO'],
      },
    ],
  };

  selfTribeCoin: Coin = {
    sides: [
      {
        description: [
          "Me-story, what I want, I'm allowed, leaves the tribe behind.",
          "Prioritizes their personal values/reasons first, then seeks the spectrum of the tribe's values/reasons.",
          'Knows more about self vs others, me-story.',
          'Seeks Significance before Connection',
        ],
        labels: ['Di - Identity', 'Fi or Ti', 'Decider Introverted'],
      },
      {
        description: [
          'We-story, drags in others, void in what they want, not allowed.',
          "Prioritizes the spectrum of the tribe's values/reasons, then seeks their personal values/reasons.",
          'Knows more about others vs self, "frog in pocket".',
          'Seeks Connection before Significance',
        ],
        labels: ['De - Tribe', 'Fe or Te', 'Decider Extroverted'],
      },
    ],
  };

  organizeGatherCoin: Coin = {
    sides: [
      {
        description: [
          'Has a way, same story, concludes, narrows, shoves away new.',
          'Answers are found by going over known facts/concepts, then gathering in new facts/concepts later.',
          'Keeps circling back to the same known story, conclusions.',
          'Seeks Certainty before Variety',
        ],
        labels: ['Oi - Organize', 'Ni or Si', 'Observer Introverted'],
      },
      {
        description: [
          "Channel change, we'll see, wants control - but doesn't",
          'Answers are found by gathering new facts/concepts, then organizing known facts/concepts later.',
          'Keeps channel changing and interrupting self, variety.',
          'Seeks Variety before Certainty',
        ],
        labels: ['Oe - Gather', 'Ne or Se', 'Observer Extroverted'],
      },
    ],
  };

  //Letters
  feelingThinkingCoin: Coin = {
    heading: 'Letters',
    sides: [
      {
        description: [
          "Values, likes, hates, weak reasons, won't make it work",
          'Looks to prioritize/value of something, then figures out the reasons.',
          'Prioritizing, emotions, likes',
        ],
        labels: ['Feeling', 'Fi or Fe'],
      },
      {
        description: [
          'Works, get it done, logic, reasons, unowned emotions',
          'Looks to figure out the reasons of something, then figures out the priorities/values.',
          'Getting it done, reasons, what works',
        ],
        labels: ['Thinking', 'Ti or Te'],
      },
    ],
  };
  sensoryIntuitionCoin: Coin = {
    sides: [
      {
        description: [
          'Proving, gives facts, grounded, not jumping or summarizing',
          'Looks for the proveable facts first, then sees the abstract connections.',
          'Responsible to prove the case, tracks the facts',
        ],
        labels: ['Sensory', 'Si or Se'],
      },
      {
        description: [
          'Summarizing, categories, abstract, void in supporting facts',
          'Looks for abstract connections first, then sees the provable facts.',
          'Jumps to conclusions, tracks the patterns',
        ],
        labels: ['Intuition', 'Ni or Ne'],
      },
    ],
  };
  // Temperaments
  temperamentCoin: Coin = {
    sides: [
      {
        description: [
          'Sees the value in the physical world, then seeks to figure out the reasons in the abstract.',
        ],
        labels: ['SF', 'Popularity'],
      },
      {
        description: [
          'Figures out the reasons in the abstract world, then seeks to find the value in the physical.',
        ],
        labels: ['NT', 'Nerdy'],
      },
      {
        description: [
          'Sees the reasons in the physical world, then seeks to figure out the value in the abstract.',
        ],
        labels: ['ST', 'Reporter'],
      },
      {
        description: [
          'Sees the value in the abstract world, then seeks to figure out the reasons in the physical.',
        ],
        labels: ['NF', 'Hippie'],
      },
    ],
  };
  //Functions
  observerFunctions: Coin = {
    heading: 'Functions',
    sides: [
      {
        description: [
          'Answers are found by going over known facts, then gathering in new concepts later.',
          "Shoves away new concepts, understandings, and possibilities, so they can go over and refine their known, personal, facts.",
          // "Driven by the fear of 'anything can happen', the Si is constantly controlling things physically inside their box.",
          // "When they talk, they will not know they are just giving you the same facts and details about their limited life.",
          // "You will be left with the void of asking why, trying to understand, and showing them new possibilities.",
          // "The biggest fear for the Si is that some random chaos that they could never predict just drops out of the sky and wrecks everything they've built."
        ],
        labels: ['Si', 'Introverted Sensory'],
      },
      {
        description: [
          'Answers are found by gathering new concepts, then organizing known facts later.',
          "Has a hard time staying on one topic, narrowing down, and giving specific details.",
          // "Driven by the fear being physically controlled, the Ne is constantly scanning for new concepts, understandings, and possibilities.",
          // "When they talk, they will not even know they are jumping from category to category, giving you an understanding and overview, but not specific details.",
          // "You will be left with the void of having to create physical control to protect yourself.",
          // "The biggest fear for the Ne is that some control-freak has their physical information locked up."
        ],
        labels: ['Ne', 'Extroverted Intuition'],
      },
      {
        description: [
          'Answers are found by going over known concepts, then gathering in new facts later.',
          "Shoves away every new fact that they can't connect back to their old, personal, patterns.",
          // When they talk, they will not even know they are just telling the same story again and not giving specific details to prove what they are saying. You will be left with the void of asking for facts, details, and checking to see if they have seen this new information they somehow have ignored.",
          // "Driven by the fear of random physical chaos wrecking their way, the Ni is constantly stacking patterns onto their personal worldview. The biggest fear for the Ni, is that new facts collapse their outdated, abstract worldview they built inside their head."
        ],
        labels: ['Ni', 'Introverted Intuition'],
      },
      {
        description: [
          'Answers are found by gathering new facts, then organizing known concepts later.',
          "Has a hard time staying on one topic, narrowing down, and seeing how much this experience is just like all the ones before and after it.",
          // "Driven by the fear and desire for Ni-control, the Se is constantly scanning and giving facts in the hopes that someday they will find control.",
          // "When they talk, they will not even know they are giving you too many facts, examples, and are taking extra time proving everything.",
          // "You will be left with the void of making some guesses, conclusions, and simplifying down what they are saying to a known category.",
          // "The biggest fear for the Se, is to find out one day that even though 'it felt new' at the time, they were really just trapped running in the same circles."
        ],
        labels: ['Se', 'Extroverted Sensory'],
      },
    ],
  };
  deciderFunctions: Coin = {
    sides: [
      {
        description: [
          "Prioritizes their personal values first, then seeks the spectrum of the tribe's reasons.",
          "Shoves away all the work that the tribe needs help with, so they can do more of what they love.",
          // "Driven by the fear of not being useful for the tribe, the Fi is going all in on what they love, in hopes others will see their passion and then somehow do the work for them.",
          // "When they talk, they won't even know how much they are grunting out what they love and hate.",
          // "You will be left with the void of asking how it works, what are they going to get done.",
          // "The biggest fear for the Fi is that the tribe tells them what they love is stupid and they are going to have to do work they hate to actually be valuable."
        ],
        labels: ['Fi', 'Introverted Feeling'],
      },
      {
        description: [
          "Prioritizes the spectrum of the tribe's reasons, then seeks their personal values.",
          "Has a hard time narrowing in on all the things that need to be done, and picking the one that has a higher value for themselves.",
          // "Driven by the fear of not being self-loved, the Te will do all the tribe work so everyone has to love them.",
          // "When they talk, they don't even realize how much they are just reporting what other people are doing.",
          // "You will be left with the void of asking what is important to them and how they are feeling.",
          // "The biggest fear for the Te is that they get all the hard work done, and still no one loves them."
        ],
        labels: ['Te', 'Extroverted Thinking'],
      },
      {
        description: [
          "Prioritizes their personal reasons first, then seeks the spectrum of the tribe's values.",
          "Shoves away what everyone else loves and wants to do, so they can work on what they know is true for them.",
          // "Driven by the fear of not being emotionally connected to the tribe, the Ti will build something amazing so others have to love them.",
          // "When they talk, they won't even realize how emotionally uncomfortable everyone is because they are just going on about what they are working on.",
          // "The biggest fear for the Ti is that they spend years figuring out the truth, building something amazing, only to find the tribe doesn't even care."
        ],
        labels: ['Ti', 'Introverted Thinking'],
      },
      {
        description: [
          "Prioritizes the spectrum of the tribe's values, then seeks their personal reasons.",
          "Has a hard time narrowing down on what everyone loves, and going with what they know to be true (even though everyone will hate that).",
          // "Driven by the fear of not figuring out the truth for themselves, the Fe will constantly try to make everyone happy so they can help them with their personal work.",
          // "When they talk, they have no idea how much they are embarrassing themselves by desperately trying to make everyone happy.",
          // "The biggest fear for the Fe is to realize that all those years of caring about others have left them insecure and unable to make things work for themselves."
        ],
        labels: ['Fe', 'Extroverted Feeling'],
      },
    ],
  };
  //Animals
  animalsCoin: Coin = {
    heading: 'Animals',
    sides: [
      {
        description: [
          "Same story about self, processed, resolved, won't jump in",
          'Process and preserves energy for self, before expending energy for the tribe',
          'Same old story about me, processed, work alone',
          'Introverted Energy Animal',
        ],
        labels: ['Sleep', 'Di + Oi'],
      },
      {
        description: [
          "Random story about others, unresolved, won't hit the brakes",
          'Expends energy for the tribe, before processing and preserving energy for self.',
          'Random story about others, process & do with others',
          'Extroverted Energy Animal',
        ],
        labels: ['Play', 'De + Oe'],
      },
      {
        description: [
          "Random story about self, takes you along, trails off, not ready",
          'Takes in and respects info, before getting started and teaching.',
          'Random story about me, pile for me, savor',
          'Introverted Information Animal',
        ],
        labels: ['Consume', 'Oe + Di'],
      },
      {
        description: [
          "Same story about others, lessons, jumps in, overextended",
          'Gets started and is able to teach, before respecting and gathering info.',
          'Same old story about others, can talk, produce',
          'Extroverted Information Animal',
        ],
        labels: ['Blast', 'De + Oi'],
      },
    ],
  };
  animalsCombinedCoin: Coin = {
    sides: [
      {
        description: ['Deep inner world of taking in info and processing.'],
        labels: ['SC', 'Sleep + Consume'],
      },
      {
        description: ['Over gathers then wants to do something with it.'],
        labels: ['CP', 'Consume + Play'],
      },
      {
        description: ['Expends energy and shares knowledge.'],
        labels: ['PB', 'Play + Blast'],
      },
      {
        description: ['Reworks same info and then shares knowledge.'],
        labels: ['BS', 'Blast + Sleep'],
      },
    ],
  };
  infoEnergyCoin: Coin = {
    sides: [
      {
        description: [
          "Balance in learning and sharing info, works/rests in swings",
          'Relative balance in conversations, knowledge is power',
          'Imbalanced with work and rest, over or under exert',
          'Blast and Consume in top 3 animals, Play or Sleep last.',
        ],
        labels: ['Info Dominant'],
      },
      {
        description: [
          "Balance in work and rest, learns/talks in swings",
          'Relative balance with work and rest, goofy',
          'Imbalanced in conversations, overshare or undershare information',
          'Play and Sleep in top 3 animals, Consume or Blast last.',
        ],
        labels: ['Energy Dominant'],
      },
    ],
  };
  extroversionCoin: Coin = {
    sides: [
      {
        description: [
          'Always "kicked" by the tribe to talk and move, outbursts later.',
          'Play or Blast last.',
        ],
        labels: ['Introverted'],
      },
      {
        description: [
          "Always tiring out self and tribe, then crashes later.",
          'Sleep or Consume last.',
        ],
        labels: ['Extroverted'],
      },
    ],
  };
  //Modalities
  deModalitiesCoin: Coin = {
    heading: 'Modalities',
    sides: [
      {
        description: [
          'Moveable with the tribe, direct on identity.',
          'Pressure on self, easy on others.',
        ],
        labels: ['De Feminine'],
      },
      {
        description: [
          'Direct with the tribe, moveable on identity.',
          'Pressure on others, easy on self.',
        ],
        labels: ['De Masculine'],
      },
    ],
  };
  sensoryModalitiesCoin: Coin = {
    sides: [
      {
        description: [
          'Solid with the concepts, moveable with the facts.',
          'Visual/Tester, visualizes pictures.',
        ],
        labels: ['S Feminine'],
      },
      {
        description: [
          'Solid with the facts, moveable with the concepts.',
          'Audio/Kinesthetic, knows timeline.',
        ],
        labels: ['S Masculine'],
      },
    ],
  };

  socialCoin1: Coin = {
    heading: 'Social',
    sides: [
      {
        description: [
          'Ownership, make it happen, no excuses, results.',
          'Entrepreneurs or managers, Broad responsibility, Neglecting any specific area.',
        ],
        labels: ['Responsibility'],
      },
      {
        description: [
          'Focus in on the task, productive in this one area.',
          'Technicians or Specialists, Responsibility focused on a niche, Neglecting larger whole.',
        ],
        labels: ['Specialize'],
      },
    ],
  };

  socialCoin2: Coin = {
    sides: [
      {
        description: [
          'Ego, be the best, at the top, identity goals, legendary.',
          'Stand out, Rise above the crowd, Flexing ability.',
        ],
        labels: ['Flex'],
      },
      {
        description: [
          'Learn from others, move for others, care for others.',
          'Connecting, Family and Friends, Community.',
        ],
        labels: ['Friends'],
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.coins = [];

    // Needs
    this.obsDeciderCoin.activeSide = this.opsType.observer ? 0 : 1;
    this.coins.push(this.obsDeciderCoin);
    this.selfTribeCoin.activeSide = this.opsType.diSavior ? 0 : 1;
    this.coins.push(this.selfTribeCoin);
    this.organizeGatherCoin.activeSide = this.opsType.oiSavior ? 0 : 1;
    this.coins.push(this.organizeGatherCoin);

    // Letters / Temperaments
    switch (this.opsType.temperament) {
      case 'SF':
        this.feelingThinkingCoin.activeSide = 0;
        this.sensoryIntuitionCoin.activeSide = 0;
        this.temperamentCoin.activeSide = 0;

        break;
      case 'NT':
        this.feelingThinkingCoin.activeSide = 1;
        this.sensoryIntuitionCoin.activeSide = 1;
        this.temperamentCoin.activeSide = 1;
        break;
      case 'ST':
        this.feelingThinkingCoin.activeSide = 1;
        this.sensoryIntuitionCoin.activeSide = 0;
        this.temperamentCoin.activeSide = 2;
        break;
      case 'NF':
        this.feelingThinkingCoin.activeSide = 0;
        this.sensoryIntuitionCoin.activeSide = 1;
        this.temperamentCoin.activeSide = 3;
        break;
    }
    this.coins.push(this.feelingThinkingCoin);
    this.coins.push(this.sensoryIntuitionCoin);
    this.coins.push(this.temperamentCoin);

    // Functions
    switch (this.opsType.getSaviorObserver().name) {
      case 'Si':
        this.observerFunctions.activeSide = 0;
        break;
      case 'Ne':
        this.observerFunctions.activeSide = 1;
        break;
      case 'Ni':
        this.observerFunctions.activeSide = 2;
        break;
      case 'Se':
        this.observerFunctions.activeSide = 3;
        break;
    }
    switch (this.opsType.getSaviorDecider().name) {
      case 'Fi':
        this.deciderFunctions.activeSide = 0;
        break;
      case 'Te':
        this.deciderFunctions.activeSide = 1;
        break;
      case 'Ti':
        this.deciderFunctions.activeSide = 2;
        break;
      case 'Fe':
        this.deciderFunctions.activeSide = 3;
        break;
    }
    this.coins.push(this.observerFunctions);
    this.coins.push(this.deciderFunctions);

    // Animals
    this.configAnimals(0);
    this.configAnimals(1);
    this.configAnimals(2);
    this.configAnimals(3);
    this.coins.push(this.animalsCoin);

    switch (this.opsType.getSaviorDecider().name) {
      case 'Fi':
        this.animalsCombinedCoin.activeSide = 0;
        break;
      case 'Te':
        this.animalsCombinedCoin.activeSide = 1;
        break;
      case 'Ti':
        this.animalsCombinedCoin.activeSide = 2;
        break;
      case 'Fe':
        this.animalsCombinedCoin.activeSide = 3;
        break;
    }
    let lastAnimal = this.opsType.animalStack[3];
    if (lastAnimal !== '?') {
      this.infoEnergyCoin.activeSide = this.opsType.infoDom ? 0 : 1;
      this.coins.push(this.infoEnergyCoin);
    }
    this.animalsCombinedCoin.activeSide = -1;
    if (this.opsType.sleepSavior && this.opsType.consumeSavior) {
      this.animalsCombinedCoin.activeSide = 0;
    } else if (this.opsType.playSavior && this.opsType.consumeSavior) {
      this.animalsCombinedCoin.activeSide = 1;
    } else if (this.opsType.sleepSavior && this.opsType.blastSavior) {
      this.animalsCombinedCoin.activeSide = 3;
    } else if (this.opsType.playSavior && this.opsType.blastSavior) {
      this.animalsCombinedCoin.activeSide = 2;
    }
    if (this.animalsCombinedCoin.activeSide !== -1) {
      this.coins.push(this.animalsCombinedCoin);
    }

    // Extroversion
    this.extroversionCoin.activeSide = -1;
    if (this.opsType.playLast || this.opsType.blastLast) {
      this.extroversionCoin.activeSide = 0;
    } else if (this.opsType.sleepLast || this.opsType.consumeLast) {
      this.extroversionCoin.activeSide = 1;
    }
    if (this.extroversionCoin.activeSide !== -1) {
      this.coins.push(this.extroversionCoin);
    }

    //Modalities
    this.deModalitiesCoin.activeSide = -1;
    if (this.opsType.deModality === 'F') {
      this.deModalitiesCoin.activeSide = 0;
    } else if (this.opsType.deModality === 'M') {
      this.deModalitiesCoin.activeSide = 1;
    }
    this.sensoryModalitiesCoin.activeSide = -1;
    if (this.opsType.sensoryModality === 'F') {
      this.sensoryModalitiesCoin.activeSide = 0;
    } else if (this.opsType.sensoryModality === 'M') {
      this.sensoryModalitiesCoin.activeSide = 1;
    }
    if (this.deModalitiesCoin.activeSide > -1) {
      this.coins.push(this.deModalitiesCoin);
    }
    if (this.sensoryModalitiesCoin.activeSide > -1) {
      this.coins.push(this.sensoryModalitiesCoin);
    }
    if (this.person && this.person.socialType) {
      this.socialCoin1.activeSide = -1; // Responsibility (0) vs Specialize (1)
      if (this.person.socialType === '1' || this.person.socialType === '2') {
        this.socialCoin1.activeSide = 0;
      } else {
        this.socialCoin1.activeSide = 1;
      }
      if (this.socialCoin1.activeSide > -1) {
        this.coins.push(this.socialCoin1);
      }
      this.socialCoin2.activeSide = -1; // Flex (0) vs Friends (1)
      if (this.person.socialType === '1' || this.person.socialType === '3') {
        this.socialCoin2.activeSide = 0;
      } else {
        this.socialCoin2.activeSide = 1;
      }
      if (this.socialCoin2.activeSide > -1) {
        this.coins.push(this.socialCoin2);
      }
    }
  }

  configAnimals(index: number) {
    switch (this.opsType.animals[index].name) {
      case 'Sleep':
        this.animalsCoin.sides[0].activeLabel =
          this.opsType.animals[index].savior;
        break;
      case 'Play':
        this.animalsCoin.sides[1].activeLabel =
          this.opsType.animals[index].savior;
        break;
      case 'Consume':
        this.animalsCoin.sides[2].activeLabel =
          this.opsType.animals[index].savior;
        break;
      case 'Blast':
        this.animalsCoin.sides[3].activeLabel =
          this.opsType.animals[index].savior;
        break;
    }
  }
}

class Coin {
  heading?: string;
  sides: CoinSide[];
  activeSide?: number;
}

class CoinSide {
  description: string[];
  labels: string[];
  activeLabel?: string;
}
