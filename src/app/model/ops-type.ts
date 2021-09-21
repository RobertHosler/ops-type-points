export class OpsType {
    jumper: boolean;
    mbtiType: string;
    quadra: string;

    animalInfo: AnimalInfo;
    functionInfo: FunctionInfo;
    
    
    get isOe() {
        return 
    }

}

export class FunctionInfo {
    grantStack: Function[];
    saviors: Function[];
    demons: Function[];

}

export class AnimalInfo {
    saviors: Function[];
    demons: Function[];

    sleepLast: boolean;
    playLast: boolean;
    consumeLast: boolean;
    blastLast: boolean;
}

export class Coin {

}