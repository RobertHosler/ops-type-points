import { TypedPerson } from '../service/ops-data.service';

const functions = [
  {
    label: 'Fe',
    coins: [
      { optionKey: 'dhn', sideKey: 'tribe' },
      { optionKey: 'dl', sideKey: 'feeling' },
    ],
  },
  {
    label: 'Fi',
    coins: [
      { optionKey: 'dhn', sideKey: 'self' },
      { optionKey: 'dl', sideKey: 'feeling' },
    ],
  },
  {
    label: 'Te',
    coins: [
      { optionKey: 'dhn', sideKey: 'tribe' },
      { optionKey: 'dl', sideKey: 'thinking' },
    ],
  },
  {
    label: 'Ti',
    coins: [
      { optionKey: 'dhn', sideKey: 'self' },
      { optionKey: 'dl', sideKey: 'thinking' },
    ],
  },
];

const observerFunctions = [
  {
    label: 'Ne',
    coins: [
      { optionKey: 'ohn', sideKey: 'gather' },
      { optionKey: 'ol', sideKey: 'intuition' },
    ],
  },
  {
    label: 'Ni',
    coins: [
      { optionKey: 'ohn', sideKey: 'organize' },
      { optionKey: 'ol', sideKey: 'intuition' },
    ],
  },
  {
    label: 'Se',
    coins: [
      { optionKey: 'ohn', sideKey: 'gather' },
      { optionKey: 'ol', sideKey: 'sensory' },
    ],
  },
  {
    label: 'Si',
    coins: [
      { optionKey: 'ohn', sideKey: 'organize' },
      { optionKey: 'ol', sideKey: 'sensory' },
    ],
  },
];

const needClusters = [
  {
    label: 'ExxJ',
    coins: [
      { optionKey: 'hn1', sideKey: 'decider' },
      { optionKey: 'dhn', sideKey: 'tribe' },
    ],
  },
  {
    label: 'IxxP',
    coins: [
      { optionKey: 'hn1', sideKey: 'decider' },
      { optionKey: 'dhn', sideKey: 'self' },
    ],
  },
  {
    label: 'ExxP',
    coins: [
      { optionKey: 'hn1', sideKey: 'observer' },
      { optionKey: 'ohn', sideKey: 'gather' },
    ],
  },
  {
    label: 'IxxJ',
    coins: [
      { optionKey: 'hn1', sideKey: 'observer' },
      { optionKey: 'ohn', sideKey: 'organize' },
    ],
  },
];

const letterClusters = [
  {
    label: 'NF',
    coins: [
      { optionKey: 'ol', sideKey: 'intuition' },
      { optionKey: 'dl', sideKey: 'feeling' },
    ],
  },
  {
    label: 'NT',
    coins: [
      { optionKey: 'ol', sideKey: 'intuition' },
      { optionKey: 'dl', sideKey: 'thinking' },
    ],
  },
  {
    label: 'SF',
    coins: [
      { optionKey: 'ol', sideKey: 'sensory' },
      { optionKey: 'dl', sideKey: 'feeling' },
    ],
  },
  {
    label: 'ST',
    coins: [
      { optionKey: 'ol', sideKey: 'sensory' },
      { optionKey: 'dl', sideKey: 'thinking' },
    ],
  },
  // {
  //   label: 'xx',
  //   coins: [
  //     { optionKey: 'ol', sideKey: 'x' },
  //     { optionKey: 'dl', sideKey: 'x' },
  //   ],
  // },
];

const animalClusters = [
  {
    label: 'PB',
    coins: [
      { optionKey: 'ia', sideKey: 'blast' },
      { optionKey: 'ea', sideKey: 'play' },
      { optionKey: 'dhn', sideKey: 'tribe' },
    ],
  },
  {
    label: 'BS',
    coins: [
      { optionKey: 'ia', sideKey: 'blast' },
      { optionKey: 'ea', sideKey: 'sleep' },
      { optionKey: 'ohn', sideKey: 'organize' },
    ],
  },
  {
    label: 'CP',
    coins: [
      { optionKey: 'ia', sideKey: 'consume' },
      { optionKey: 'ea', sideKey: 'play' },
      { optionKey: 'ohn', sideKey: 'gather' },
    ],
  },
  {
    label: 'SC',
    coins: [
      { optionKey: 'ia', sideKey: 'consume' },
      { optionKey: 'ea', sideKey: 'sleep' },
      { optionKey: 'dhn', sideKey: 'self' },
    ],
  },
];

const firstAnimals = [
  {
    label: 'P First',
    coins: [
      { optionKey: 'ohn', sideKey: 'gather' },
      { optionKey: 'dhn', sideKey: 'tribe' },
      { optionKey: 'ea', sideKey: 'play' },
    ],
  },
  {
    label: 'B First',
    coins: [
      { optionKey: 'ohn', sideKey: 'organize' },
      { optionKey: 'dhn', sideKey: 'tribe' },
      { optionKey: 'ia', sideKey: 'blast' },
    ],
  },
  {
    label: 'S First',
    coins: [
      { optionKey: 'ohn', sideKey: 'organize' },
      { optionKey: 'dhn', sideKey: 'self' },
      { optionKey: 'ea', sideKey: 'sleep' },
    ],
  },
  {
    label: 'C First',
    coins: [
      { optionKey: 'ohn', sideKey: 'gather' },
      { optionKey: 'dhn', sideKey: 'self' },
      { optionKey: 'ia', sideKey: 'consume' },
    ],
  },
];

const lastAnimals = [
  {
    label: 'P Last',
    coins: [
      { optionKey: 'dom', sideKey: 'info' },
      { optionKey: 'ea', sideKey: 'sleep' },
    ],
  },
  {
    label: 'B Last',
    coins: [
      { optionKey: 'dom', sideKey: 'energy' },
      { optionKey: 'ia', sideKey: 'consume' },
    ],
  },
  {
    label: 'S Last',
    coins: [
      { optionKey: 'dom', sideKey: 'info' },
      { optionKey: 'ea', sideKey: 'play' },
    ],
  },
  {
    label: 'C Last',
    coins: [
      { optionKey: 'dom', sideKey: 'energy' },
      { optionKey: 'ia', sideKey: 'blast' },
    ],
  },
  // {
  //   label: 'X',
  //   coins: [
  //     { optionKey: 'ia', sideKey: 'x' },
  //     { optionKey: 'ea', sideKey: 'x' },
  //     { optionKey: 'dom', sideKey: 'x' },
  //   ],
  // },
];

const modalityClusters = [
  {
    label: 'MM',
    coins: [
      { optionKey: 'smod', sideKey: 'msensory' },
      { optionKey: 'demod', sideKey: 'mde' },
    ],
  },
  {
    label: 'MF',
    coins: [
      { optionKey: 'smod', sideKey: 'msensory' },
      { optionKey: 'demod', sideKey: 'fde' },
    ],
  },
  {
    label: 'FF',
    coins: [
      { optionKey: 'smod', sideKey: 'fsensory' },
      { optionKey: 'demod', sideKey: 'fde' },
    ],
  },
  {
    label: 'FM',
    coins: [
      { optionKey: 'smod', sideKey: 'fsensory' },
      { optionKey: 'demod', sideKey: 'mde' },
    ],
  },
  // {
  //   label: 'xx',
  //   coins: [
  //     { optionKey: 'smod', sideKey: 'x' },
  //     { optionKey: 'demod', sideKey: 'x' },
  //   ],
  // },
];

const clusters = [
  {
    name: 'Need',
    cluster: needClusters,
  },
  {
    name: 'Decider Functions',
    cluster: functions,
  },
  {
    name: 'Observer Functions',
    cluster: observerFunctions,
  },
  {
    name: 'Letters',
    cluster: letterClusters,
  },
  {
    name: 'Animals',
    cluster: animalClusters,
  },
  {
    name: 'First Animal',
    cluster: firstAnimals,
  },
  {
    name: 'Last Animal',
    cluster: lastAnimals,
  },
  {
    name: 'Modalities',
    cluster: modalityClusters,
  },
];

export class ETypeModel {
  name: string;
  long: string;
  wings: string[];
}

const eTypes: ETypeModel[] = [
  {
    name: '2',
    long: 'two',
    wings: ['1', '3'],
  },
  {
    name: '3',
    long: 'three',
    wings: ['2', '4'],
  },
  {
    name: '4',
    long: 'four',
    wings: ['3', '5'],
  },
  {
    name: '5',
    long: 'five',
    wings: ['4', '6'],
  },
  {
    name: '6',
    long: 'six',
    wings: ['5', '7'],
  },
  {
    name: '7',
    long: 'seven',
    wings: ['6', '8'],
  },
  {
    name: '8',
    long: 'eight',
    wings: ['7', '9'],
  },
  {
    name: '9',
    long: 'nine',
    wings: ['8', '1'],
  },
  {
    name: '1',
    long: 'one',
    wings: ['9', '2'],
  },
];

export class InstinctModel {
  name: string;
  secondary: string[];
}

const instincts: InstinctModel[] = [
  {
    name: 'sp',
    secondary: ['so', 'sx'],
  },
  {
    name: 'sx',
    secondary: ['so', 'sp'],
  },
  {
    name: 'so',
    secondary: ['sp', 'sx'],
  },
];

const typeOnlyStrings = [
  'te',
  'ti',
  'fe',
  'fi',
  'ne',
  'ni',
  'se',
  'si',
  'mf',
  'mm',
  'fm',
  'ff',
  'pc',
  'cp',
  'sb',
  'bs',
  'bp',
  'pb',
  'sc',
  'cs',
  'oi',
  'oe',
  'di',
  'de',
  '(p)',
  '(s)',
  '(b)',
  '(c)',
];

const coreETypeStrings = [];
const coreETypeLong = [];
const eTypeStrings = [];
const trifixStrings = [];

const head = ['5', '6', '7'];
const heart = ['2', '3', '4'];
const gut = ['8', '9', '1'];

eTypes.forEach((eType) => {
  coreETypeStrings.push(eType.name);
  coreETypeLong.push(eType.long);
  eType.wings.forEach((wing) => {
    eTypeStrings.push(eType.name + 'w' + wing);
  });
});
gut.forEach((gutType) => {
  heart.forEach((heartType) => {
    head.forEach((headType) => {
      trifixStrings.push(gutType + heartType + headType);
      trifixStrings.push(gutType + headType + heartType);
      trifixStrings.push(heartType + headType + gutType);
      trifixStrings.push(heartType + gutType + headType);
      trifixStrings.push(headType + gutType + heartType);
      trifixStrings.push(headType + heartType + gutType);
    });
  });
});
trifixStrings.sort();

const predictions = [
  { term: 'kinesthetic', count: 4 },
  { term: 'sensory', count: 4 },
  { term: 'sensing', count: 4 },
  { term: 'thinking', count: 4 },
  { term: 'feeling', count: 3 },
  { term: 'intuition', count: 4 },
  { term: 'organize', count: 3 },
  { term: 'gather', count: 3 },
];

const comboTerms = new Map();
comboTerms.set('infp', { strings: ['fi/ne', 'fi/si', 'infp'] });
comboTerms.set('isfp', { strings: ['fi/se', 'fi/ni', 'isfp'] });
comboTerms.set('intp', { strings: ['ti/ne', 'ti/si', 'intp'] });
comboTerms.set('istp', { strings: ['ti/se', 'ti/ni', 'istp'] });
comboTerms.set('ixxp', {
  strings: [
    'fi/ne',
    'fi/si',
    'infp',
    'fi/se',
    'fi/ni',
    'isfp',
    'ti/ne',
    'ti/si',
    'intp',
    'ti/se',
    'ti/ni',
    'istp',
  ],
});
comboTerms.set('entp', { strings: ['ne/ti', 'ne/fe', 'entp'] });
comboTerms.set('estp', { strings: ['se/ti', 'se/fe', 'estp'] });
comboTerms.set('enfp', { strings: ['ne/fi', 'ne/te', 'enfp'] });
comboTerms.set('esfp', { strings: ['se/fi', 'se/te', 'esfp'] });
comboTerms.set('exxp', {
  strings: [
    'ne/ti',
    'ne/fe',
    'entp',
    'se/ti',
    'se/fe',
    'estp',
    'ne/fi',
    'ne/te',
    'enfp',
    'se/fi',
    'se/te',
    'esfp',
  ],
});
comboTerms.set('istj', { strings: ['si/te', 'si/fi', 'istj'] });
comboTerms.set('intj', { strings: ['ni/te', 'ni/fi', 'intj'] });
comboTerms.set('isfj', { strings: ['si/fe', 'si/ti', 'isfj'] });
comboTerms.set('infj', { strings: ['ni/fe', 'ni/ti', 'infj'] });
comboTerms.set('ixxj', {
  strings: [
    'si/te',
    'si/fi',
    'istj',
    'ni/te',
    'ni/fi',
    'intj',
    'si/fe',
    'si/ti',
    'isfj',
    'ni/fe',
    'ni/ti',
    'infj',
  ],
});
comboTerms.set('estj', { strings: ['te/si', 'te/ne', 'estj'] });
comboTerms.set('entj', { strings: ['te/ni', 'te/se', 'entj'] });
comboTerms.set('esfj', { strings: ['fe/si', 'fe/ne', 'esfj'] });
comboTerms.set('enfj', { strings: ['fe/ni', 'fe/se', 'enfj'] });
comboTerms.set('exxj', {
  strings: [
    'fe/ni',
    'fe/se',
    'enfj',
    'fe/si',
    'fe/ne',
    'esfj',
    'te/ni',
    'te/se',
    'entj',
    'te/si',
    'te/ne',
    'estj',
  ],
});
comboTerms.set('oe', { strings: ['se', 'ne', 'oe'] });
comboTerms.set('gather', { strings: ['se', 'ne', 'oe'] });
comboTerms.set('oi', { strings: ['si', 'ni', 'oi'] });
comboTerms.set('organize', { strings: ['si', 'ni', 'oi'] });
comboTerms.set('di', { strings: ['fi', 'ti', 'di'] });
comboTerms.set('self', { strings: ['fi', 'ti', 'di'] });
comboTerms.set('de', { strings: ['fe', 'te', 'de'] });
comboTerms.set('tribe', { strings: ['fe', 'te', 'de'] });
comboTerms.set('feeling', { strings: ['fe', 'fi'] });
comboTerms.set('thinking', { strings: ['te', 'ti'] });
comboTerms.set('sensing', { strings: ['se', 'si'] });
comboTerms.set('sensory', { strings: ['se', 'si'] });
comboTerms.set('intuition', { strings: ['ne', 'ni'] });
comboTerms.set('xf', { strings: ['mf', 'ff', '?f'] });
comboTerms.set('fde', { strings: ['mf', 'ff', '?f'] });
comboTerms.set('xm', { strings: ['mm', 'fm', '?m'] });
comboTerms.set('mde', { strings: ['mm', 'fm', '?m'] });
comboTerms.set('mx', { strings: ['mm', 'mf', 'm?'] });
comboTerms.set('ms', { strings: ['mm', 'mf', 'm?'] });
comboTerms.set('msensory', { strings: ['mm', 'mf', 'm?'] });
comboTerms.set('fx', { strings: ['fm', 'ff', 'f?'] });
comboTerms.set('fs', { strings: ['fm', 'ff', 'f?'] });
comboTerms.set('fsensory', { strings: ['fm', 'ff', 'f?'] });
comboTerms.set('audio', { strings: ['mf'] });
comboTerms.set('visual', { strings: ['fm'] });
comboTerms.set('tester', { strings: ['ff'] });
comboTerms.set('kinesthetic', { strings: ['mm'] });
comboTerms.set('info', { strings: ['(p)', '(s)'] });
comboTerms.set('energy', { strings: ['(b)', '(c)'] });

comboTerms.set('alpha', {
  strings: [
    ['si', 'ne'],
    ['ti', 'fe'],
  ],
});
comboTerms.set('beta', {
  strings: [
    ['ni', 'se'],
    ['ti', 'fe'],
  ],
});
comboTerms.set('gamma', {
  strings: [
    ['ni', 'se'],
    ['fi', 'te'],
  ],
});
comboTerms.set('delta', {
  strings: [
    ['si', 'ne'],
    ['fi', 'te'],
  ],
});

const oi = ['ni', 'si', 'oi'];
const oe = ['ne', 'se', 'oe'];
const di = ['fi', 'ti', 'di'];
const de = ['fe', 'te', 'de'];

const oidi = [];
const dioi = [];
oi.forEach((o) => {
  di.forEach((d) => {
    oidi.push(o + '/' + d);
    dioi.push(d + '/' + o);
  });
});
comboTerms.set('oi/di', { strings: oidi });
comboTerms.set('di/oi', { strings: dioi });

const oide = [];
const deoi = [];
oi.forEach((o) => {
  de.forEach((d) => {
    oide.push(o + '/' + d);
    deoi.push(d + '/' + o);
  });
});
comboTerms.set('oi/de', { strings: oide });
comboTerms.set('de/oi', { strings: deoi });

const oede = [];
const deoe = [];
oe.forEach((o) => {
  de.forEach((d) => {
    oede.push(o + '/' + d);
    deoe.push(d + '/' + o);
  });
});
comboTerms.set('oe/de', { strings: oede });
comboTerms.set('de/oe', { strings: deoe });

const oedi = [];
const dioe = [];
oe.forEach((o) => {
  di.forEach((d) => {
    oedi.push(o + '/' + d);
    dioe.push(d + '/' + o);
  });
});
comboTerms.set('oe/di', { strings: oedi });
comboTerms.set('di/oe', { strings: dioe });

const personTerms = new Map();
personTerms.set('nf', {
  match: (person: TypedPerson) => {
    return person.observerLetter === 'N' && person.deciderLetter === 'F';
  },
});
personTerms.set('nt', {
  match: (person: TypedPerson) => {
    return person.observerLetter === 'N' && person.deciderLetter === 'T';
  },
});
personTerms.set('sf', {
  match: (person: TypedPerson) => {
    return person.observerLetter === 'S' && person.deciderLetter === 'F';
  },
});
personTerms.set('st', {
  match: (person: TypedPerson) => {
    return person.observerLetter === 'S' && person.deciderLetter === 'T';
  },
});
personTerms.set('jumper', {
  match: (person: TypedPerson) => {
    return (
      (person.deciderNeed === 'De' && person.observerNeed === 'Oe') ||
      (person.deciderNeed === 'Di' && person.observerNeed === 'Oi')
    );
  },
});
personTerms.set('decider', {
  match: (person: TypedPerson) => {
    return person.coreNeed === 'Decider';
  },
});
personTerms.set('observer', {
  match: (person: TypedPerson) => {
    return person.coreNeed === 'Observer';
  },
});
personTerms.set('sleep', {
  match: (person: TypedPerson) => {
    return person.energyAnimal === 'S';
  },
});
personTerms.set('play', {
  match: (person: TypedPerson) => {
    return person.energyAnimal === 'P';
  },
});
personTerms.set('consume', {
  match: (person: TypedPerson) => {
    return person.infoAnimal === 'C';
  },
});
personTerms.set('blast', {
  match: (person: TypedPerson) => {
    return person.infoAnimal === 'B';
  },
});
personTerms.set('male', {
  match: (person: TypedPerson) => {
    return (
      person.sex &&
      ((!person.trans && person.sex === 'Male') ||
        (person.trans && person.sex === 'Female'))
    );
  },
});
personTerms.set('female', {
  match: (person: TypedPerson) => {
    return (
      person.sex &&
      ((!person.trans && person.sex === 'Female') ||
        (person.trans && person.sex === 'Male'))
    );
  },
});

const tagTerms = [
  'class',
  'spec',
  'speculation',
  'incomplete',
  'ennea',
  'enneagram',
  'community',
];

export const searchModel = {
  functions: functions,
  observerFunctions: observerFunctions,
  needClusters: needClusters,
  letterClusters: letterClusters,
  animalClusters: animalClusters,
  firstAnimals: firstAnimals,
  lastAnimals: lastAnimals,
  modalityClusters: modalityClusters,
  clusters: clusters,
  eTypes: eTypes,
  instincts: instincts,
  typeOnlyStrings: typeOnlyStrings,
  coreETypeStrings: coreETypeStrings,
  coreETypeLong: coreETypeLong,
  eTypeStrings: eTypeStrings,
  trifixStrings: trifixStrings,
  comboTerms: comboTerms,
  tagTerms: tagTerms,
  personTerms: personTerms,
  predictions: predictions,
};
