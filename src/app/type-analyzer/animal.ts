export class Animal {

    name: string;//Play, Sleep
    shortName: string;//P,S,B,C
    info: boolean;//True for B/C
    energy: boolean;//True for P/S

    //True if the animal contains these functions
    oe: boolean;
    oi: boolean;
    de: boolean;
    di: boolean;
    addFunctionModalities
    //Below values must be set based on type

    savior: string;//S1, S2, A, -
    index: number;//1,2,3,4

    saviorBool: boolean;
    demon: boolean;

    modality: string;//MM,FM
    observerModality: string;//F or M
    deciderModality: string;//F or M

    temperament: string;//NF,ST
    observerLetter: string;
    deciderLetter: string;

    constructor(name: string, shortName: string, oe: boolean, de: boolean, energy: boolean) {
        this.name = name;
        this.shortName = shortName;
        this.oe = oe;
        this.oi = !oe;
        this.de = de;
        this.di = !de;
        this.energy = energy;
        this.info = !energy;
    }

}
