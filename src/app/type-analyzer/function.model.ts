export class Function {

  name: string; //Fe, Ti, ex...

  modality: string; //F or M
  grant: number; //1,2,3,4
  activation: number = 0; //number of times activated
  savior: string; //S1, S2, A, -

  modalityPoints: number;//Modality Points
  grantPoints: number;//Grand Stack Points
  activationPoints: number;//Activation Points
  saviorPoints: number;//Savior Function Points
  animalPoints: number;//Animal Order Points

  totalPoints: number;//All them points, added up.
  pointPercentage: string;//Percentage of the total points

  constructor(name?: string, savior?: string, grant?: number) {
    this.name = name;
    this.savior = savior;
    this.grant = grant;
  }
}
