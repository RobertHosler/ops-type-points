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
const trifixTable = [];
const trifixMap = new Map();

const head = ['5', '6', '7'];
const heart = ['2', '3', '4'];
const gut = ['8', '9', '1'];
// const head = ['1', '4', '7'];
// const heart = ['2', '5', '8'];
// const gut = ['3', '6', '9'];

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
      const stack = [heartType, headType, gutType];
      const stackString = stack.join('');
      stack.sort();
      trifixStacks.push(stackString);
      const tempStrings = [];
      tempStrings.push(heartType + headType + gutType);
      tempStrings.push(heartType + gutType + headType);
      tempStrings.push(headType + gutType + heartType);
      tempStrings.push(headType + heartType + gutType);
      tempStrings.push(gutType + heartType + headType);
      tempStrings.push(gutType + headType + heartType);
      trifixStrings.push(...tempStrings);
      trifixTable.push(tempStrings);
      tempStrings.forEach((fix) => {
        trifixMap.set(fix, tempStrings);
      });
    });
  });
});
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
  { term: 'responsibility', count: 4 },
  { term: 'speculation', count: 4 },
  { term: 'tessera', count: 4 },
];

// Combo Terms - key = lookup all terms at the same time
const comboTerms = new Map();
comboTerms.set('infp', { strings: ['fi/ne', 'fi/si', 'infp'] });
comboTerms.set('isfp', { strings: ['fi/se', 'fi/ni', 'isfp'] });
comboTerms.set('intp', { strings: ['ti/ne', 'ti/si', 'intp'] });
comboTerms.set('istp', { strings: ['ti/se', 'ti/ni', 'istp'] });
const ipStrings = [
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
];
comboTerms.set('ixxp', {
  strings: ipStrings,
});
comboTerms.set('ip', {
  strings: ipStrings,
});
comboTerms.set('entp', { strings: ['ne/ti', 'ne/fe', 'entp'] });
comboTerms.set('estp', { strings: ['se/ti', 'se/fe', 'estp'] });
comboTerms.set('enfp', { strings: ['ne/fi', 'ne/te', 'enfp'] });
comboTerms.set('esfp', { strings: ['se/fi', 'se/te', 'esfp'] });
const exxpStrings = [
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
];
comboTerms.set('exxp', {
  strings: exxpStrings,
});
comboTerms.set('ep', {
  strings: exxpStrings,
});
comboTerms.set('istj', { strings: ['si/te', 'si/fi', 'istj'] });
comboTerms.set('intj', { strings: ['ni/te', 'ni/fi', 'intj'] });
comboTerms.set('isfj', { strings: ['si/fe', 'si/ti', 'isfj'] });
comboTerms.set('infj', { strings: ['ni/fe', 'ni/ti', 'infj'] });
const ixxjStrings = [
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
];
comboTerms.set('ixxj', {
  strings: ixxjStrings,
});
comboTerms.set('ij', {
  strings: ixxjStrings,
});
comboTerms.set('estj', { strings: ['te/si', 'te/ne', 'estj'] });
comboTerms.set('entj', { strings: ['te/ni', 'te/se', 'entj'] });
comboTerms.set('esfj', { strings: ['fe/si', 'fe/ne', 'esfj'] });
comboTerms.set('enfj', { strings: ['fe/ni', 'fe/se', 'enfj'] });
const exxjStrings = [
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
];
comboTerms.set('exxj', {
  strings: exxjStrings,
});
comboTerms.set('ej', {
  strings: exxjStrings,
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
comboTerms.set('fintuition', { strings: ['mm', 'mf', 'm?'] });
comboTerms.set('fsensory', { strings: ['fm', 'ff', 'f?'] });
comboTerms.set('mintuition', { strings: ['fm', 'ff', 'f?'] });
comboTerms.set('fx', { strings: ['fm', 'ff', 'f?'] });
comboTerms.set('fs', { strings: ['fm', 'ff', 'f?'] });
comboTerms.set('fsensory', { strings: ['fm', 'ff', 'f?'] });
comboTerms.set('audio', { strings: ['mf'] });
comboTerms.set('visual', { strings: ['fm'] });
comboTerms.set('tester', { strings: ['ff'] });
comboTerms.set('kinesthetic', { strings: ['mm'] });
comboTerms.set('info', { strings: ['(p)', '(s)'] });
comboTerms.set('energy', { strings: ['(b)', '(c)'] });
comboTerms.set('introvert', { strings: ['(p)', '(b)'] });
comboTerms.set('extrovert', { strings: ['(c)', '(s)'] });
comboTerms.set('skib', { strings: ['cp', 'pc'] });
comboTerms.set('mope', { strings: ['cs', 'sc'] });
comboTerms.set('crackhead', { strings: ['bp', 'pb'] });
comboTerms.set('douchebag', { strings: ['bs', 'sb'] });

comboTerms.set('pcsb', { strings: ['pc/s'] });
comboTerms.set('pcs', { strings: ['pc/s'] });
comboTerms.set('pcbs', { strings: ['pc/b'] });
comboTerms.set('pcb', { strings: ['pc/b'] });
comboTerms.set('pbcs', { strings: ['pb/c'] });
comboTerms.set('pbc', { strings: ['pb/c'] });
comboTerms.set('pbsc', { strings: ['pb/s'] });
comboTerms.set('pbs', { strings: ['pb/s'] });

comboTerms.set('pc/sb', { strings: ['pc/s'] });
comboTerms.set('pc/s(b)', { strings: ['pc/s'] });
comboTerms.set('pc/s', { strings: ['pc/s'] });
comboTerms.set('pc/bs', { strings: ['pc/b'] });
comboTerms.set('pc/b(s)', { strings: ['pc/b'] });
comboTerms.set('pc/b', { strings: ['pc/b'] });
comboTerms.set('pc/', { strings: ['pc/'] });
comboTerms.set('pb/cs', { strings: ['pb/c'] });
comboTerms.set('pb/c(s)', { strings: ['pb/c'] });
comboTerms.set('pb/c', { strings: ['pb/c'] });
comboTerms.set('pb/sc', { strings: ['pb/s'] });
comboTerms.set('pb/s(c)', { strings: ['pb/s'] });
comboTerms.set('pb/s', { strings: ['pb/s'] });
comboTerms.set('pb/', { strings: ['pb/'] });

comboTerms.set('sbc', { strings: ['sb/c'] });
comboTerms.set('sbcp', { strings: ['sb/c'] });
comboTerms.set('sbpc', { strings: ['sb/p'] });
comboTerms.set('sbp', { strings: ['sb/p'] });
comboTerms.set('scpb', { strings: ['sc/p'] });
comboTerms.set('scp', { strings: ['sc/p'] });
comboTerms.set('scbp', { strings: ['sc/b'] });
comboTerms.set('scb', { strings: ['sc/b'] });

comboTerms.set('sb/c', { strings: ['sb/c'] });
comboTerms.set('sb/cp', { strings: ['sb/c'] });
comboTerms.set('sb/c(p)', { strings: ['sb/c'] });
comboTerms.set('sb/pc', { strings: ['sb/p'] });
comboTerms.set('sb/p(c)', { strings: ['sb/p'] });
comboTerms.set('sb/p', { strings: ['sb/p'] });
comboTerms.set('sb/', { strings: ['sb/'] });
comboTerms.set('sc/pb', { strings: ['sc/p'] });
comboTerms.set('sc/p(b)', { strings: ['sc/p'] });
comboTerms.set('sc/p', { strings: ['sc/p'] });
comboTerms.set('sc/bp', { strings: ['sc/b'] });
comboTerms.set('sc/b(p)', { strings: ['sc/b'] });
comboTerms.set('sc/b', { strings: ['sc/b'] });
comboTerms.set('sc/', { strings: ['sc/'] });

comboTerms.set('csbp', { strings: ['cs/b'] });
comboTerms.set('csb', { strings: ['cs/b'] });
comboTerms.set('cspb', { strings: ['cs/p'] });
comboTerms.set('csp', { strings: ['cs/p'] });
comboTerms.set('cpsb', { strings: ['cp/s'] });
comboTerms.set('cps', { strings: ['cp/s'] });
comboTerms.set('cpbs', { strings: ['cp/b'] });
comboTerms.set('cpb', { strings: ['cp/b'] });

comboTerms.set('cs/bp', { strings: ['cs/b'] });
comboTerms.set('cs/b(p)', { strings: ['cs/b'] });
comboTerms.set('cs/b', { strings: ['cs/b'] });
comboTerms.set('cs/pb', { strings: ['cs/p'] });
comboTerms.set('cs/p(b)', { strings: ['cs/p'] });
comboTerms.set('cs/p', { strings: ['cs/p'] });
comboTerms.set('cs/', { strings: ['cs/'] });
comboTerms.set('cp/sb', { strings: ['cp/s'] });
comboTerms.set('cp/s(b)', { strings: ['cp/s'] });
comboTerms.set('cp/s', { strings: ['cp/s'] });
comboTerms.set('cp/bs', { strings: ['cp/b'] });
comboTerms.set('cp/b(s)', { strings: ['cp/b'] });
comboTerms.set('cp/b', { strings: ['cp/b'] });
comboTerms.set('cp/', { strings: ['cp/'] });

comboTerms.set('bspc', { strings: ['bs/p'] });
comboTerms.set('bsp', { strings: ['bs/p'] });
comboTerms.set('bscp', { strings: ['bs/c'] });
comboTerms.set('bsc', { strings: ['bs/c'] });
comboTerms.set('bpsc', { strings: ['bp/s'] });
comboTerms.set('bps', { strings: ['bp/s'] });
comboTerms.set('bpcs', { strings: ['bp/c'] });
comboTerms.set('bpc', { strings: ['bp/c'] });

comboTerms.set('bs/pc', { strings: ['bs/p'] });
comboTerms.set('bs/p(c)', { strings: ['bs/p'] });
comboTerms.set('bs/p', { strings: ['bs/p'] });
comboTerms.set('bs/cp', { strings: ['bs/c'] });
comboTerms.set('bs/c(p)', { strings: ['bs/c'] });
comboTerms.set('bs/c', { strings: ['bs/c'] });
comboTerms.set('bs/', { strings: ['bs/'] });
comboTerms.set('bp/sc', { strings: ['bp/s'] });
comboTerms.set('bp/s(c)', { strings: ['bp/s'] });
comboTerms.set('bp/s', { strings: ['bp/s'] });
comboTerms.set('bp/cs', { strings: ['bp/c'] });
comboTerms.set('bp/c(s)', { strings: ['bp/c'] });
comboTerms.set('bp/c', { strings: ['bp/c'] });
comboTerms.set('bp/', { strings: ['bp/'] });

comboTerms.set('xxxp', { strings: ['(p)'] });
comboTerms.set('playlast', { strings: ['(p)'] });
comboTerms.set('xxxs', { strings: ['(s)'] });
comboTerms.set('sleeplast', { strings: ['(s)'] });
comboTerms.set('xxxb', { strings: ['(b)'] });
comboTerms.set('blastlast', { strings: ['(b)'] });
comboTerms.set('xxxc', { strings: ['(c)'] });
comboTerms.set('consumelast', { strings: ['(c)'] });

comboTerms.set('tese', { strings: ['te/se'] });
comboTerms.set('fese', { strings: ['fe/se'] });
comboTerms.set('tene', { strings: ['te/ne'] });
comboTerms.set('fene', { strings: ['fe/ne'] });
comboTerms.set('sete', { strings: ['se/te'] });
comboTerms.set('sefe', { strings: ['se/fe'] });
comboTerms.set('nete', { strings: ['ne/te'] });
comboTerms.set('nefe', { strings: ['ne/fe'] });

comboTerms.set('te/se', { strings: ['te/se'] });
comboTerms.set('fe/se', { strings: ['fe/se'] });
comboTerms.set('te/ne', { strings: ['te/ne'] });
comboTerms.set('fe/ne', { strings: ['fe/ne'] });
comboTerms.set('se/te', { strings: ['se/te'] });
comboTerms.set('se/fe', { strings: ['se/fe'] });
comboTerms.set('ne/te', { strings: ['ne/te'] });
comboTerms.set('ne/fe', { strings: ['ne/fe'] });

comboTerms.set('tesi', { strings: ['te/si'] });
comboTerms.set('fesi', { strings: ['fe/si'] });
comboTerms.set('teni', { strings: ['te/ni'] });
comboTerms.set('feni', { strings: ['fe/ni'] });
comboTerms.set('site', { strings: ['si/te'] });
comboTerms.set('sife', { strings: ['si/fe'] });
comboTerms.set('nite', { strings: ['ni/te'] });
comboTerms.set('nife', { strings: ['ni/fe'] });

comboTerms.set('te/si', { strings: ['te/si'] });
comboTerms.set('fe/si', { strings: ['fe/si'] });
comboTerms.set('te/ni', { strings: ['te/ni'] });
comboTerms.set('fe/ni', { strings: ['fe/ni'] });
comboTerms.set('si/te', { strings: ['si/te'] });
comboTerms.set('si/fe', { strings: ['si/fe'] });
comboTerms.set('ni/te', { strings: ['ni/te'] });
comboTerms.set('ni/fe', { strings: ['ni/fe'] });

comboTerms.set('tise', { strings: ['ti/se'] });
comboTerms.set('fise', { strings: ['fi/se'] });
comboTerms.set('tine', { strings: ['ti/ne'] });
comboTerms.set('fine', { strings: ['fi/ne'] });
comboTerms.set('seti', { strings: ['se/ti'] });
comboTerms.set('sefi', { strings: ['se/fi'] });
comboTerms.set('neti', { strings: ['ne/ti'] });
comboTerms.set('nefi', { strings: ['ne/fi'] });

comboTerms.set('ti/se', { strings: ['ti/se'] });
comboTerms.set('fi/se', { strings: ['fi/se'] });
comboTerms.set('ti/ne', { strings: ['ti/ne'] });
comboTerms.set('fi/ne', { strings: ['fi/ne'] });
comboTerms.set('se/ti', { strings: ['se/ti'] });
comboTerms.set('se/fi', { strings: ['se/fi'] });
comboTerms.set('ne/ti', { strings: ['ne/ti'] });
comboTerms.set('ne/fi', { strings: ['ne/fi'] });

comboTerms.set('tisi', { strings: ['ti/si'] });
comboTerms.set('fisi', { strings: ['fi/si'] });
comboTerms.set('tini', { strings: ['ti/ni'] });
comboTerms.set('fini', { strings: ['fi/ni'] });
comboTerms.set('siti', { strings: ['si/ti'] });
comboTerms.set('sifi', { strings: ['si/fi'] });
comboTerms.set('niti', { strings: ['ni/ti'] });
comboTerms.set('nifi', { strings: ['ni/fi'] });

comboTerms.set('ti/si', { strings: ['ti/si'] });
comboTerms.set('fi/si', { strings: ['fi/si'] });
comboTerms.set('ti/ni', { strings: ['ti/ni'] });
comboTerms.set('fi/ni', { strings: ['fi/ni'] });
comboTerms.set('si/ti', { strings: ['si/ti'] });
comboTerms.set('si/fi', { strings: ['si/fi'] });
comboTerms.set('ni/ti', { strings: ['ni/ti'] });
comboTerms.set('ni/fi', { strings: ['ni/fi'] });

comboTerms.set('sh1', { strings: ['s1'] });
comboTerms.set('[1]', { strings: ['s1'] });
comboTerms.set('sh2', { strings: ['s2'] });
comboTerms.set('[2]', { strings: ['s2'] });
comboTerms.set('sh3', { strings: ['s3'] });
comboTerms.set('[3]', { strings: ['s3'] });
comboTerms.set('sh4', { strings: ['s4'] });
comboTerms.set('[4]', { strings: ['s4'] });

const enneaTerms = new Map();
enneaTerms.set('sosp', { strings: ['so/sp'] });
enneaTerms.set('sosx', { strings: ['so/sx'] });
enneaTerms.set('spsx', { strings: ['sp/sx'] });
enneaTerms.set('spso', { strings: ['sp/so'] });
enneaTerms.set('sxso', { strings: ['sx/so'] });
enneaTerms.set('sxsp', { strings: ['sx/sp'] });
enneaTerms.set('so/sp', { strings: ['so/sp'] });
enneaTerms.set('so/sx', { strings: ['so/sx'] });
enneaTerms.set('sp/sx', { strings: ['sp/sx'] });
enneaTerms.set('sp/so', { strings: ['sp/so'] });
enneaTerms.set('sx/so', { strings: ['sx/so'] });
enneaTerms.set('sx/sp', { strings: ['sx/sp'] });
enneaTerms.set('gut', { strings: ['9', '1', '8'] });
enneaTerms.set('body', { strings: ['9', '1', '8'] });
enneaTerms.set('heart', { strings: ['2', '3', '4'] });
enneaTerms.set('head', { strings: ['5', '6', '7'] });
enneaTerms.set('attachment', { strings: ['3', '6', '9'] });
enneaTerms.set('frustration', { strings: ['1', '4', '7'] });
enneaTerms.set('rejection', { strings: ['2', '5', '8'] });
enneaTerms.set('reactive', { strings: ['4', '6', '8'] });
enneaTerms.set('positive', { strings: ['2', '7', '9'] });
enneaTerms.set('competency', { strings: ['1', '3', '5'] });
enneaTerms.set('assertive', { strings: ['3', '7', '8'] });
enneaTerms.set('compliant', { strings: ['1', '2', '6'] });
enneaTerms.set('superego', { strings: ['1', '2', '6'] });
enneaTerms.set('withdrawn', { strings: ['4', '5', '9'] });


export class ApTypeModel {
  name: string;
  sexta: string;
}

const apTypes: ApTypeModel[] = [
  // ENA
  { 
    name: 'FVLE',
    sexta: 'ENA'
  },
  { 
    name: 'FLVE',
    sexta: 'ENA'
  },
  { 
    name: 'EVLF',
    sexta: 'ENA'
  },
  { 
    name: 'ELVF',
    sexta: 'ENA'
  },

  { 
    name: 'LVFE',
    sexta: 'DIO'
  },
  { 
    name: 'LFVE',
    sexta: 'DIO'
  },
  { 
    name: 'EVFL',
    sexta: 'DIO'
  },
  { 
    name: 'EFVL',
    sexta: 'DIO'
  },

  // TRIA
  { 
    name: 'VLFE',
    sexta: 'TRIA'
  },
  { 
    name: 'VFLE',
    sexta: 'TRIA'
  },
  { 
    name: 'ELFV',
    sexta: 'TRIA'
  },
  { 
    name: 'EFLV',
    sexta: 'TRIA'
  },

  // TESSERA
  { 
    name: 'VFEL',
    sexta: 'TESSERA'
  },
  { 
    name: 'VEFL',
    sexta: 'TESSERA'
  },
  { 
    name: 'LFEV',
    sexta: 'TESSERA'
  },
  { 
    name: 'LEFV',
    sexta: 'TESSERA'
  },

  // PENTE
  { 
    name: 'VLEF',
    sexta: 'PENTE'
  },
  { 
    name: 'VELF',
    sexta: 'PENTE'
  },
  { 
    name: 'FLEV',
    sexta: 'PENTE'
  },
  { 
    name: 'FELV',
    sexta: 'PENTE'
  },

  // EXI
  { 
    name: 'LVEF',
    sexta: 'EXI'
  },
  { 
    name: 'LEVF',
    sexta: 'EXI'
  },
  { 
    name: 'FVEL',
    sexta: 'EXI'
  },
  { 
    name: 'FEVL',
    sexta: 'EXI'
  },

];

const apSextaMap = new Map();
apSextaMap.set('ENA', {
  types: ['FVLE', 'FLVE', 'EVLF', 'ELVF'],
  color: 'ap-orange',
  results: ['F', 'E'],
  process: ['V', 'L'],
  evolution: ['Experiencing chaos. Seeking the unknown and trying to understand what is happening through emotions, raw sensations, and comfort (or discomfort).'],
  role: ['Beginning lifecycles. Starting anew. Uncovering secrets, taboo, the hidden and bringing them to light through playful banter and discussion. Prefer comfort in the immediate environment, discomfort in the outside environment. Separating work and pleasure. Hands-on discovery of the new and interesting.'],
  resulting: ['excitement, pleasure, enjoyment, and entertainment'],
  resulting2: ['F + E + Results = Desire to achieve emotional results in the physical realm.'],
  processing: ['action plans, schemes, expert opinions, and agendas'],
  processing2: ['V + L + Process = Willingness to dive into the complex processing of plans and goals.'],
  // culture: ['Enas are often found on the outskirts of any culture either through isolation, escaping or becoming anti-authoritarian. These types usually dedicate their lives to exploring, constantly reinventing themselves, or anxiously awaiting the next big high they can attain. There are no limitations that these types will accept for themselves as all things are potential shifts towards a more interesting present moment. This sexta is integral to humanity because they are the first groups of people to actively hoist themselves into new ideas, pleasures, adventures, experiments, and explorations.'],
  culture: ['Enas are often found on the outskirts of any culture either through isolation, escaping or becoming anti-authoritarian. These types usually dedicate their lives to exploring, constantly reinventing themselves, or anxiously awaiting the next big high they can attain. There are no limitations that these types will accept for themselves as all things are potential shifts towards a more interesting present moment. This sexta is integral to humanity because they are the first groups of people to actively hoist themselves into new ideas, pleasures, adventures, experiments, and explorations.'],
  link: 'https://www.attitudinalpsyche.com/personality-profiles/ena/'
});
apSextaMap.set('DIO', {
  types: ['LVFE', 'LFVE', 'EVFL', 'EFVL'],
  color: 'ap-blue',
  results: ['E', 'L'],
  process: ['F', 'V'],
  evolution: ['Organizing chaos. Engaging in endeavors that fulfill needs by promoting organization and clear-headedness.'],
  role: ['Interacting with the environment. Organizing information into systems and routines. Discovering the beauty of what is here in the moment through strong, vibrant emotion. Viewing life as a series of lessons that can be pulled from a bookshelf as needed. Managing chaos by systematizing information and enforcing efficient task-work.'],
  resulting: ['education, artistry, vocalization, communication and ideology'],
  processing: ['configurations, organization of the environment, composition, commands, and survival skills'],
  culture: ['Dios are usually found in the most technically active parts of any culture. This sexta is extremely hands on and needs to see the raw physical quality and potential of all things. For this reason, Dios are tinkerers. They love to try things out to see if there is any educational or artistic value that can be attained from it. Chaos is something that these types seek out, as it must be fixed or organized into an opportunity. This sexta is integral to humanity because they decide what becomes acceptable to integrate into society: be it for entertainment, education, or practical solutions.'],
  link: 'https://www.attitudinalpsyche.com/personality-profiles/dio/'
});
apSextaMap.set('TRIA', {
  types: ['VLFE', 'VFLE', 'ELFV', 'EFLV'],
  color: 'ap-red',
  results: ['V', 'E'],
  process: ['F', 'L'],
  evolution: [''],
  role: [''],
  resulting: ['inspiration, motivation, teamwork, and diplomacy'],
  processing: ['precise details, logistics, coordination, and analytical accuracy'],
  culture: [''],
  link: 'https://www.attitudinalpsyche.com/personality-profiles/tria/'
});
apSextaMap.set('TESSERA', {
  types: ['VFEL', 'VEFL', 'LFEV', 'LEFV'],
  color: 'ap-pink',
  results: ['V', 'L'],
  process: ['F', 'E'],
  evolution: [''],
  role: [''],
  resulting: ['action plans, schemes, expert opinions, and agendas'],
  processing: ['excitement, pleasure, enjoyment, and entertainment'],
  culture: [''],
  link: 'https://www.attitudinalpsyche.com/personality-profiles/tessera/'
});
apSextaMap.set('PENTE', {
  types: ['VLEF', 'VELF', 'FLEV', 'FELV'],
  color: 'ap-yellow',
  results: ['F', 'V'],
  process: ['E', 'L'],
  evolution: [''],
  role: [''],
  resulting: ['configurations, organization of the environment, composition, commands, and survival skills'],
  processing: ['education, artistry, vocalization, communication and ideology'],
  culture: [''],
  link: 'https://www.attitudinalpsyche.com/personality-profiles/pente/'
});
apSextaMap.set('EXI', {
  types: ['LVEF', 'LEVF', 'FVEL', 'FEVL'],
  color: 'ap-green',
  results: ['F', 'L'],
  process: ['V', 'E'],
  evolution: ['Solving chaos. Resolving the issues that plague our personal and professional lives through wholeness, happiness, and pleasing sensation.'],
  role: ['Ending cycles. Bringing joy to one’s life. Learning how to harness emotions and willpower into happy solitude. Finding who you are and why that matters. Helping and serving the self as best as possible, while documenting the journey. Becoming one with all we’ve built.'],
  resulting: ['precise details, logistics, coordination, and analytical accuracy'],
  resulting2: ['F + L + Results = Desire to achieve logical results in the physical realm.'],
  processing: ['inspiration, motivation, teamwork, and diplomacy'],
  processing2: ['V + E + Process = Willingness to dive into the complexities of '],
  culture: ['Exis can be found in the thriving, flourishing, and wholesome parts of any culture. These types desire to feel a sense of internal completion no matter what they decide to do in life. For this reason, Exis need easy living where the only struggles are those that you have chosen for yourself. Everything must have a reason or else it is extraneous information that could potentially cause needless discord. This sexta is integral to humanity because they show us the roadmap to living a fulfilled life without worries, pointless struggles, or caving into the unfair expectations of others.'],
  link: 'https://www.attitudinalpsyche.com/personality-profiles/exi/'
});

const apTypeNames = [];
apTypes.forEach(apType => {
  apTypeNames.push(apType.name);
});

const apTerms = new Map();
// apTerms.set('1v', { strings: ['vlef', 'vfle'] });

const apMatchTerms = new Map();
apMatchTerms.set('1v', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(0).toLowerCase() === 'v';
  },
});
apMatchTerms.set('2v', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(1).toLowerCase() === 'v';
  },
});
apMatchTerms.set('3v', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(2).toLowerCase() === 'v';
  },
});
apMatchTerms.set('4v', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(3).toLowerCase() === 'v';
  },
});

apMatchTerms.set('1e', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(0).toLowerCase() === 'e';
  },
});
apMatchTerms.set('2e', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(1).toLowerCase() === 'e';
  },
});
apMatchTerms.set('3e', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(2).toLowerCase() === 'e';
  },
});
apMatchTerms.set('4e', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(3).toLowerCase() === 'e';
  },
});

apMatchTerms.set('1l', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(0).toLowerCase() === 'l';
  },
});
apMatchTerms.set('2l', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(1).toLowerCase() === 'l';
  },
});
apMatchTerms.set('3l', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(2).toLowerCase() === 'l';
  },
});
apMatchTerms.set('4l', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(3).toLowerCase() === 'l';
  },
});

apMatchTerms.set('1f', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(0).toLowerCase() === 'f';
  },
});
apMatchTerms.set('2f', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(1).toLowerCase() === 'f';
  },
});
apMatchTerms.set('3f', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(2).toLowerCase() === 'f';
  },
});
apMatchTerms.set('4f', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.charAt(3).toLowerCase() === 'f';
  },
});

// process oriented
apMatchTerms.set('fpo', {
  match: (person: TypedPerson) => {
    return isInCenterBlock(person.apType, 'f');
  },
});
apMatchTerms.set('vpo', {
  match: (person: TypedPerson) => {
    return isInCenterBlock(person.apType, 'v');
  },
});
apMatchTerms.set('lpo', {
  match: (person: TypedPerson) => {
    return isInCenterBlock(person.apType, 'l');
  },
});
apMatchTerms.set('epo', {
  match: (person: TypedPerson) => {
    return isInCenterBlock(person.apType, 'e');
  },
});

// results oriented
apMatchTerms.set('fro', {
  match: (person: TypedPerson) => {
    return isNotInCenterBlock(person.apType, 'f');
  },
});
apMatchTerms.set('vro', {
  match: (person: TypedPerson) => {
    return isNotInCenterBlock(person.apType, 'v');
  },
});
apMatchTerms.set('lro', {
  match: (person: TypedPerson) => {
    return isNotInCenterBlock(person.apType, 'l');
  },
});
apMatchTerms.set('ero', {
  match: (person: TypedPerson) => {
    return isNotInCenterBlock(person.apType, 'e');
  },
});

// self-positive
apMatchTerms.set('fsp', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.substring(0, 2).toLowerCase().includes('f');
  },
});
apMatchTerms.set('vsp', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.substring(0, 2).toLowerCase().includes('v');
  },
});
apMatchTerms.set('esp', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.substring(0, 2).toLowerCase().includes('e');
  },
});
apMatchTerms.set('lsp', {
  match: (person: TypedPerson) => {
    return person.apType && person.apType.substring(0, 2).toLowerCase().includes('l');
  },
});

// others-positive
function getOthersPositive(apType) {
  return (apType.charAt(1) + apType.charAt(3)).toLowerCase();
}
apMatchTerms.set('fop', {
  match: (person: TypedPerson) => {
    return person.apType && getOthersPositive(person.apType).includes('f');
  },
});
apMatchTerms.set('vop', {
  match: (person: TypedPerson) => {
    return person.apType && getOthersPositive(person.apType).includes('v');
  },
});
apMatchTerms.set('eop', {
  match: (person: TypedPerson) => {
    return person.apType && getOthersPositive(person.apType).includes('e');
  },
});
apMatchTerms.set('lop', {
  match: (person: TypedPerson) => {
    return person.apType && getOthersPositive(person.apType).includes('l');
  },
});

// self-negative
function getSelfNegative(apType) {
  return (apType.substring(2,4)).toLowerCase();
}
apMatchTerms.set('fsn', {
  match: (person: TypedPerson) => {
    if (person.apType && person.apType.length !== 4) {
      console.log(person);
    }
    return person.apType && getSelfNegative(person.apType).includes('f');
  },
});
apMatchTerms.set('vsn', {
  match: (person: TypedPerson) => {
    return person.apType && getSelfNegative(person.apType).includes('v');
  },
});
apMatchTerms.set('esn', {
  match: (person: TypedPerson) => {
    return person.apType && getSelfNegative(person.apType).includes('e');
  },
});
apMatchTerms.set('lsn', {
  match: (person: TypedPerson) => {
    return person.apType && getSelfNegative(person.apType).includes('l');
  },
});

// others-negative
function getOthersNegative(apType) {
  return (apType.charAt(0) + apType.charAt(2)).toLowerCase();
}
apMatchTerms.set('fon', {
  match: (person: TypedPerson) => {
    return person.apType && getOthersNegative(person.apType).includes('f');
  },
});
apMatchTerms.set('von', {
  match: (person: TypedPerson) => {
    return person.apType && getOthersNegative(person.apType).includes('v');
  },
});
apMatchTerms.set('eon', {
  match: (person: TypedPerson) => {
    return person.apType && getOthersNegative(person.apType).includes('e');
  },
});
apMatchTerms.set('lon', {
  match: (person: TypedPerson) => {
    return person.apType && getOthersNegative(person.apType).includes('l');
  },
});



function getCenterBlock(apType) {
  return apType && apType.substring(1,3).toLowerCase();
}
function isCenterBlock(apType, a1, a2) {
  const block = getCenterBlock(apType);
  return block && (block.includes(a1+a2) || block.includes(a2+a1));
}
function isInCenterBlock(apType, aspect) {
  const block = getCenterBlock(apType);
  return block && block.includes(aspect);
}
function isNotInCenterBlock(apType, aspect) {
  const block = getCenterBlock(apType);
  return block && !block.includes(aspect);
}
apMatchTerms.set('ena', {
  match: (person: TypedPerson) => {
    return isCenterBlock(person.apType, 'v', 'l');
  },
});
apMatchTerms.set('dio', {
  match: (person: TypedPerson) => {
    return isCenterBlock(person.apType, 'v', 'f');
  },
});
apMatchTerms.set('tria', {
  match: (person: TypedPerson) => {
    return isCenterBlock(person.apType, 'l', 'f');
  },
});
apMatchTerms.set('tessera', {
  match: (person: TypedPerson) => {
    return isCenterBlock(person.apType, 'e', 'f');
  },
});
apMatchTerms.set('pente', {
  match: (person: TypedPerson) => {
    return isCenterBlock(person.apType, 'e', 'l');
  },
});
apMatchTerms.set('exi', {
  match: (person: TypedPerson) => {
    return isCenterBlock(person.apType, 'e', 'v');
  },
});

// Confident
apMatchTerms.set('1-1', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(0).toLowerCase() === '1';
  },
});
apMatchTerms.set('1-2', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(0).toLowerCase() === '2';
  },
});
apMatchTerms.set('1-3', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(0).toLowerCase() === '3';
  },
});
apMatchTerms.set('1-4', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(0).toLowerCase() === '4';
  },
});
apMatchTerms.set('1-0', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(0).toLowerCase() === '0';
  },
});

// Flexible
apMatchTerms.set('2-1', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(1).toLowerCase() === '1';
  },
});
apMatchTerms.set('2-2', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(1).toLowerCase() === '2';
  },
});
apMatchTerms.set('2-3', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(1).toLowerCase() === '3';
  },
});
apMatchTerms.set('2-4', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(1).toLowerCase() === '4';
  },
});
apMatchTerms.set('2-0', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(1).toLowerCase() === '0';
  },
});

// Insecure
apMatchTerms.set('3-1', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(2).toLowerCase() === '1';
  },
});
apMatchTerms.set('3-2', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(2).toLowerCase() === '2';
  },
});
apMatchTerms.set('3-3', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(2).toLowerCase() === '3';
  },
});
apMatchTerms.set('3-4', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(2).toLowerCase() === '4';
  },
});
apMatchTerms.set('3-0', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(2).toLowerCase() === '0';
  },
});

// Unbothered
apMatchTerms.set('4-1', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(3).toLowerCase() === '1';
  },
});
apMatchTerms.set('4-2', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(3).toLowerCase() === '2';
  },
});
apMatchTerms.set('4-3', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(3).toLowerCase() === '3';
  },
});
apMatchTerms.set('4-4', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(3).toLowerCase() === '4';
  },
});
apMatchTerms.set('4-0', {
  match: (person: TypedPerson) => {
    return person.apType && person.apSubtype && person.apSubtype.charAt(3).toLowerCase() === '0';
  },
});

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
comboTerms.set('glasslizard', {
  strings: [
    [
      ['pc/s(b)'],
      ['te/', 'fe/'],
    ],
    [
      ['bs/c(p)'],
      ['te/', 'fe/'],
    ],
    [
      ['sb/p(c)'],
      ['ti/', 'fi/'],
    ],
    [
      ['cp/b(s)'],
      ['ti/', 'fi/'],
    ],
    [
      ['sc/p(b)'],
      ['ni/', 'si/'],
    ],
    [
      ['bp/c(s)'],
      ['ni/', 'si/'],
    ],
    [
      ['cs/b(p)'],
      ['ne/', 'se/'],
    ],
    [
      ['pb/s(c)'],
      ['ne/', 'se/'],
    ]
  ]
});
comboTerms.set('fullglasslizard', {
  strings: [
    [
      ['pc/s(b)'],
      ['te/', 'fe/'],
    ],
    [
      ['sb/p(c)'],
      ['ti/', 'fi/'],
    ],
    [
      ['sc/p(b)'],
      ['ni/', 'si/'],
    ],
    [
      ['pb/s(c)'],
      ['ne/', 'se/'],
    ]
  ]
});
comboTerms.set('halfglasslizard', {
  strings: [
    [
      ['bs/c(p)'],
      ['te/', 'fe/'],
    ],
    [
      ['cp/b(s)'],
      ['ti/', 'fi/'],
    ],
    [
      ['bp/c(s)'],
      ['ni/', 'si/'],
    ],
    [
      ['cs/b(p)'],
      ['ne/', 'se/'],
    ],
  ]
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

const isMasculineFe = function (person: TypedPerson) {
  return (
    // M Fe Savior
    (person.deMod === 'M' &&
      person.deciderLetter === 'F' &&
      person.deciderNeed === 'De') ||
    // M Fe Demon
    (person.deMod === 'M' &&
      person.deciderLetter === 'T' &&
      person.deciderNeed === 'Di')
  );
};
const isFeminineFe = function (person: TypedPerson) {
  return (
    // F Fe Savior
    (person.deMod === 'F' &&
      person.deciderLetter === 'F' &&
      person.deciderNeed === 'De') ||
    // F Fe Demon
    (person.deMod === 'F' &&
      person.deciderLetter === 'T' &&
      person.deciderNeed === 'Di')
  );
};
const isMasculineFi = function (person: TypedPerson) {
  return (
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
const isFeminineFi = function (person: TypedPerson) {
  return (
    // M Fi Savior
    (person.deMod === 'M' &&
      person.deciderLetter === 'F' &&
      person.deciderNeed === 'Di') ||
    // M Fi Demon
    (person.deMod === 'M' &&
      person.deciderLetter === 'T' &&
      person.deciderNeed === 'De')
  );
};
const isMasculineFeeling = function (person: TypedPerson) {
  return isMasculineFe(person) || isMasculineFi(person);
};
const isMasculineThinking = function (person: TypedPerson) {
  if (person.deMod && person.deciderLetter && person.deciderNeed) {
    return !isMasculineFeeling(person);
  } else {
    return false;
  }
};
const isMasculineSi = function (person: TypedPerson) {
  // M Si Savior
  return (
    (person.sensoryMod === 'M' &&
      person.observerNeed === 'Oi' &&
      person.observerLetter === 'S') ||
    // M Si Demon
    (person.sensoryMod === 'M' &&
      person.observerNeed === 'Oe' &&
      person.observerLetter === 'N')
  );
};
const isFeminineSi = function (person: TypedPerson) {
  // F Si Savior
  return (
    (person.sensoryMod === 'F' &&
      person.observerNeed === 'Oi' &&
      person.observerLetter === 'S') ||
    // F Si Demon
    (person.sensoryMod === 'F' &&
      person.observerNeed === 'Oe' &&
      person.observerLetter === 'N')
  );
};
const isMasculineNi = function (person: TypedPerson) {
  return (
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
const isFeminineNi = function (person: TypedPerson) {
  return (
    // F Ni Savior
    (person.sensoryMod === 'M' &&
      person.observerNeed === 'Oi' &&
      person.observerLetter === 'N') ||
    // F Ni Demon
    (person.sensoryMod === 'M' &&
      person.observerNeed === 'Oe' &&
      person.observerLetter === 'S')
  );
};
const isMasculineOi = function (person: TypedPerson) {
  return isMasculineSi(person) || isMasculineNi(person);
};
const isFeminineOi = function (person: TypedPerson) {
  if (person.sensoryMod && person.observerLetter && person.observerNeed) {
    return !isMasculineOi(person);
  } else {
    return false;
  }
};
const isMasculineOe = function (person: TypedPerson) {
  return isFeminineOi(person);
};
const isFeminineOe = function (person: TypedPerson) {
  return isMasculineOi(person);
};
const isMasculineDi = function (person: TypedPerson) {
  return person.deMod && person.deMod === 'F';
};
const isMasculineDe = function (person: TypedPerson) {
  return person.deMod && person.deMod === 'M';
};

const personTerms = new Map();
personTerms.set('mfi', {
  match: (person: TypedPerson) => {
    return isMasculineFi(person);
  },
});
personTerms.set('fte', {
  match: (person: TypedPerson) => {
    return isMasculineFi(person);
  },
});
personTerms.set('ffi', {
  match: (person: TypedPerson) => {
    return isFeminineFi(person);
  },
});
personTerms.set('mte', {
  match: (person: TypedPerson) => {
    return isFeminineFi(person);
  },
});
personTerms.set('mfe', {
  match: (person: TypedPerson) => {
    return isMasculineFe(person);
  },
});
personTerms.set('fti', {
  match: (person: TypedPerson) => {
    return isMasculineFe(person);
  },
});
personTerms.set('ffe', {
  match: (person: TypedPerson) => {
    return isFeminineFe(person);
  },
});
personTerms.set('mti', {
  match: (person: TypedPerson) => {
    return isFeminineFe(person);
  },
});
personTerms.set('mdi', {
  match: (person: TypedPerson) => {
    return isMasculineDi(person);
  },
});
personTerms.set('fdi', {
  match: (person: TypedPerson) => {
    return isMasculineDe(person);
  },
});
personTerms.set('mfeeling', {
  match: (person: TypedPerson) => {
    return isMasculineFeeling(person);
  },
});
personTerms.set('ffeeling', {
  match: (person: TypedPerson) => {
    return isMasculineThinking(person);
  },
});
personTerms.set('mthinking', {
  match: (person: TypedPerson) => {
    return isMasculineThinking(person);
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
    return isFeminineOi(person);
  },
});
personTerms.set('foi', {
  match: (person: TypedPerson) => {
    return isMasculineOe(person);
  },
});
personTerms.set('foe', {
  match: (person: TypedPerson) => {
    return isFeminineOe(person);
  },
});
personTerms.set('msi', {
  match: (person: TypedPerson) => {
    return isMasculineSi(person);
  },
});
personTerms.set('fne', {
  match: (person: TypedPerson) => {
    return isMasculineSi(person);
  },
});
personTerms.set('fsi', {
  match: (person: TypedPerson) => {
    return isFeminineSi(person);
  },
});
personTerms.set('mne', {
  match: (person: TypedPerson) => {
    return isFeminineSi(person);
  },
});
personTerms.set('mni', {
  match: (person: TypedPerson) => {
    return isMasculineNi(person);
  },
});
personTerms.set('fse', {
  match: (person: TypedPerson) => {
    return isMasculineNi(person);
  },
});
personTerms.set('fni', {
  match: (person: TypedPerson) => {
    return isFeminineNi(person);
  },
});
personTerms.set('mse', {
  match: (person: TypedPerson) => {
    return isFeminineNi(person);
  },
});
personTerms.set('mmconsume', {
  match: (person: TypedPerson) => {
    return isMasculineDi(person) && isMasculineOe(person);
  },
});
personTerms.set('fmconsume', {
  match: (person: TypedPerson) => {
    return isMasculineDi(person) && isFeminineOe(person);
  },
});
personTerms.set('mfconsume', {
  match: (person: TypedPerson) => {
    return person.deMod && person.deMod === 'M' && isMasculineOe(person);
  },
});
personTerms.set('ffconsume', {
  match: (person: TypedPerson) => {
    return person.deMod && person.deMod === 'M' && isFeminineOe(person);
  },
});
personTerms.set('mmplay', {
  match: (person: TypedPerson) => {
    return isMasculineDe(person) && isMasculineOe(person);
  },
});
personTerms.set('mfplay', {
  match: (person: TypedPerson) => {
    return isMasculineDe(person) && isFeminineOe(person);
  },
});
personTerms.set('fmplay', {
  match: (person: TypedPerson) => {
    return person.deMod === 'F' && isMasculineOe(person);
  },
});
personTerms.set('ffplay', {
  match: (person: TypedPerson) => {
    return person.deMod === 'F' && isFeminineOe(person);
  },
});
personTerms.set('mmblast', {
  match: (person: TypedPerson) => {
    return isMasculineDe(person) && isMasculineOi(person);
  },
});
personTerms.set('mfblast', {
  match: (person: TypedPerson) => {
    return person.deMod === 'F' && isMasculineOi(person);
  },
});
personTerms.set('fmblast', {
  match: (person: TypedPerson) => {
    return person.deMod === 'M' && isFeminineOi(person);
  },
});
personTerms.set('mmsleep', {
  match: (person: TypedPerson) => {
    return person.deMod === 'F' && isMasculineOi(person);
  },
});
personTerms.set('mfsleep', {
  match: (person: TypedPerson) => {
    return person.deMod === 'M' && isMasculineOi(person);
  },
});
personTerms.set('fmsleep', {
  match: (person: TypedPerson) => {
    return person.deMod === 'F' && isMasculineOe(person);
  },
});
personTerms.set('ffsleep', {
  match: (person: TypedPerson) => {
    return person.deMod === 'M' && isMasculineOe(person);
  },
});
personTerms.set('ffblast', {
  match: (person: TypedPerson) => {
    return person.deMod === 'F' && isFeminineOi(person);
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
personTerms.set('oo', {
  match: (person: TypedPerson) => {
    return person.coreNeed === 'Decider';
  },
});
personTerms.set('observer', {
  match: (person: TypedPerson) => {
    return person.coreNeed === 'Observer';
  },
});
personTerms.set('dd', {
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
personTerms.set('bfirst', {
  match: (person: TypedPerson) => {
    return person.animals && person.animals.startsWith('B');
  },
});
personTerms.set('cfirst', {
  match: (person: TypedPerson) => {
    return person.animals && person.animals.startsWith('C');
  },
});
personTerms.set('pfirst', {
  match: (person: TypedPerson) => {
    return person.animals && person.animals.startsWith('P');
  },
});
personTerms.set('sfirst', {
  match: (person: TypedPerson) => {
    return person.animals && person.animals.startsWith('S');
  },
});
personTerms.set('s1', {
  match: (person: TypedPerson) => {
    return person.socialType && person.socialType === '1';
  },
});
personTerms.set('socialtype1', {
  match: (person: TypedPerson) => {
    return person.socialType && person.socialType === '1';
  },
});
personTerms.set('s2', {
  match: (person: TypedPerson) => {
    return person.socialType && person.socialType === '2';
  },
});
personTerms.set('socialtype2', {
  match: (person: TypedPerson) => {
    return person.socialType && person.socialType === '2';
  },
});
personTerms.set('s3', {
  match: (person: TypedPerson) => {
    return person.socialType && person.socialType === '3';
  },
});
personTerms.set('socialtype3', {
  match: (person: TypedPerson) => {
    return person.socialType && person.socialType === '3';
  },
});
personTerms.set('s4', {
  match: (person: TypedPerson) => {
    return person.socialType && person.socialType === '4';
  },
});
personTerms.set('socialtype4', {
  match: (person: TypedPerson) => {
    return person.socialType && person.socialType === '4';
  },
});
personTerms.set('flex', {
  match: (person: TypedPerson) => {
    return person.socialType && (person.socialType === '1' || person.socialType === '3');
  },
});
personTerms.set('friends', {
  match: (person: TypedPerson) => {
    return person.socialType && (person.socialType === '2' || person.socialType === '4');
  },
});
personTerms.set('specialize', {
  match: (person: TypedPerson) => {
    return person.socialType && (person.socialType === '3' || person.socialType === '4');
  },
});
personTerms.set('responsibility', {
  match: (person: TypedPerson) => {
    return person.socialType && (person.socialType === '1' || person.socialType === '2');
  },
});
personTerms.set('socialtype', {
  match: (person: TypedPerson) => {
    return person.socialType;
  },
});

const enneaMatchTerms = new Map();
enneaMatchTerms.set('trifix', {
  match: (person: TypedPerson) => {
    return person.trifix && person.trifix.length === 3;
  },
});
enneaMatchTerms.set('overlay', {
  match: (person: TypedPerson) => {
    return person.overlay && person.overlay.length > 1;
  },
});
const isHeartGutHead = function(trifix) {
  return trifix && trifix.length === 3 
      && heart.includes(trifix.substring(0,1))
      && gut.includes(trifix.substring(1,2));
}
enneaMatchTerms.set('heartguthead', {
  match: (person: TypedPerson) => {
    return isHeartGutHead(person.trifix);
  },
});
enneaMatchTerms.set('heartbodyhead', {
  match: (person: TypedPerson) => {
    return isHeartGutHead(person.trifix);
  },
});
enneaMatchTerms.set('heartgut', {
  match: (person: TypedPerson) => {
    return isHeartGutHead(person.trifix);
  },
});
enneaMatchTerms.set('heartbody', {
  match: (person: TypedPerson) => {
    return isHeartGutHead(person.trifix);
  },
});
const isHeartHeadGut = function(trifix) {
  return trifix && trifix.length === 3 
      && heart.includes(trifix.substring(0,1))
      && head.includes(trifix.substring(1,2));
}
enneaMatchTerms.set('hearthead', {
  match: (person: TypedPerson) => {
    return isHeartHeadGut(person.trifix);
  },
});
enneaMatchTerms.set('heartheadgut', {
  match: (person: TypedPerson) => {
    return isHeartHeadGut(person.trifix);
  },
});
enneaMatchTerms.set('heartheadbody', {
  match: (person: TypedPerson) => {
    return isHeartHeadGut(person.trifix);
  },
});
const isHeadHeartGut = function(trifix) {
  return trifix && trifix.length === 3 
      && head.includes(trifix.substring(0,1))
      && heart.includes(trifix.substring(1,2));
}
enneaMatchTerms.set('headheart', {
  match: (person: TypedPerson) => {
    return isHeadHeartGut(person.trifix);
  },
});
enneaMatchTerms.set('headheartgut', {
  match: (person: TypedPerson) => {
    return isHeadHeartGut(person.trifix);
  },
});
enneaMatchTerms.set('headheartbody', {
  match: (person: TypedPerson) => {
    return isHeadHeartGut(person.trifix);
  },
});
const isHeadGutHeart = function(trifix) {
  return trifix && trifix.length === 3 
      && head.includes(trifix.substring(0,1))
      && gut.includes(trifix.substring(1,2));
}
enneaMatchTerms.set('headgutheart', {
  match: (person: TypedPerson) => {
    return isHeadGutHeart(person.trifix);
  },
});
enneaMatchTerms.set('headgut', {
  match: (person: TypedPerson) => {
    return isHeadGutHeart(person.trifix);
  },
});
enneaMatchTerms.set('headbodyheart', {
  match: (person: TypedPerson) => {
    return isHeadGutHeart(person.trifix);
  },
});
enneaMatchTerms.set('headbody', {
  match: (person: TypedPerson) => {
    return isHeadGutHeart(person.trifix);
  },
});
const isGutHeadHeart = function(trifix) {
  return trifix && trifix.length === 3 
      && gut.includes(trifix.substring(0,1))
      && head.includes(trifix.substring(1,2));
}
enneaMatchTerms.set('bodyheadheart', {
  match: (person: TypedPerson) => {
    return isGutHeadHeart(person.trifix);
  },
});
enneaMatchTerms.set('gutheadheart', {
  match: (person: TypedPerson) => {
    return isGutHeadHeart(person.trifix);
  },
});
enneaMatchTerms.set('bodyhead', {
  match: (person: TypedPerson) => {
    return isGutHeadHeart(person.trifix);
  },
});
enneaMatchTerms.set('guthead', {
  match: (person: TypedPerson) => {
    return isGutHeadHeart(person.trifix);
  },
});
const isGutHeartHead = function(trifix) {
  return trifix && trifix.length === 3 
      && gut.includes(trifix.substring(0,1))
      && heart.includes(trifix.substring(1,2));
}
enneaMatchTerms.set('bodyhearthead', {
  match: (person: TypedPerson) => {
    return isGutHeartHead(person.trifix);
  },
});
enneaMatchTerms.set('guthearthead', {
  match: (person: TypedPerson) => {
    return isGutHeartHead(person.trifix);
  },
});
enneaMatchTerms.set('bodyheart', {
  match: (person: TypedPerson) => {
    return isGutHeartHead(person.trifix);
  },
});
enneaMatchTerms.set('gutheart', {
  match: (person: TypedPerson) => {
    return isGutHeartHead(person.trifix);
  },
});
const isHeartLast = function(trifix) {
  return trifix && trifix.length === 3 
      && heart.includes(trifix.substring(2,3));
}
enneaMatchTerms.set('heartlast', {
  match: (person: TypedPerson) => {
    return isHeartLast(person.trifix);
  },
});
const isHeadLast = function(trifix) {
  return trifix && trifix.length === 3 
      && head.includes(trifix.substring(2,3));
}
enneaMatchTerms.set('headlast', {
  match: (person: TypedPerson) => {
    return isHeadLast(person.trifix);
  },
});
const isGutLast = function(trifix) {
  return trifix && trifix.length === 3 
      && gut.includes(trifix.substring(2,3));
}
enneaMatchTerms.set('gutlast', {
  match: (person: TypedPerson) => {
    return isGutLast(person.trifix);
  },
});
enneaMatchTerms.set('bodylast', {
  match: (person: TypedPerson) => {
    return isGutLast(person.trifix);
  },
});
const isHeadSecond = function(trifix) {
  return trifix && trifix.length === 3 
      && head.includes(trifix.substring(1,2));
}
enneaMatchTerms.set('headsecond', {
  match: (person: TypedPerson) => {
    return isHeadSecond(person.trifix);
  },
});
const isHeartSecond = function(trifix) {
  return trifix && trifix.length === 3 
      && heart.includes(trifix.substring(1,2));
}
enneaMatchTerms.set('heartsecond', {
  match: (person: TypedPerson) => {
    return isHeartSecond(person.trifix);
  },
});
const isGutSecond = function(trifix) {
  return trifix && trifix.length === 3 
      && gut.includes(trifix.substring(1,2));
}
enneaMatchTerms.set('gutsecond', {
  match: (person: TypedPerson) => {
    return isGutSecond(person.trifix);
  },
});
enneaMatchTerms.set('bodysecond', {
  match: (person: TypedPerson) => {
    return isGutSecond(person.trifix);
  },
});

const sexTerms = new Map();
sexTerms.set('male', {
  match: (person: TypedPerson) => {
    return (
      person.sex &&
      ((!person.trans && person.sex === 'Male') ||
        (person.trans && person.sex === 'Female'))
    );
  },
});
sexTerms.set('female', {
  match: (person: TypedPerson) => {
    return (
      person.sex &&
      ((!person.trans && person.sex === 'Female') ||
        (person.trans && person.sex === 'Male'))
    );
  },
});

/**
 * Special terms which will be checked for in the list of tags
 */
const tagTerms = new Map();
tagTerms.set('class', { sortBy: 'ops' });
tagTerms.set('academy', { sortBy: 'ennea' });
tagTerms.set('daa', { sortBy: 'ennea' });
tagTerms.set('spec', { sortBy: '' });
tagTerms.set('speculation', { sortBy: '' });
tagTerms.set('incomplete', { sortBy: '' });
tagTerms.set('ennea', { sortBy: 'ennea' });
tagTerms.set('enneagram', { sortBy: 'ennea' });
tagTerms.set('subjective', { sortBy: 'ops' });
tagTerms.set('faytabase', { sortBy: 'ennea' });
tagTerms.set('community', { sortBy: '' });
tagTerms.set('wss', { sortBy: 'wss' });
tagTerms.set('friends', { sortBy: '' });
tagTerms.set('analysis', { sortBy: 'wss' });
tagTerms.set('ops', { sortBy: 'ops' });
tagTerms.set('bhe', { sortBy: 'ennea' });
tagTerms.set('ap', { sortBy: 'ap' });
tagTerms.set('soft', { sortBy: 'ap' });

const socionicsTypes = [
  'ile',
  'lii',
  'ese',
  'sei',

  'sle',
  'lsi',
  'eie',
  'iei',

  'see',
  'esi',
  'lie',
  'ili',

  'iee',
  'eii',
  'lse',
  'sli',
];

const typeAhead = [];
typeAhead.push(socionicsTypes);
typeAhead.push(tagTerms);

const socionicsTerms = new Map();
socionicsTerms.set('socionics', {
  match: (person: TypedPerson) => {
    return person.wssType;
  },
});

/**
 * Rules shown on the Search Home Page
 */
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
    label: 'Decider Axis',
    examples: ['Fe|Ti', 'Te|Fi'],
  },
  {
    label: 'Observer Axis',
    examples: ['Ne|Si', 'Se|Ni'],
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
    label: 'Oi Function Modality',
    examples: ['MNi', 'FNi', 'MSi', 'FSi'],
  },
  {
    label: 'Oe Function Modality',
    examples: ['MNe', 'FNe', 'MSe', 'FSe'],
  },
  {
    label: 'Di Function Modality',
    examples: ['MFi', 'FFi', 'MTi', 'FTi'],
  },
  {
    label: 'De Function Modality',
    examples: ['MFe', 'FFe', 'MTe', 'FTe'],
  },
  {
    label: 'Play Modality',
    examples: ['mmPlay', 'ffPlay'],
  },
  {
    label: 'Sleep Modality',
    examples: ['mmSleep', 'ffSleep'],
  },
  {
    label: 'Consume Modality',
    examples: ['mmConsume', 'ffConsume'],
  },
  {
    label: 'Blast Modality',
    examples: ['mmBlast', 'ffBlast'],
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
    label: 'Glass Lizards',
    examples: ['glasslizard'],
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
  {
    label: 'Wing Swap',
    examples: ['8w9|9w8'],
  },
];

const wssRules = [
  {
    label: 'WSS Tagged',
    examples: ['wss'],
  },
  {
    label: 'WSS Analysis',
    examples: ['analysis eie', 'analysis lii'],
  },
  {
    label: 'Alpha',
    examples: ['ile', 'lii', 'ese', 'sei'],
  },
  {
    label: 'Beta',
    examples: ['sle', 'lsi', 'eie', 'iei'],
  },
  {
    label: 'Gamma',
    examples: ['see', 'esi', 'lie', 'ili'],
  },
  {
    label: 'Delta',
    examples: ['iee', 'eii', 'lse', 'sli'],
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

const apRules = [
  {
    label: 'AP Tagged',
    examples: ['AP'],
  },
  {
    label: 'AP Tagged',
    examples: ['AP'],
  },
  //Positions
  {
    label: 'Volition Position',
    examples: ['1V', '2V', '3V', '4V'],
  },
  {
    label: 'Emotion Position',
    examples: ['1E', '2E', '3E', '4E'],
  },
  {
    label: 'Logic Position',
    examples: ['1L', '2L', '3L', '4L'],
  },
  {
    label: 'Physics Position',
    examples: ['1F', '2F', '3F', '4F'],
  },
  // Stances
  {
    label: 'Self-Positive',
    examples: ['vsp', 'fsp', 'esp', 'lsp'],
  },
  {
    label: 'Self-Negative',
    examples: ['vsn', 'fsn', 'esn', 'lsn'],
  },
  {
    label: 'Others-Positive',
    examples: ['vop', 'fop', 'eop', 'lop'],
  },
  {
    label: 'Others-Negative',
    examples: ['von', 'fon', 'eon', 'lon'],
  },
  {
    label: 'Results-Oriented',
    examples: ['vro', 'fro', 'ero', 'lro'],
  },
  {
    label: 'Process-Oriented',
    examples: ['vpo', 'fpo', 'epo', 'lpo'],
  },
  {
    label: '1-X Subtypes',
    examples: ['1-1', '1-2', '1-3', '1-4', '1-0'],
  },
  {
    label: '2-X Subtypes',
    examples: ['2-1', '2-2', '2-3', '2-4', '2-0'],
  },
  {
    label: '3-X Subtypes',
    examples: ['3-1', '3-2', '3-3', '3-4', '3-0'],
  },
  {
    label: '4-X Subtypes',
    examples: ['4-1', '4-2', '4-3', '4-4', '4-0'],
  },
  {
    label: 'Sextas',
    examples: ['ena', 'dio', 'tria'],
  },
  {
    label: 'Sextas',
    examples: ['tessera', 'pente', 'exi'],
  },
  {
    label: 'Compare with OPS',
    examples: ['3E Ti', '3V Ne'],
  },
  {
    label: 'Compare with Ennea',
    examples: ['4V 9', '2F 8'],
  },
];

/**
 * Takes an input trifix and checks to see if it matches a second trifix
 * if the trifix is considered in any order.
 */
const trifixMatcher = function(trifix: string, matchTrifix: string) {
  let result = false;
  if (trifix.length === 3 && /^\d+$/.test(trifix)) {
    let sArr = trifix.split('');
    let found = false;
    for (let i = 0; i !== sArr.length; i++) {
      for (let j = 0; j !== sArr.length; j++) {
        for (let k = 0; k !== sArr.length; k++) {
          if (
            !found &&
            sArr[i] !== sArr[j] &&
            sArr[i] !== sArr[k] &&
            sArr[j] !== sArr[k]
          ) {
            let abc = sArr[i] + sArr[j] + sArr[k];
            found = abc === matchTrifix;
          }
        }
      }
    }
    result = found;
  }
  return result;
}

const sortEType = function(a: TypedPerson, b: TypedPerson) {
  if (a.coreEType && !b.coreEType) {
    return -1;
  } else if (!a.coreEType && b.coreEType) {
    return 1;
  } else if (a.coreEType && b.coreEType) {
    if (parseInt(a.coreEType) > parseInt(b.coreEType)) {
      return 1;
    }
    if (parseInt(a.coreEType) < parseInt(b.coreEType)) {
      return -1;
    }
    if (a.wing && b.wing) {
      if (parseInt(a.wing) > parseInt(b.wing)) {
        return 1;
      }
      if (parseInt(a.wing) < parseInt(b.wing)) {
        return -1;
      }
      if (a.instinct && b.instinct) {
        if (a.instinct < b.instinct) {
          return 1;
        }
        if (a.instinct > b.instinct) {
          return -1;
        }
      }
    }
  }
  return 0;
}

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
  trifixTable: trifixTable,
  trifixMap: trifixMap,
  comboTerms: comboTerms,
  enneaTerms: enneaTerms,
  apTerms: apTerms,
  apMatchTerms: apMatchTerms,
  apTypes: apTypeNames,
  apSextas: apSextaMap,
  apTypeSextas: apTypes,
  tagTerms: tagTerms,
  personTerms: personTerms,
  enneaMatchTerms: enneaMatchTerms,
  socionicsTerms: socionicsTerms,
  sexTerms: sexTerms,
  predictions: predictions,
  socionicsTypes: socionicsTypes,
  typeAhead: typeAhead,
  opsRules: opsRules,
  enneaRules: enneaRules,
  wssRules: wssRules,
  apRules: apRules,
  trifixMatcher: trifixMatcher,
  sortEType: sortEType
};
