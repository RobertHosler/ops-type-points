export class Coin {
  name: string;
  sides: CoinSide[];
  activeSide?: CoinSide;
  otherNames?: string[];
  descriptions?: string[];
  param: string;
  infoLink?: string;
}

export class CoinSide {
  name: string;
  val: string;
  shortName?: string;
  otherNames?: string[];
  descriptions?: string[];
}

const observerSide = {
  name: 'Observer',
  shortName: 'O/DD',
  val: 'Observer',
  otherNames: ['Single Observer', 'Double Decider', 'ExxP or IxxJ', 'O/DD'],
  descriptions: [
    'Relatively balanced with self and tribe, but feels stuck when it comes to control and chaos.',
    'Worries about things, people are safe.',
  ],
};
const deciderSide = {
  name: 'Decider',
  shortName: 'D/OO',
  val: 'Decider',
  otherNames: ['Single Decider', 'Double Observer', 'IxxP or ExxJ', 'D/OO'],
  descriptions: [
    'Relatively balanced with control and chaos, but feels stuck when it comes to self and tribe.',
    'Nervous about people, things are safe',
  ],
};

const hn1Coin: Coin = {
  name: 'Core Need',
  param: 'hn1',
  sides: [observerSide, deciderSide],
  infoLink:
    'https://subjectivepersonality.wordpress.com/foundations/ops-starter-kit/do-you-focus-on-things-or-people/',
  //   sides: hn1Sides
};

const tribeSide = {
  name: 'Tribe',
  shortName: 'De',
  val: 'De',
  descriptions: [
    "Prioritizes the spectrum of the tribe's values/reasons, then seeks their personal values/reasons.",
    'Knows more about others vs self, frog in pocket.',
    'Seeks Connection before Significance',
  ],
  otherNames: ['Tribe', 'Fe or Te', 'Decider Extroverted'],
};

const selfSide = {
  name: 'Self',
  shortName: 'Di',
  val: 'Di',
  descriptions: [
    "Prioritizes their personal values/reasons first, then seeks the spectrum of the tribe's values/reasons.",
    'Knows more about self vs others, me-story.',
    'Seeks Significance before Connection',
  ],
  otherNames: ['Identity', 'Fi or Ti', 'Decider Introverted'],
};

const dNeedCoin: Coin = {
  name: 'Decider Need',
  param: 'dhn',
  sides: [selfSide, tribeSide],
  infoLink:
    'https://subjectivepersonality.wordpress.com/foundations/ops-starter-kit/ops-self-vs-tribe/',
};

const organizeSide = {
  name: 'Organize',
  shortName: 'Oi',
  val: 'Oi',
  descriptions: [
    'Answers are found by going over known facts/concepts, then gathering in new facts/concepts later.',
    'Keeps circling back to the same known story, conclusions.',
    'Seeks Certainty before Variety',
  ],
  otherNames: ['Organize', 'Ni or Si', 'Observer Introverted'],
};

const gatherSide = {
  name: 'Gather',
  shortName: 'Oe',
  val: 'Oe',
  descriptions: [
    'Answers are found by gathering new facts/concepts, then organizing known facts/concepts later.',
    'Keeps channel changing and interrupting self, variety.',
    'Seeks Variety before Certainty',
  ],
  otherNames: ['Gather', 'Ne or Se', 'Observer Extroverted'],
};

const oNeedCoin: Coin = {
  name: 'Observer Need',
  param: 'ohn',
  sides: [organizeSide, gatherSide],
  infoLink:
    'https://subjectivepersonality.wordpress.com/2020/05/06/gather-oe-vs-organise-oi/',
};

const feelingSide = {
  name: 'Feeling',
  shortName: 'F',
  val: 'F',
  descriptions: [
    'Looks to prioritize/value of something, then figures out the reasons.',
    'Prioritizing, emotions, likes',
  ],
  otherNames: ['Feeling', 'Fi or Fe'],
};
const thinkingSide = {
  name: 'Thinking',
  shortName: 'T',
  val: 'T',
  descriptions: [
    'Looks to figure out the reasons of something, then figures out the priorities/values.',
    'Getting it done, reasons, what works',
  ],
  otherNames: ['Thinking', 'Ti or Te'],
};

//Letters
const feelingThinkingCoin: Coin = {
  name: 'Decider Letter',
  param: 'dl',
  sides: [feelingSide, thinkingSide],
  infoLink:
    'https://subjectivepersonality.wordpress.com/foundations/ops-starter-kit/ops-deciders/',
};

const intuitionSide = {
  name: 'Intuition',
  shortName: 'N',
  val: 'N',
  descriptions: [
    'Looks for abstract connections first, then sees the provable facts.',
    'Jumps to conclusions, tracks the patterns',
  ],
  otherNames: ['Ni or Ne'],
};

const sensorySide = {
  name: 'Sensory',
  shortName: 'S',
  val: 'S',
  descriptions: [
    'Looks for the proveable facts first, then sees the abstract connections.',
    'Responsible to prove the case, tracks the facts',
  ],
  otherNames: ['Si or Se'],
};
const sensoryIntuitionCoin: Coin = {
  name: 'Observer Letter',
  param: 'ol',
  sides: [sensorySide, intuitionSide],
  infoLink:
    'https://subjectivepersonality.wordpress.com/2020/04/24/observer-functions/',
};

const sleep = {
  name: 'Sleep',
  shortName: 'S',
  val: 'S',
  descriptions: [
    'Process and preserves energy for self, before expending energy for the tribe',
    'Same old story about me, processed, work alone',
    'Introverted Energy Animal',
  ],
  otherNames: ['Di + Oi'],
};

const play = {
  name: 'Play',
  shortName: 'P',
  val: 'P',
  descriptions: [
    'Expends energy for the tribe, before processing and preserving energy for self.',
    'Random story about others, process & do with others',
    'Extroverted Energy Animal',
  ],
  otherNames: ['De + Oe'],
};

const eAnimalCoin: Coin = {
  name: 'Energy Animal',
  param: 'ea',
  sides: [sleep, play],
  infoLink:
    'https://subjectivepersonality.wordpress.com/foundations/ops-starter-kit/animals#energy',
};

const blast = {
  name: 'Blast',
  shortName: 'B',
  val: 'B',
  descriptions: [
    'Gets started and is able to teach, before respecting and gathering info.',
    'Same old story about others, can talk, produce',
    'Extroverted Information Animal',
  ],
  otherNames: ['De + Oi'],
};

const consume = {
  name: 'Consume',
  shortName: 'C',
  val: 'C',
  descriptions: [
    'Takes in and respects info, before getting started and teaching.',
    'Random story about me, pile for me, savor',
    'Introverted Information Animal',
  ],
  otherNames: ['Oe + Di'],
};

const iAnimalCoin: Coin = {
  name: 'Info Animal',
  param: 'ia',
  sides: [blast, consume],
  infoLink:
    'https://subjectivepersonality.wordpress.com/foundations/ops-starter-kit/animals#info',
};

const info = {
  name: 'Info',
  shortName: 'I',
  val: 'Info',
  descriptions: [
    'Relative balance in conversations, knowledge is power',
    'Imbalanced with work and rest, over or under exert',
    'Blast and Consume in top 3 animals, Play or Sleep last.',
  ],
  otherNames: ['Play/Sleep Last'],
};

const energy = {
  name: 'Energy',
  shortName: 'E',
  val: 'Energy',
  descriptions: [
    'Relative balance with work and rest, goofy',
    'Imbalanced in conversations, overshare or undershare information',
    'Play and Sleep in top 3 animals, Consume or Blast last.',
  ],
  otherNames: ['Blast/Consume Last'],
};

const adomCoin: Coin = {
  name: 'Info / Energy Dominance',
  param: 'dom',
  sides: [info, energy],
  infoLink:
    'https://subjectivepersonality.wordpress.com/foundations/ops-starter-kit/info-vs-energy-dominant/',
};

const mde = {
  name: 'M De',
  shortName: 'M De',
  val: 'M',
  descriptions: [
    'Direct with the tribe, moveable on identity.',
    'Pressure on others, easy on self.',
  ],
  otherNames: ['De Masculine'],
};

const fde = {
  name: 'F De',
  shortName: 'F De',
  val: 'F',
  descriptions: [
    'Moveable with the tribe, direct on identity.',
    'Pressure on self, easy on others.',
  ],
  otherNames: ['De Feminine'],
};

const demodCoin: Coin = {
  name: 'De Modality',
  param: 'demod',
  sides: [fde, mde],
  infoLink:
    'https://subjectivepersonality.wordpress.com/foundations/ops-starter-kit/ops-sexual-modalities/#de',
};

let fsensory = {
  name: 'F Sensory',
  shortName: 'F S',
  val: 'F',
  descriptions: [
    'Solid with the concepts, moveable with the facts.',
    'Visual/Tester, visualizes pictures.',
  ],
};
let msensory = {
  name: 'M Sensory',
  shortName: 'M S',
  val: 'M',
  descriptions: [
    'Solid with the facts, moveable with the concepts.',
    'Audio/Kinesthetic, knows timeline.',
  ],
};

const smodCoin: Coin = {
  name: 'Sensory Modality',
  param: 'smod',
  sides: [fsensory, msensory],
  infoLink:
    'https://subjectivepersonality.wordpress.com/foundations/ops-starter-kit/ops-sexual-modalities/#sensory',
};

export const customCoin: Coin = {
  name: 'Custom Coin',
  param: 'custom',
  sides: [
    {
      name: 'Side 1',
      val: '1',
    },
    {
      name: 'Side 2',
      val: '2',
    },
    {
      name: 'Side 3',
      val: '3',
    },
    {
      name: 'Side 4',
      val: '4',
    },
  ],
};

const sexCoin: Coin = {
  name: 'Sex',
  param: 'sex',
  sides: [
    {
      name: 'Male',
      val: 'Male',
    },
    {
      name: 'Female',
      val: 'Female',
    },
  ],
};
const classCoin: Coin = {
  name: 'Class',
  param: 'co',
  sides: [
    {
      name: 'Class Only',
      val: 'Class Only',
    },
  ],
};
const incompleteCoin: Coin = {
  name: 'Incomplete',
  param: 'hi',
  sides: [
    {
      name: 'Hide Incomplete',
      val: 't',
    },
  ],
};
const speculationCoin: Coin = {
  name: 'Speculation',
  param: 'hs',
  sides: [
    {
      name: 'Hide Speculation',
      val: 't',
    },
  ],
};

export const coinMap = new Map();
coinMap.set('hn1', hn1Coin);
coinMap.set('dhn', dNeedCoin);
coinMap.set('ohn', oNeedCoin);

coinMap.set('dl', feelingThinkingCoin);
coinMap.set('ol', sensoryIntuitionCoin);

coinMap.set('ia', iAnimalCoin);
coinMap.set('ea', eAnimalCoin);
coinMap.set('dom', adomCoin);

coinMap.set('smod', smodCoin);
coinMap.set('demod', demodCoin);

export const coinSideMap = new Map();
coinSideMap.set('decider', deciderSide);
coinSideMap.set('observer', observerSide);

coinSideMap.set('tribe', tribeSide);
coinSideMap.set('self', selfSide);

coinSideMap.set('organize', organizeSide);
coinSideMap.set('gather', gatherSide);

coinSideMap.set('feeling', feelingSide);
coinSideMap.set('thinking', thinkingSide);

coinSideMap.set('sensory', sensorySide);
coinSideMap.set('intuition', intuitionSide);

coinSideMap.set('blast', blast);
coinSideMap.set('consume', consume);

coinSideMap.set('play', play);
coinSideMap.set('sleep', sleep);

coinSideMap.set('info', info);
coinSideMap.set('energy', energy);

coinSideMap.set('fsensory', fsensory);
coinSideMap.set('msensory', msensory);

coinSideMap.set('fde', fde);
coinSideMap.set('mde', mde);

//Update search component to use sides - similar to functions/clusters

export const extraCoins = new Map();
extraCoins.set('sex', sexCoin);
extraCoins.set('class', classCoin);
extraCoins.set('incomplete', incompleteCoin);
extraCoins.set('speculation', speculationCoin);