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
tagTerms.set('wss', { sortBy: '' });
tagTerms.set('ops', { sortBy: 'ops' });
tagTerms.set('bhe', { sortBy: 'ennea' });

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
    label: 'Compare with OPS',
    examples: ['LII Ti', 'ILE Ne'],
  },
  {
    label: 'Compare with Ennea',
    examples: ['SEI 9', 'SLE 8'],
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
  enneaTerms: enneaTerms,
  tagTerms: tagTerms,
  personTerms: personTerms,
  sexTerms: sexTerms,
  predictions: predictions,
  socionicsTypes: socionicsTypes,
  typeAhead: typeAhead,
  opsRules: opsRules,
  enneaRules: enneaRules,
  wssRules: wssRules,
  trifixMatcher: trifixMatcher
};
