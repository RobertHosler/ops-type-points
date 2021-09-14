import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  radioModel = 'Middle';

  obsDecVal = '';
  selfTribeVal = '';
  organizeGatherVal = '';

  feelingThinkingVal = '';
  sensoryIntuitionVal = '';

  infoAnimalVal = '';
  energyAnimalVal = '';
  dominanceAnimalVal = '';

  deModVal = '';
  sensoryModVal = '';

  validationMessage = [];
  guessSubmit = false;

  classOnly = false;

  coins = [
    {
      name: 'Observer or Decider',
      val: this.obsDecVal,
      left: 'Observer',
      right: 'Decider',
      leftValidate: (opsType: OpsType) => {
        return opsType.observer;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.decider;
      },
    },
    {
      name: 'Self or Tribe',
      val: this.selfTribeVal,
      left: 'Self',
      right: 'Tribe',
      leftValidate: (opsType: OpsType) => {
        return opsType.diSavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.deSavior;
      },
    },
    {
      name: 'Organize or Gather',
      val: this.organizeGatherVal,
      left: 'Organize',
      right: 'Gather',
      leftValidate: (opsType: OpsType) => {
        return opsType.oiSavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.oeSavior;
      },
    },
    {
      name: 'Feeling or Thinking',
      val: this.feelingThinkingVal,
      left: 'Feeling',
      right: 'Thinking',
      leftValidate: (opsType: OpsType) => {
        return opsType.feelingSavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.thinkingSavior;
      },
    },
    {
      name: 'Sensory or Intuition',
      val: this.feelingThinkingVal,
      left: 'Sensory',
      right: 'Intuition',
      leftValidate: (opsType: OpsType) => {
        return opsType.sensorySavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.intuitionSavior;
      },
    },
    {
      name: 'Consume or Blast',
      val: this.infoAnimalVal,
      left: 'Consume',
      right: 'Blast',
      leftValidate: (opsType: OpsType) => {
        return opsType.consumeSavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.blastSavior;
      },
    },
    {
      name: 'Play or Sleep',
      val: this.energyAnimalVal,
      left: 'Play',
      right: 'Sleep',
      leftValidate: (opsType: OpsType) => {
        return opsType.playSavior;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.sleepSavior;
      },
    },
    {
      name: 'Info or Energy',
      val: this.dominanceAnimalVal,
      left: 'Info',
      right: 'Energy',
      leftValidate: (opsType: OpsType) => {
        return opsType.infoDom;
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.energyDom;
      },
    },
    {
      name: 'Sensory Modality',
      val: this.deModVal,
      left: 'Feminine',
      middle: 'Sensory',
      right: 'Masculine',
      leftValidate: (opsType: OpsType) => {
        return opsType.sensoryModality.startsWith('F');
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.sensoryModality.startsWith('M');
      },
    },
    {
      name: 'De Modality',
      val: this.deModVal,
      left: 'Feminine',
      middle: 'De',
      right: 'Masculine',
      leftValidate: (opsType: OpsType) => {
        return opsType.deModality.startsWith('F');
      },
      rightValidate: (opsType: OpsType) => {
        return opsType.deModality.startsWith('M');
      },
    },
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
      }
    });
    this.opsDataService.getAllRecords().subscribe((result: TypeRoot) => {
      this.typeRecords = result.records;
      this.classOnlyRecords = [];
      result.records.forEach((record) => {
        if (record.fields.Tags && record.fields.Tags.includes('Class Typing')) {
          this.classOnlyRecords.push(record);
        }
      });
      this.loading = false;
      if (this.nameString) {
        this.lookupType(this.nameString);
      }
    });
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

  lookupType(name?: string): void {
    if (this.loading) {
      return;
    }
    //Reset coin values
    this.coins.forEach((coin) => {
      coin.val = '';
    });
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
        if (
          randomRecord.fields.Tags &&
          (randomRecord.fields.Tags.includes('Community Member') ||
            randomRecord.fields.Tags.includes('Incomplete') ||
            randomRecord.fields.Tags.includes('Speculation'))
        ) {
          continue;
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
    this.revealType();
    if (!this.typeRevealed) {
      return;
    }
    this.validationMessage = [];
    let validGuess = true;
    this.coins.forEach((coin) => {
      //TODO: validate all coins selected
      if (validGuess && !coin.val) {
        validGuess = false;
        this.validationMessage.push('Must submit a guess for all coins!');
      }
    });
    if (validGuess) {
      this.guessSubmit = true;
      let totalCorrect = 0;
      this.coins.forEach((coin) => {
        let coinMsg = coin.name;
        if (
          (coin.val === coin.left && coin.leftValidate(this.subjectOpsType)) ||
          (coin.val === coin.right && coin.rightValidate(this.subjectOpsType))
        ) {
          totalCorrect++;
          coinMsg += ' coin is correct';
        } else {
          coinMsg += ' coin is incorrect';
        }
        // this.validationMessage.push(coinMsg);
      });
      this.validationMessage.push(totalCorrect + '/10 Coins Correct');
    }
  }
}
