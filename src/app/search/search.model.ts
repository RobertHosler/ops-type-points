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
const trifixStacks = [];

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
      trifixStacks.push(heartType + headType + gutType);
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
trifixStacks.sort();

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

comboTerms.set('pcsb', { strings: ['pc/s'] });
comboTerms.set('pcs', { strings: ['pc/s'] });
comboTerms.set('pcbs', { strings: ['pc/b'] });
comboTerms.set('pcb', { strings: ['pc/b'] });
comboTerms.set('pbcs', { strings: ['pb/c'] });
comboTerms.set('pbc', { strings: ['pb/c'] });
comboTerms.set('pbsc', { strings: ['pb/s'] });
comboTerms.set('pbs', { strings: ['pb/s'] });

comboTerms.set('sbc', { strings: ['sb/c'] });
comboTerms.set('sbcp', { strings: ['sb/c'] });
comboTerms.set('sbpc', { strings: ['sb/p'] });
comboTerms.set('sbp', { strings: ['sb/p'] });
comboTerms.set('scpb', { strings: ['sc/p'] });
comboTerms.set('scp', { strings: ['sc/p'] });
comboTerms.set('scbp', { strings: ['sc/b'] });
comboTerms.set('scb', { strings: ['sc/b'] });

comboTerms.set('csbp', { strings: ['cs/b'] });
comboTerms.set('csb', { strings: ['cs/b'] });
comboTerms.set('cspb', { strings: ['cs/p'] });
comboTerms.set('csp', { strings: ['cs/p'] });
comboTerms.set('cpsb', { strings: ['cp/s'] });
comboTerms.set('cps', { strings: ['cp/s'] });
comboTerms.set('cpbs', { strings: ['cp/b'] });
comboTerms.set('cpb', { strings: ['cp/b'] });

comboTerms.set('bspc', { strings: ['bs/p'] });
comboTerms.set('bsp', { strings: ['bs/p'] });
comboTerms.set('bscp', { strings: ['bs/c'] });
comboTerms.set('bsc', { strings: ['bs/c'] });
comboTerms.set('bpsc', { strings: ['bp/s'] });
comboTerms.set('bps', { strings: ['bp/s'] });
comboTerms.set('bpcs', { strings: ['bp/c'] });
comboTerms.set('bpc', { strings: ['bp/c'] });

comboTerms.set('tese', { strings: ['te/se'] });
comboTerms.set('fese', { strings: ['fe/se'] });
comboTerms.set('tene', { strings: ['te/ne'] });
comboTerms.set('fene', { strings: ['fe/ne'] });
comboTerms.set('sete', { strings: ['se/te'] });
comboTerms.set('sefe', { strings: ['se/fe'] });
comboTerms.set('nete', { strings: ['ne/te'] });
comboTerms.set('nefe', { strings: ['ne/fe'] });

comboTerms.set('tesi', { strings: ['te/si'] });
comboTerms.set('fesi', { strings: ['fe/si'] });
comboTerms.set('teni', { strings: ['te/ni'] });
comboTerms.set('feni', { strings: ['fe/ni'] });
comboTerms.set('site', { strings: ['si/te'] });
comboTerms.set('sife', { strings: ['si/fe'] });
comboTerms.set('nite', { strings: ['ni/te'] });
comboTerms.set('nife', { strings: ['ni/fe'] });

comboTerms.set('tise', { strings: ['ti/se'] });
comboTerms.set('fise', { strings: ['fi/se'] });
comboTerms.set('tine', { strings: ['ti/ne'] });
comboTerms.set('fine', { strings: ['fi/ne'] });
comboTerms.set('seti', { strings: ['se/ti'] });
comboTerms.set('sefi', { strings: ['se/fi'] });
comboTerms.set('neti', { strings: ['ne/ti'] });
comboTerms.set('nefi', { strings: ['ne/fi'] });

comboTerms.set('tisi', { strings: ['ti/si'] });
comboTerms.set('fisi', { strings: ['fi/si'] });
comboTerms.set('tini', { strings: ['ti/ni'] });
comboTerms.set('fini', { strings: ['fi/ni'] });
comboTerms.set('siti', { strings: ['si/ti'] });
comboTerms.set('sifi', { strings: ['si/fi'] });
comboTerms.set('niti', { strings: ['ni/ti'] });
comboTerms.set('nifi', { strings: ['ni/fi'] });

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

const isMasculineFeeling = function (person: TypedPerson) {
  return (
    // M Fe Savior
    (person.deMod === 'M' &&
      person.deciderLetter === 'F' &&
      person.deciderNeed === 'De') ||
    // M Fe Demon
    (person.deMod === 'M' &&
      person.deciderLetter === 'T' &&
      person.deciderNeed === 'Di') ||
    // M Fi Savior
    (person.deMod === 'F' &&
      person.deciderLetter === 'F' &&
      person.deciderNeed === 'Di') ||
    // M Fi Demon
    (person.deMod === 'F' &&
      person.deciderLetter === 'T' &&
      person.deciderNeed === 'De')
  );
};
const isMasculineOi = function (person: TypedPerson) {
  return (
    // M Si Savior
    (person.sensoryMod === 'M' &&
      person.observerNeed === 'Oi' &&
      person.observerLetter === 'S') ||
    // M Si Demon
    (person.sensoryMod === 'M' &&
      person.observerNeed === 'Oe' &&
      person.observerLetter === 'N') ||
    // M Ni Savior
    (person.sensoryMod === 'F' &&
      person.observerNeed === 'Oi' &&
      person.observerLetter === 'N') ||
    // M Ni Demon
    (person.sensoryMod === 'F' &&
      person.observerNeed === 'Oe' &&
      person.observerLetter === 'S')
  );
};

const personTerms = new Map();
personTerms.set('mdi', {
  match: (person: TypedPerson) => {
    return person.deMod && person.deMod === 'F';
  },
});
personTerms.set('fdi', {
  match: (person: TypedPerson) => {
    return person.deMod && person.deMod === 'M';
  },
});
personTerms.set('mfeeling', {
  match: (person: TypedPerson) => {
    return isMasculineFeeling(person);
  },
});
personTerms.set('ffeeling', {
  match: (person: TypedPerson) => {
    if (person.deMod && person.deciderLetter && person.deciderNeed) {
      return !isMasculineFeeling(person);
    } else {
      return false;
    }
  },
});
personTerms.set('mthinking', {
  match: (person: TypedPerson) => {
    if (person.deMod && person.deciderLetter && person.deciderNeed) {
      return !isMasculineFeeling(person);
    } else {
      return false;
    }
  },
});
personTerms.set('fthinking', {
  match: (person: TypedPerson) => {
    return isMasculineFeeling(person);
  },
});
personTerms.set('moi', {
  match: (person: TypedPerson) => {
    return isMasculineOi(person);
  },
});
personTerms.set('moe', {
  match: (person: TypedPerson) => {
    if (person.sensoryMod && person.observerLetter && person.observerNeed) {
      return !isMasculineOi(person);
    } else {
      return false;
    }
  },
});
personTerms.set('foi', {
  match: (person: TypedPerson) => {
    if (person.sensoryMod && person.observerLetter && person.observerNeed) {
      return !isMasculineOi(person);
    } else {
      return false;
    }
  },
});
personTerms.set('foe', {
  match: (person: TypedPerson) => {
    return isMasculineOi(person);
  },
});
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
  'wss',
  'ops',
];

const socionicsTypes = [
  'ile',
  'lii',
  'ese',
  'sei',

  'eie',
  'iei',
  'lsi',
  'sle',

  'lie',
  'ili',
  'see',
  'esi',

  'iee',
  'eii',
  'sli',
  'lse',
];

const typeAhead = [];
typeAhead.push(socionicsTypes);
typeAhead.push(tagTerms);

const opsRules = [
  {
    label: 'All OPS Tagged',
    examples: ['ops'],
  },
  {
    label: 'Class Typings',
    examples: ['ops class'],
  },
  {
    label: 'Decider',
    examples: ['exxj', 'ixxp', 'decider'],
  },
  {
    label: 'Observer',
    examples: ['exxp', 'ixxj', 'observer'],
  },
  {
    label: 'Decider Need',
    examples: ['Di', 'De', 'self', 'tribe'],
  },
  {
    label: 'Observer Need',
    examples: ['Oi', 'Oe', 'organize', 'gather'],
  },
  {
    label: 'Decider Letter',
    examples: ['think', 'feel'],
  },
  {
    label: 'Observer Letter',
    examples: ['intuition', 'sensing'],
  },
  {
    label: 'Letters',
    examples: ['SF', 'NT', 'ST', 'NF'],
  },
  {
    label: 'Decider Functions',
    examples: ['Fe', 'Te', 'Fi', 'Ti'],
  },
  {
    label: 'Observer Functions',
    examples: ['Ne', 'Se', 'Ni', 'Si'],
  },
  {
    label: 'Info/Energy',
    examples: ['info', 'energy'],
  },
  {
    label: 'Last Animal',
    examples: ['(b)', '(s)', '(c)', '(p)'],
  },
  {
    label: 'Savior Animals',
    examples: ['PC', 'SB', 'BP', 'CS'],
  },
  {
    label: 'Animal Stacks',
    examples: ['PC/S', 'SB/P', 'BP/S', 'CS/B'],
  },
  {
    label: 'Modalities',
    examples: ['MM', 'MF', 'FM', 'FF'],
  },
  {
    label: 'Sensory Modality',
    examples: ['Mx', 'Fx', 'MS', 'FS'],
  },
  {
    label: 'De Modality',
    examples: ['xM', 'xF', 'MDe', 'FDe'],
  },
  {
    label: 'Observer Modality',
    examples: ['MOi', 'FOi', 'MOe', 'FOe'],
  },
  {
    label: 'Di Modality',
    examples: ['MDi', 'FDi'],
  },
  {
    label: 'ExxJ',
    examples: ['ENTJ', 'ESTJ', 'ESFJ', 'ENFJ'],
  },
  {
    label: 'IxxP',
    examples: ['ISTP', 'INTP', 'ISFP', 'INFP'],
  },
  {
    label: 'ExxP',
    examples: ['ENTP', 'ESTP', 'ESFP', 'ENFP'],
  },
  {
    label: 'IxxJ',
    examples: ['ISTJ', 'INTJ', 'ISFJ', 'INFJ'],
  },
  {
    label: 'Jumper',
    examples: ['Jumper ESFJ', 'Fe/Ne'],
  },
  {
    label: 'Not Jumper',
    examples: ['INFJ !Jumper', 'Ni/Fe'],
  },
  {
    label: 'Quadra',
    examples: ['Alpha', 'Beta', 'Gamma', 'Delta'],
  },
  {
    label: 'Sex',
    examples: ['ops Male', 'ops Female'],
  },
  {
    label: 'Community Members',
    examples: ['ops community'],
  },
  {
    label: 'Exclude Speculative',
    examples: ['ops !speculation'],
  },
  {
    label: 'Exclude Incomplete',
    examples: ['ops !incomplete'],
  },
];

const enneaRules = [
  {
    label: 'Enneagram Tagged',
    examples: ['ennea'],
  },
];

const wssRules = [
  {
    label: 'WSS Tagged',
    examples: ['wss'],
  },
  {
    label: 'Compare with OPS',
    examples: ['LII Ti', 'ILE Ne'],
  },
  {
    label: 'Compare with Ennea',
    examples: ['SEI 9', 'SLE 8'],
  },
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
  trifixStacks: trifixStacks,
  comboTerms: comboTerms,
  tagTerms: tagTerms,
  personTerms: personTerms,
  predictions: predictions,
  socionicsTypes: socionicsTypes,
  typeAhead: typeAhead,
  opsRules: opsRules,
  enneaRules: enneaRules,
  wssRules: wssRules,
};
