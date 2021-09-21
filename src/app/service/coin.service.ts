import { Injectable } from '@angular/core';
import { Coin } from '../model/coin';
import { OpsType } from '../type-analyzer/ops-type';

@Injectable({
  providedIn: 'root',
})
export class CoinService {

  coins : {
    hn1: Coin;
    ohn: Coin;
    dhn: Coin;

    dl: Coin;
    ol: Coin;

    ea: Coin;
    ia: Coin;
    adom: Coin;

    smod: Coin;
    demod: Coin
  };

  constructor() {}

  getSide(coin: Coin, name: string) {
    let result = null;
    coin.sides.forEach((side) => {
      if (side.name === name) {
        result = side;
      }
    });
    return result;
  }
}

let coins = [
  {
    name: 'Observer or Decider',
    val: '',
    validated: false,
    sides: [
      {
        label: 'Observer',
        val: 'Observer',
        validate: (opsType: OpsType) => {
          return opsType.observer;
        },
      },
      {
        label: '/',
        val: '',
        validate: (opsType: OpsType) => {
          return false;
        },
      },
      {
        label: 'Decider',
        val: 'Decider',
        validate: (opsType: OpsType) => {
          return opsType.decider;
        },
      },
    ],
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
