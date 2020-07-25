export class Function {
  name: string; //Fe, Ti, ex...

  type: string; //De, Di, Oe, Oi

  modality: string; //F or M
  grant: number; //1,2,3,4
  activation: number = 0; //number of times activated
  savior: string; //S1, S2, A, -

  constructor(name?: string, savior?: string, grant?: number) {
    this.name = name;
    this.savior = savior;
    this.grant = grant;
  }
}
