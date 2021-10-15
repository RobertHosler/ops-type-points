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

export const searchModel = {
    functions: functions,
    observerFunctions: observerFunctions,
    needClusters: needClusters,
    letterClusters: letterClusters,
    animalClusters: animalClusters,
    firstAnimals: firstAnimals,
    lastAnimals: lastAnimals,
    modalityClusters: modalityClusters,
    clusters: clusters
};