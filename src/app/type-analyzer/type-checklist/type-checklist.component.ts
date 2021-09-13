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

  coins: Coin[] = [
    //Human Needs
    {
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
      activeSide: -1,
    },
    //Self Tribe
    {
      sides: [
        {
          description: [
            "Prioritizes their personal values/reasons first, then seeks the spectrum of the tribe's values/reasons.",
            'Knows more about self vs others, me-story.',
            'Seeks Significance before Connection'
          ],
          labels: ['Identity', 'Fi or Ti', 'Decider Introverted'],
        },
        {
          description: [
            "Prioritizes the spectrum of the tribe's values/reasons, then seeks their personal values/reasons.",
            'Knows more about others vs self, frog in pocket.',
            'Seeks Connection before Significance'
          ],
          labels: ['Tribe', 'Fe or Te', 'Decider Extroverted'],
        },
      ],
      activeSide: -1,
    },
    //Organize Gather
    {
      sides: [
        {
          description: [
            'Answers are found by going over known facts/concepts, then gathering in new facts/concepts later.',
            'Keeps circling back to the same known story, conclusions.',
            'Seeks Certainty before Variety'
          ],
          labels: ['Organize', 'Ni or Si', 'Observer Introverted'],
        },
        {
          description: [
            'Answers are found by gathering new facts/concepts, then organizing known facts/concepts later.',
            'Keeps channel changing and interrupting self, variety.',
            'Seeks Variety before Certainty'
          ],
          labels: ['Gather', 'Ne or Se', 'Observer Extroverted'],
        },
      ],
      activeSide: -1,
    },
    //Letters
    {
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
      activeSide: -1,
    },
    {
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
      activeSide: -1,
    },
    // Temperaments
    {
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
      activeSide: -1,
    },
    //Observer Functions
    {
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
      activeSide: -1,
    },
    //Decider Functions
    {
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
      activeSide: -1,
    },
    //Animals
    {
      heading: 'Animals',
      sides: [
        {
          description: [
            'Process and preserves energy for self, before expending energy for the tribe',
            'Same old story about me, processed, work alone',
            'Introverted Energy Animal'
          ],
          labels: ['Sleep', 'Di + Oi'],
        },
        {
          description: [
            'Expends energy for the tribe, before processing and preserving energy for self.',
            'Random story about others, process & do with others',
            'Extroverted Energy Animal'
          ],
          labels: ['Play', 'De + Oe'],
        },
        {
          description: [
            'Takes in and respects info, before getting started and teaching.',
            'Random story about me, pile for me, savor',
            'Introverted Information Animal'
          ],
          labels: ['Consume', 'Oe + Di'],
        },
        {
          description: [
            'Gets started and is able to teach, before respecting and gathering info.',
            'Same old story about others, can talk, produce',
            'Extroverted Information Animal'
          ],
          labels: ['Blast', 'De + Oi'],
        },
      ],
      activeSide: -1,
    },
    //De Modalities
    {
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
      activeSide: -1,
    },
    //Sensory Modalities
    {
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
      activeSide: -1,
    },
  ];

  constructor() {}

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    //Needs
    this.coins[0].activeSide = this.opsType.observer ? 0 : 1;
    this.coins[1].activeSide = this.opsType.diSavior ? 0 : 1;
    this.coins[2].activeSide = this.opsType.oiSavior ? 0 : 1;
    //Letters / Temperaments
    switch (this.opsType.temperament) {
      case 'SF':
        this.coins[3].activeSide = 0;
        this.coins[4].activeSide = 0;
        this.coins[5].activeSide = 0;
        break;
      case 'NT':
        this.coins[3].activeSide = 1;
        this.coins[4].activeSide = 1;
        this.coins[5].activeSide = 1;
        break;
      case 'ST':
        this.coins[3].activeSide = 1;
        this.coins[4].activeSide = 0;
        this.coins[5].activeSide = 2;
        break;
      case 'NF':
        this.coins[3].activeSide = 0;
        this.coins[4].activeSide = 1;
        this.coins[5].activeSide = 3;
        break;
    }
    //Functions
    switch (this.opsType.getSaviorObserver().name) {
      case 'Si':
        this.coins[6].activeSide = 0;
        break;
      case 'Ne':
        this.coins[6].activeSide = 1;
        break;
      case 'Ni':
        this.coins[6].activeSide = 2;
        break;
      case 'Se':
        this.coins[6].activeSide = 3;
        break;
    }
    switch (this.opsType.getSaviorDecider().name) {
      case 'Fi':
        this.coins[7].activeSide = 0;
        break;
      case 'Te':
        this.coins[7].activeSide = 1;
        break;
      case 'Ti':
        this.coins[7].activeSide = 2;
        break;
      case 'Fe':
        this.coins[7].activeSide = 3;
        break;
    }
    //Animals
    this.configAnimals(0);
    this.configAnimals(1);
    this.configAnimals(2);
    this.configAnimals(3);
    //Modalities
    this.coins[9].activeSide = this.opsType.deModality === 'F' ? 0 : 1;
    this.coins[10].activeSide = this.opsType.modalities[0] === 'F' ? 0 : 1;
  }

  configAnimals(index: number) {
    switch (this.opsType.animals[index].name) {
      case 'Sleep':
        this.coins[8].sides[0].activeLabel = this.opsType.animals[index].savior;
        break;
      case 'Play':
        this.coins[8].sides[1].activeLabel = this.opsType.animals[index].savior;
        break;
      case 'Consume':
        this.coins[8].sides[2].activeLabel = this.opsType.animals[index].savior;
        break;
      case 'Blast':
        this.coins[8].sides[3].activeLabel = this.opsType.animals[index].savior;
        break;
    }
  }
}

class Coin {
  heading?: string;
  sides: CoinSide[];
  activeSide: number;
}

class CoinSide {
  description: string[];
  labels: string[];
  activeLabel?: string;
}
