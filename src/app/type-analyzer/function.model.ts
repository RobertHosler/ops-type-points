export class Function {
  name: string; //Fe, Ti, ex...

  modality: string; //F or M
  grant: number; //1,2,3,4
  activation: number = 0; //number of times activated
  savior: string; //S1, S2, A, -
  letter: string; //F,T,S,N

  saviorBool: boolean;
  demon: boolean;

  observer: boolean;
  decider: boolean;
  extroverted: boolean;
  introverted: boolean;

  oe: boolean;
  oi: boolean;
  de: boolean;
  di: boolean;

  need: string;//Oe,Oi,De,Di

  modalityPoints: number; //Modality Points
  grantPoints: number; //Grand Stack Points
  activationPoints: number; //Activation Points
  saviorPoints: number; //Savior Function Points
  animalPoints: number; //Animal Order Points

  totalPoints: number; //All them points, added up.
  pointPercentage: string; //Percentage of the total points

  constructor(name?: string, savior?: string, grant?: number) {
    this.name = name;
    this.savior = savior;
    if (savior === 'S1' || savior === 'S2') {
      this.saviorBool = true;
      this.demon = false;
    } else {
      this.saviorBool = false;
      this.demon = true;
    }
    this.grant = grant;
    this.letter = name.charAt(0);
    if (this.letter === 'S' || this.letter === 'N') {
      this.observer = true;
      this.decider = false;
    } else {
      this.observer = false;
      this.decider = true;
    }
    if (name.charAt(1) === 'e') {
      this.extroverted = true;
      this.introverted = false;
      if (this.decider) {
        this.de = true;
        this.need = "De";
      } else {
        this.oe = true;
        this.need = "Oe";
      }
    } else {
      this.extroverted = false;
      this.introverted = true;
      if (this.decider) {
        this.di = true;
        this.need = "Di";
      } else {
        this.oi = true;
        this.need = "Oi";
      }
    }
  }

  determineDemon() {
    var demon: string;
    switch (this.name) {
      case 'Fe':
        demon = 'Ti';
        break;
      case 'Te':
        demon = 'Fi';
        break;
      case 'Fi':
        demon = 'Te';
        break;
      case 'Ti':
        demon = 'Fe';
        break;
      case 'Ne':
        demon = 'Si';
        break;
      case 'Se':
        demon = 'Ni';
        break;
      case 'Ni':
        demon = 'Se';
        break;
      case 'Si':
        demon = 'Ne';
        break;
      default:
      //ERROR
    }
    return demon;
  }
}
