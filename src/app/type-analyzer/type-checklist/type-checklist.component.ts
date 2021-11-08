  import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { OpsType } from '../ops-type';

@Component({
  selector: 'app-type-checklist',
  templateUrl: './type-checklist.component.html',
  styleUrls: ['./type-checklist.component.scss'],
})
export class TypeChecklistComponent implements OnInit, OnChanges {
  @Input()
  opsType: OpsType;

  coins: Coin[];

  showAll = false;

  //Human Needs
  obsDeciderCoin: Coin = {
    heading: 'Human Needs',
    sides: [
      {
        description: [
          'Relatively balanced with self and tribe, but feels stuck when it comes to control and chaos.',
          'Worries about things, people are safe.',
        ],
        labels: ['Single Observer', 'IxxJ or ExxP', 'O/DD'],
      },
      {
        description: [
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
          "Prioritizes their personal values/reasons first, then seeks the spectrum of the tribe's values/reasons.",
          'Knows more about self vs others, me-story.',
          'Seeks Significance before Connection',
        ],
        labels: ['Di - Identity', 'Fi or Ti', 'Decider Introverted'],
      },
      {
        description: [
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
          'Answers are found by going over known facts/concepts, then gathering in new facts/concepts later.',
          'Keeps circling back to the same known story, conclusions.',
          'Seeks Certainty before Variety',
        ],
        labels: ['Oi - Organize', 'Ni or Si', 'Observer Introverted'],
      },
      {
        description: [
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
          'Looks to prioritize/value of something, then figures out the reasons.',
          'Prioritizing, emotions, likes',
        ],
        labels: ['Feeling', 'Fi or Fe'],
      },
      {
        description: [
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
          'Looks for the proveable facts first, then sees the abstract connections.',
          'Responsible to prove the case, tracks the facts',
        ],
        labels: ['Sensory', 'Si or Se'],
      },
      {
        description: [
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
        ],
        labels: ['Si', 'Introverted Sensory'],
      },
      {
        description: [
          'Answers are found by gathering new concepts, then organizing known facts later.',
        ],
        labels: ['Ne', 'Extroverted Intuition'],
      },
      {
        description: [
          'Answers are found by going over known concepts, then gathering in new facts later.',
        ],
        labels: ['Ni', 'Introverted Intuition'],
      },
      {
        description: [
          'Answers are found by gathering new facts, then organizing known concepts later.',
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
        ],
        labels: ['Fi', 'Introverted Feeling'],
      },
      {
        description: [
          "Prioritizes the spectrum of the tribe's reasons, then seeks their personal values.",
        ],
        labels: ['Te', 'Extroverted Thinking'],
      },
      {
        description: [
          "Prioritizes their personal reasons first, then seeks the spectrum of the tribe's values.",
        ],
        labels: ['Ti', 'Introverted Thinking'],
      },
      {
        description: [
          "Prioritizes the spectrum of the tribe's values, then seeks their personal reasons.",
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
          'Process and preserves energy for self, before expending energy for the tribe',
          'Same old story about me, processed, work alone',
          'Introverted Energy Animal',
        ],
        labels: ['Sleep', 'Di + Oi'],
      },
      {
        description: [
          'Expends energy for the tribe, before processing and preserving energy for self.',
          'Random story about others, process & do with others',
          'Extroverted Energy Animal',
        ],
        labels: ['Play', 'De + Oe'],
      },
      {
        description: [
          'Takes in and respects info, before getting started and teaching.',
          'Random story about me, pile for me, savor',
          'Introverted Information Animal',
        ],
        labels: ['Consume', 'Oe + Di'],
      },
      {
        description: [
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
        description: [
          'Deep inner world of taking in info and processing.',
        ],
        labels: ['SC', 'Sleep + Consume'],
      },
      {
        description: [
          'Over gathers then wants to do something with it.',
        ],
        labels: ['CP', 'Consume + Play'],
      },
      {
        description: [
          'Expends energy and shares knowledge.',
        ],
        labels: ['PB', 'Play + Blast'],
      },
      {
        description: [
          'Reworks same info and then shares knowledge.',
        ],
        labels: ['BS', 'Blast + Sleep'],
      },
    ]
  };
  infoEnergyCoin: Coin = {
    sides: [
      {
        description: [
          'Relative balance in conversations, knowledge is power',
          'Imbalanced with work and rest, over or under exert',
          'Blast and Consume in top 3 animals, Play or Sleep last.'
        ],
        labels: ['Info Dominant'],
      },
      {
        description: [
          'Relative balance with work and rest, goofy',
          'Imbalanced in conversations, overshare or undershare information',
          'Play and Sleep in top 3 animals, Consume or Blast last.'
        ],
        labels: ['Energy Dominant'],
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

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.coins = [];

    //Needs
    this.obsDeciderCoin.activeSide = this.opsType.observer ? 0 : 1;
    this.coins.push(this.obsDeciderCoin);
    this.selfTribeCoin.activeSide = this.opsType.diSavior ? 0 : 1;
    this.coins.push(this.selfTribeCoin);
    this.organizeGatherCoin.activeSide = this.opsType.oiSavior ? 0 : 1;
    this.coins.push(this.organizeGatherCoin);

    //Letters / Temperaments
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

    //Functions
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

    //Animals
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
    this.infoEnergyCoin.activeSide = this.opsType.infoDom ? 0 : 1;
    this.coins.push(this.infoEnergyCoin);
    if (this.opsType.sleepSavior && this.opsType.consumeSavior) {
      this.animalsCombinedCoin.activeSide = 0;
    } else if (this.opsType.playSavior && this.opsType.consumeSavior) {
      this.animalsCombinedCoin.activeSide = 1;
    } else if (this.opsType.sleepSavior && this.opsType.blastSavior) {
      this.animalsCombinedCoin.activeSide = 3;
    } else if (this.opsType.playSavior && this.opsType.blastSavior) {
      this.animalsCombinedCoin.activeSide = 2;
    }
    this.coins.push(this.animalsCombinedCoin);

    //Modalities
    this.deModalitiesCoin.activeSide = this.opsType.deModality === 'F' ? 0 : 1;
    this.sensoryModalitiesCoin.activeSide = this.opsType.modalities[0] === 'F' ? 0 : 1;
    this.coins.push(this.deModalitiesCoin);
    this.coins.push(this.sensoryModalitiesCoin);
  }

  configAnimals(index: number) {
    switch (this.opsType.animals[index].name) {
      case 'Sleep':
        this.animalsCoin.sides[0].activeLabel = this.opsType.animals[index].savior;
        break;
      case 'Play':
        this.animalsCoin.sides[1].activeLabel = this.opsType.animals[index].savior;
        break;
      case 'Consume':
        this.animalsCoin.sides[2].activeLabel = this.opsType.animals[index].savior;
        break;
      case 'Blast':
        this.animalsCoin.sides[3].activeLabel = this.opsType.animals[index].savior;
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
