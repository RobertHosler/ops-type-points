import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { resourceUsage } from 'process';
import { OpsDataService, TypeRoot } from '../service/ops-data.service';
import { OpsType } from '../type-analyzer/ops-type';

@Component({
  selector: 'app-type-practice',
  templateUrl: './type-practice.component.html',
  styleUrls: ['./type-practice.component.scss'],
})
export class TypePracticeComponent implements OnInit {
  extendInterviewParam = 'sp=EgIYAg%253D%253D&';
  interviewLinkBase =
    'https://www.youtube.com/results?search_query=interview+with+';

  googleSearchBase = 'https://www.google.com/search?q=';
  imageSearchBase = 'https://www.google.com/search?tbm=isch&q=';

  typeRecords;
  classOnlyRecords;

  nameString: string;

  subjectName = '';
  subjectOpsType: OpsType;
  subjectRecord;
  subjectTypeLink;
  typeRevealed = false;
  loading = false;
  showFunctions = false;

  radioModel = 'Middle';

  validationMessage = [];
  guessSubmit = false;
  typeGuessInvalid = false;

  classOnly = false;

  coins = [
    {
      coin: null,//name and 
      val: '',
      validated: false,
      leftValidate: (opsType: OpsType) => {
        return opsType.observer;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.decider;
      },
    },
    {
      name: 'Self or Tribe',
      val: '',
      left: 'Self',
      right: 'Tribe',
      validated: false,
      leftValidate: (opsType: OpsType) => {
        return opsType.diSavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.deSavior;
      },
    },
    {
      name: 'Organize or Gather',
      val: '',
      left: 'Organize',
      right: 'Gather',
      validated: false,
      leftValidate: (opsType: OpsType) => {
        return opsType.oiSavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.oeSavior;
      },
    },
    {
      name: 'Feeling or Thinking',
      val: '',
      left: 'Feeling',
      right: 'Thinking',
      validated: false,
      leftValidate: (opsType: OpsType) => {
        return opsType.feelingSavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.thinkingSavior;
      },
    },
    {
      name: 'Sensory or Intuition',
      val: '',
      left: 'Sensory',
      right: 'Intuition',
      validated: false,
      leftValidate: (opsType: OpsType) => {
        return opsType.sensorySavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.intuitionSavior;
      },
    },
    {
      name: 'Consume or Blast',
      val: '',
      left: 'Consume',
      right: 'Blast',
      validated: false,
      leftValidate: (opsType: OpsType) => {
        return opsType.consumeSavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.blastSavior;
      },
    },
    {
      name: 'Play or Sleep',
      val: '',
      left: 'Play',
      right: 'Sleep',
      validated: false,
      leftValidate: (opsType: OpsType) => {
        return opsType.playSavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.sleepSavior;
      },
    },
    {
      name: 'Info or Energy',
      val: '',
      left: 'Info',
      right: 'Energy',
      validated: false,
      leftValidate: (opsType: OpsType) => {
        return opsType.infoDom;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.energyDom;
      },
    },
    {
      name: 'Sensory Modality',
      val: '',
      left: 'Feminine S',
      right: 'Masculine S',
      validated: false,
      leftValidate: (opsType: OpsType) => {
        return opsType.sensoryModality.startsWith('F');
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.sensoryModality.startsWith('M');
      },
    },
    {
      name: 'De Modality',
      val: '',
      left: 'Feminine De',
      right: 'Masculine De',
      validated: false,
      leftValidate: (opsType: OpsType) => {
        return opsType.deModality.startsWith('F');
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.deModality.startsWith('M');
      },
    },
  ];

  deciderButtons = [
    {
      name: 'Fe',
      updates: [
        {
          index: 3,
          val: 'Feeling',
        },
        { index: 1, val: 'Tribe' },
      ],
    },
    {
      name: 'Te',
      updates: [
        {
          index: 3,
          val: 'Thinking',
        },
        { index: 1, val: 'Tribe' },
      ],
    },
    {
      name: 'Fi',
      updates: [
        {
          index: 3,
          val: 'Feeling',
        },
        { index: 1, val: 'Self' },
      ],
    },
    {
      name: 'Ti',
      updates: [
        {
          index: 3,
          val: 'Thinking',
        },
        { index: 1, val: 'Self' },
      ],
    },
  ];

  observerButtons = [
    {
      name: 'Ne',
      updates: [
        {
          index: 4,
          val: 'Intuition',
        },
        { index: 2, val: 'Gather' },
      ],
    },
    {
      name: 'Se',
      updates: [
        {
          index: 4,
          val: 'Sensory',
        },
        { index: 2, val: 'Gather' },
      ],
    },
    {
      name: 'Ni',
      updates: [
        {
          index: 4,
          val: 'Intuition',
        },
        { index: 2, val: 'Organize' },
      ],
    },
    {
      name: 'Si',
      updates: [
        {
          index: 4,
          val: 'Sensory',
        },
        { index: 2, val: 'Organize' },
      ],
    },
  ];

  modButtons = [
    {
      name: 'MM',
      updates: [
        {
          index: 8,
          val: 'Masculine S',
        },
        { index: 9, val: 'Masculine De' },
      ],
    },
    {
      name: 'MF',
      updates: [
        {
          index: 8,
          val: 'Masculine S',
        },
        { index: 9, val: 'Feminine De' },
      ],
    },
    {
      name: 'FF',
      updates: [
        {
          index: 8,
          val: 'Feminine S',
        },
        { index: 9, val: 'Feminine De' },
      ],
    },
    {
      name: 'FM',
      updates: [
        {
          index: 8,
          val: 'Feminine S',
        },
        { index: 9, val: 'Masculine De' },
      ],
    },
  ];

  animalButtons = [
    {
      name: 'CP',
      updates: [
        {
          index: 5,
          val: 'Consume',
        },
        { index: 6, val: 'Play' },
      ],
    },
    {
      name: 'PB',
      updates: [
        {
          index: 5,
          val: 'Blast',
        },
        { index: 6, val: 'Play' },
      ],
    },
    {
      name: 'SC',
      updates: [
        {
          index: 5,
          val: 'Consume',
        },
        { index: 6, val: 'Sleep' },
      ],
    },
    {
      name: 'BS',
      updates: [
        {
          index: 5,
          val: 'Blast',
        },
        { index: 6, val: 'Sleep' },
      ],
    },
  ];

  lastAnimalButtons = [
    {
      name: 'B',
      updates: [
        {
          index: 5,
          val: 'Consume',
        },
        { index: 7, val: 'Energy' },
      ],
    },
    {
      name: 'C',
      updates: [
        {
          index: 5,
          val: 'Blast',
        },
        { index: 7, val: 'Energy' },
      ],
    },
    {
      name: 'S',
      updates: [
        {
          index: 6,
          val: 'Play',
        },
        { index: 7, val: 'Info' },
      ],
    },
    {
      name: 'P',
      updates: [
        {
          index: 6,
          val: 'Sleep',
        },
        { index: 7, val: 'Info' },
      ],
    },
  ];

  needButtons = [
    {
      name: 'EJ',
      updates: [
        {
          index: 0,
          val: 'Decider',
        },
        { index: 1, val: 'Tribe' },
      ],
    },
    {
      name: 'IP',
      updates: [
        {
          index: 0,
          val: 'Decider',
        },
        { index: 1, val: 'Self' },
      ],
    },
    {
      name: 'EP',
      updates: [
        {
          index: 0,
          val: 'Observer',
        },
        { index: 2, val: 'Gather' },
      ],
    },
    {
      name: 'IJ',
      updates: [
        {
          index: 0,
          val: 'Observer',
        },
        { index: 2, val: 'Organize' },
      ],
    },
  ];

  buttonGroups = [
    {
      name: 'Modality',
      group: this.modButtons,
    },
    {
      name: 'Need',
      group: this.needButtons,
    },
    {
      name: 'Decider',
      group: this.deciderButtons,
    },
    {
      name: 'Observer',
      group: this.observerButtons,
    },
    {
      name: 'Animals',
      group: this.animalButtons,
    },
    {
      name: 'Last Animal',
      group: this.lastAnimalButtons,
    },
  ];

  exclusions = [
    'Jesus',
    'Sarah'
  ];

  constructor(
    private opsDataService: OpsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('name')) {
        this.nameString = params.get('name');
        this.lookupType(this.nameString);
      }
    });
    this.opsDataService.getAllRecords().subscribe((result: TypeRoot) => {
      this.typeRecords = [];
      this.classOnlyRecords = [];
      result.records.forEach((record) => {
        if (this.exclusions.includes(record.fields.Name)) {
          return;
        }
        if (!record.fields.Tags) {
          this.typeRecords.push(record);
        } else if (record.fields.Tags.includes('Class Typing')) {
          this.classOnlyRecords.push(record);
          this.typeRecords.push(record);
        } else if (
          !record.fields.Tags.includes('Community Member') &&
          !record.fields.Tags.includes('Incomplete') &&
          !record.fields.Tags.includes('Speculation')
        ) {
          this.typeRecords.push(record);
        }
      });
      this.loading = false;
      if (this.nameString) {
        this.lookupType(this.nameString);
      }
      this.shuffleRecords();
    });
  }

  shuffleRecords() {
    this.typeRecords = this.shuffleArray(this.typeRecords);
    this.classOnlyRecords = this.shuffleArray(this.classOnlyRecords);
  }

  shuffleArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  getInterviewLink() {
    let subjectInLink = this.subjectName.replace(' ', '+');
    return this.interviewLinkBase + subjectInLink;
  }

  getGoogleSearch() {
    let subjectInLink = this.subjectName.replace(' ', '+');
    return this.googleSearchBase + subjectInLink;
  }

  getImageSearch() {
    let subjectInLink = this.subjectName.replace(' ', '+');
    return this.imageSearchBase + subjectInLink;
  }

  revealType() {
    if (window.confirm('Are you sure?')) {
      this.typeRevealed = true;
    }
  }

  clearSubject() {
    this.subjectRecord = null;
    const queryParams: Params = {
      name: null,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  lookupType(name?: string): void {
    if (this.loading) {
      return;
    }
    //Reset coin values
    this.clearCoins();
    this.subjectOpsType = null;
    this.subjectRecord = null;
    this.subjectName = '';
    this.subjectTypeLink = '';
    this.typeRevealed = false;
    let randomRecord;
    let completeRecord = false;
    this.validationMessage = [];
    this.guessSubmit = false;
    if (name) {
      this.typeRecords.forEach((record) => {
        if (record.fields.Name === name) {
          randomRecord = record;
        }
      });
    } else {
      do {
        if (this.classOnly) {
          const randomIndex = Math.floor(
            Math.random() * this.classOnlyRecords.length
          );
          randomRecord = this.classOnlyRecords[randomIndex];
        } else {
          const randomIndex = Math.floor(
            Math.random() * this.typeRecords.length
          );
          randomRecord = this.typeRecords[randomIndex];
        }
        completeRecord = true;
      } while (!completeRecord);
    }
    if (randomRecord) {
      const mod = randomRecord.fields.Type.substring(0, 2);
      const sav1 = randomRecord.fields.Type.substring(3, 5);
      const sav2 = randomRecord.fields.Type.substring(6, 8);
      let animals = randomRecord.fields.Type.substring(9, 16);
      animals = animals.replace('(', '');
      animals = animals.replace(')', '');
      animals = animals.replace('/', '');
      this.subjectOpsType = new OpsType(mod, sav1, sav2, animals);
      this.subjectRecord = randomRecord;
      this.subjectName = this.subjectRecord.fields.Name;
      this.subjectTypeLink =
        '/analyzer?m=' + mod + '&s1=' + sav1 + '&s2=' + sav2 + '&a=' + animals;
      const queryParams: Params = {
        name: this.subjectName,
      };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });
    }
  }

  submitGuess() {
    this.showFunctions = false;
    this.validationMessage = [];
    let validGuess = true;
    if (validGuess) {
      this.guessSubmit = true;
      let totalCorrect = 0;
      let totalSubmit = 0;
      this.coins.forEach((coin) => {
        let coinMsg = coin.name;
        if (!coin.val) {
          return;
        } else if (
          (coin.val === coin.left && coin.leftValidate(this.subjectOpsType)) ||
          (coin.val === coin.right && coin.rightValidate(this.subjectOpsType))
        ) {
          totalCorrect++;
          coinMsg += ' coin is correct';
        } else {
          coinMsg += ' coin is incorrect';
        }
        coin.validated = true;
        totalSubmit++;
        // this.validationMessage.push(coinMsg);
      });
      this.validationMessage.push(
        totalCorrect + '/' + totalSubmit + ' Coins Correct'
      );
      if (totalSubmit === 10) {
        this.typeRevealed = true;
      } else {
        this.validationMessage.push(
          'Submit all ten coins to reveal the full type'
        );
      }
    }
  }

  updateButton(button) {
    button.updates.forEach((update) => {
      this.coins[update.index].val = update.val;
    });
  }

  clearCoins() {
    this.coins.forEach((coin) => {
      coin.val = '';
      coin.validated = false;
    });
  }

  buttonActive(button) {
    let result = true;
    button.updates.forEach(update => {
      if (this.coins[update.index].val !== update.val) {
        result = false;
      }
    });
    return result;
  }

  get totalCoins() {
    let guessTotal = 0;
    this.coins.forEach((coin) => {
      if (coin.val) {
        guessTotal++;
      }
    });
    return guessTotal;
  }

  get typeGuess() {
    this.typeGuessInvalid = false;
    let result = '';
    let sMod = this.coins[8].val === 'Feminine S' ? 'F' : this.coins[8].val === 'Masculine S' ? 'M' : 'x';
    let deMod = this.coins[9].val === 'Feminine De' ? 'F' : this.coins[9].val === 'Masculine De' ? 'M' : 'x';
    let mod = sMod + deMod;
    let functions = '';
    // let dLetter = this.coins[3].val.substring(0, 1);
    // let oLetter = this.coins[4].val.substring(0, 1);
    let dLetter = this.coins[3].val === 'Feeling' ? 'F' : this.coins[3].val === 'Thinking' ? 'T' : 'D';
    let oLetter = this.coins[4].val === 'Sensory' ? 'S' : this.coins[4].val === 'Intuition' ? 'N' : 'O';
    oLetter = oLetter === 'I' ? 'N' : oLetter;
    let dNeed = this.coins[1].val === 'Tribe' ? 'e' : this.coins[1].val === 'Self' ? 'i' : 'x';
    let oNeed = this.coins[2].val === 'Gather' ? 'e' : this.coins[2].val === 'Organize' ? 'i' : 'x';
    let iAnimal = this.coins[5].val === 'Blast' ? 'B' : this.coins[5].val === 'Consume' ? 'C' : 'x';
    let iAnimal2 = iAnimal === 'x' ? 'x' : iAnimal === 'B' ? 'C' : 'B';
    let eAnimal = this.coins[6].val === 'Play' ? 'P' : this.coins[6].val === 'Sleep' ? 'S' : 'x';
    let eAnimal2 = eAnimal === 'x' ? 'x' : eAnimal === 'S' ? 'P' : 'S';
    if (this.coins[0].val === 'Decider') {
      functions = dLetter + dNeed + '/' + oLetter + oNeed;
    } else {
      functions = oLetter + oNeed + '/' + dLetter + dNeed;
    }
    let animals = '';
    if (dNeed === 'e' && oNeed === 'e') {
      animals = 'P' + iAnimal;
      if (eAnimal === 'S') {
        this.typeGuessInvalid = true;
      }
    } else if (dNeed === 'e' && oNeed === 'i') {
      animals = 'B' + eAnimal;
      if (iAnimal === 'C') {
        this.typeGuessInvalid = true;
      }
    } else if (dNeed === 'i' && oNeed === 'e') {
      animals = 'C' + eAnimal;
      if (iAnimal === 'B') {
        this.typeGuessInvalid = true;
      }
    } else if (dNeed === 'i' && oNeed === 'i') {
      animals = 'S' + iAnimal;
      if (eAnimal === 'P') {
        this.typeGuessInvalid = true;
      }
    } else {
      if (iAnimal && !eAnimal) {
        animals = iAnimal + eAnimal;
      } else if (eAnimal && !iAnimal) {
        animals = eAnimal + iAnimal;
      } else {
        animals = iAnimal + eAnimal;
      }
    }
    if (this.coins[7].val === 'Energy') {
      animals += '/' + eAnimal2 + '(' + iAnimal2 + ')';
    } else if (this.coins[7].val === 'Info') {
      animals += '/' + iAnimal2 + '(' + eAnimal2 + ')';
    } else {
      animals += '/x(x)';
    }
    result = mod + '-' + functions + '-' + animals;
    return result;
  }
}
