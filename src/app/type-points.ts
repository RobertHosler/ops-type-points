export class TypePoints {

    label: string;
    
    factor: number;

    weight: number;

  constructor(label?: string, factor?: number, weight?: number) {
    this.label = label;
    this.factor = factor;
    this.weight = weight;
  }

  getPoints() {
      return this.factor * this.weight;
  }

}
