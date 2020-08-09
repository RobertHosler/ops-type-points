import { Animal } from './animal';
import { Function } from './function.model';

export class OpsType {
  //Form values
  modalityString: string;
  s1String: string;
  s2String: string;
  animalString: string;

  //Modalities
  sensoryModality: string;
  intuitionModality: string;
  feelingModality: string;
  thinkingModality: string;
  diModality: string;
  deModality: string;
  oiModality: string;
  oeModality: string;

  modalities: string[];
  functions: Function[] = new Array<Function>();
  animals: Animal[];
  animalStack: string[];

  jumper: boolean;
  decider: boolean;
  observer: boolean;

  temperament: string;

  opsCode: string; //FF-Fe/Se-PC/S(B)
  optiCode: string; //DSFP-CS-T
  mbti: string; //ENFJ

  play: Animal = new Animal('Play', 'P', true, true, true);
  sleep: Animal = new Animal('Sleep', 'S', false, false, true);
  blast: Animal = new Animal('Blast', 'B', false, true, false);
  consume: Animal = new Animal('Consume', 'C', true, false, false);

  //Default animal stacks for each lead animal variant, animals in dashboard order
  playStack: Animal[] = [this.play, this.consume, this.blast, this.sleep];
  blastStack: Animal[] = [this.blast, this.sleep, this.play, this.consume];
  consumeStack: Animal[] = [this.consume, this.play, this.sleep, this.blast];
  sleepStack: Animal[] = [this.sleep, this.blast, this.consume, this.play];

  constructor(
    modalityString: string,
    s1String: string,
    s2String: string,
    animalString: string
  ) {
    this.modalityString = modalityString;
    this.modalities = this.modalityString.split('');
    this.s1String = s1String;
    this.s2String = s2String;
    this.animalString = animalString;
    this.animalStack = this.animalString.split('');

    this.constructFunctions();
    this.constructModalities();
    this.constructAnimals();
    this.constructMbtiType();
    this.constructOpticodeType();
    this.constructFormattedType();
  }

  private constructAnimals() {
    switch (this.animalStack[0]) {
      case 'P':
        this.animals = this.playStack;
        break;
      case 'C':
        this.animals = this.consumeStack;
        break;
      case 'B':
        this.animals = this.blastStack;
        break;
      case 'S':
        this.animals = this.sleepStack;
        break;
    }
    this.animalStack.forEach((a: string, index: number) => {
      var animalSavior: string;
      switch (index) {
        case 0:
          animalSavior = 'S1';
          break;
        case 1:
          animalSavior = 'S2';
          break;
        case 2:
          animalSavior = 'A';
          break;
        case 3:
          animalSavior = '-';
          break;
        default:
        //Error
      }
      //Configure animal savior and demon values
      var currentAnimal: Animal;
      this.animals.forEach((animal) => {
        if (animal.shortName === a) {
          currentAnimal = animal;
          animal.savior = animalSavior;
          animal.index = index;
          if (index < 3) {
            animal.saviorBool = true;
            animal.demon = false;
          } else {
            animal.saviorBool = false;
            animal.demon = true;
          }
        }
      });
      //Activate the function
      this.functions.forEach((f) => {
        if (
          (currentAnimal.oe && f.oe) ||
          (currentAnimal.oi && f.oi) ||
          (currentAnimal.di && f.di) ||
          (currentAnimal.de && f.de)
        ) {
          //Function is used in this animal
          if (index < 3) {
            f.activation++;
          }
          if (index === 1 && f.demon) {
            f.savior = 'A';
          } else if (index === 2 && f.demon) {
            f.savior = '-';
          }
          if (f.decider) {
            currentAnimal.deciderLetter = f.letter;
            currentAnimal.deciderModality = f.modality;
          } else {
            currentAnimal.observerLetter = f.letter;
            currentAnimal.observerModality = f.modality;
          }
        }
      });
      currentAnimal.temperament = currentAnimal.observerLetter + currentAnimal.deciderLetter;
      currentAnimal.modality = currentAnimal.observerModality + currentAnimal.deciderModality;
    });
  }

  private constructModalities() {
    this.sensoryModality = this.modalities[0];
    this.intuitionModality = this.notModality(this.sensoryModality);
    this.deModality = this.modalities[1];
    this.diModality = this.notModality(this.deModality);
    if (this.getDe().letter === 'T') {
      this.thinkingModality = this.deModality;
      this.feelingModality = this.diModality;
    } else {
      this.feelingModality = this.deModality;
      this.thinkingModality = this.diModality;
    }
    if (this.getOe().letter === 'S') {
      this.oeModality = this.sensoryModality;
      this.oiModality = this.intuitionModality;
    } else {
      this.oeModality = this.intuitionModality;
      this.oiModality = this.sensoryModality;
    }
    this.functions.forEach((f) => {
      if (f.name.startsWith('S')) {
        f.modality = this.sensoryModality;
      } else if (f.name.startsWith('N')) {
        f.modality = this.intuitionModality;
      } else if (f.name.endsWith('e')) {
        f.modality = this.deModality;
      } else if (f.name.endsWith('i')) {
        f.modality = this.diModality;
      }
    });
  }

  getOi() {
    var result: Function;
    this.functions.forEach((f) => {
      if (f.oi) {
        result = f;
      }
    });
    return result;
  }

  getOe() {
    var result: Function;
    this.functions.forEach((f) => {
      if (f.oe) {
        result = f;
      }
    });
    return result;
  }

  getDi() {
    var result: Function;
    this.functions.forEach((f) => {
      if (f.di) {
        result = f;
      }
    });
    return result;
  }

  getDe() {
    var result: Function;
    this.functions.forEach((f) => {
      if (f.de) {
        result = f;
      }
    });
    return result;
  }

  private constructMbtiType() {
    var mbti: string;
    switch (this.s1String) {
      case 'Fe':
        if (this.s2String === 'Se' || this.s2String === 'Ni') {
          mbti = 'ENFJ';
        } else {
          mbti = 'ESFJ';
        }
        break;
      case 'Te':
        if (this.s2String === 'Se' || this.s2String === 'Ni') {
          mbti = 'ENTJ';
        } else {
          mbti = 'ESTJ';
        }
        break;
      case 'Fi':
        if (this.s2String === 'Se' || this.s2String === 'Ni') {
          mbti = 'ISFP';
        } else {
          mbti = 'INFP';
        }
        break;
      case 'Ti':
        if (this.s2String === 'Se' || this.s2String === 'Ni') {
          mbti = 'ISTP';
        } else {
          mbti = 'INTP';
        }
        break;
      case 'Ne':
        if (this.s2String === 'Fe' || this.s2String === 'Ti') {
          mbti = 'ENTP';
        } else {
          mbti = 'ENFP';
        }
        break;
      case 'Se':
        if (this.s2String === 'Fe' || this.s2String === 'Ti') {
          mbti = 'ESTP';
        } else {
          mbti = 'ESFP';
        }
        break;
      case 'Ni':
        if (this.s2String === 'Fe' || this.s2String === 'Ti') {
          mbti = 'INFJ';
        } else {
          mbti = 'INTJ';
        }
        break;
      case 'Si':
        if (this.s2String === 'Fe' || this.s2String === 'Ti') {
          mbti = 'ISFJ';
        } else {
          mbti = 'ISTJ';
        }
        break;
      default:
      //ERROR
    }
    this.mbti = mbti;
  }

  /* OPS Type in the Classical Format Ex: FF-Fe/Se-PC/S(B) */
  private constructFormattedType() {
    this.opsCode =
      this.modalityString +
      '-' +
      this.s1String +
      '/' +
      this.s2String +
      '-' +
      this.animalStack[0] +
      this.animalStack[1] +
      '/' +
      this.animalStack[2] +
      '(' +
      this.animalStack[3] +
      ')';
  }

  /* OPS Type in the Opticode Format Ex: 'DSFP-CS-T' */
  private constructOpticodeType() {
    var modType: string;
    switch (this.modalityString) {
      case 'MM':
        modType = 'K';
        break;
      case 'MF':
        modType = 'A';
        break;
      case 'FF':
        modType = 'T';
        break;
      case 'FM':
        modType = 'V';
        break;
    }
    this.optiCode =
      (this.decider ? 'D' : 'O') +
      this.temperament +
      this.animalStack[0] +
      '-' +
      this.animalStack[1] +
      this.animalStack[2] +
      modType;
  }

  private notModality(modality: string) {
    if (modality === 'M') {
      return 'F';
    } else {
      return 'M';
    }
  }

  private constructFunctions() {

    if (this.animalStack[0] === 'P' || this.animalStack[0] === 'S') {
      this.jumper = true;
    }

    this.functions = new Array<Function>();
    var lead = new Function(this.s1String, 'S1', 1);
    var aux: Function;
    var tert: Function;
    if (this.jumper) {
      tert = new Function(this.s2String, 'S2', 3);
      aux = new Function(tert.determineDemon(), '', 2);
    } else {
      aux = new Function(this.s2String, 'S2', 2);
      tert = new Function(aux.determineDemon(), '', 3);
    }
    var last = new Function(lead.determineDemon(), '', 4);

    this.functions.push(lead);
    this.functions.push(aux);
    this.functions.push(tert);
    this.functions.push(last);

    if (this.jumper) {
      this.temperament = lead.letter + tert.letter;
    } else {
      this.temperament = lead.letter + aux.letter;
    }
  }
}
