const sleepFunctions = [
  'Fi/Ni',
  'Fi/Si',
  'Ni/Fi',
  'Ni/Ti',
  'Si/Fi',
  'Si/Ti',
  'Ti/Ni',
  'Ti/Si',
];

const sleepOrders = [
  {
    stack: 'SC/B(P)',
    functions: sleepFunctions,
  },
  {
    stack: 'SC/P(B)',
    functions: sleepFunctions,
  },
  {
    stack: 'SB/C(P)',
    functions: sleepFunctions,
  },
  {
    stack: 'SB/P(C)',
    functions: sleepFunctions,
  },
];

const consumeFunctions = [
  'Fi/Ne',
  'Fi/Se',
  'Ti/Ne',
  'Ti/Se',
  'Ne/Fi',
  'Ne/Ti',
  'Se/Fi',
  'Se/Ti',
];

const consumeOrders = [
  {
    stack: 'CS/B(P)',
    functions: consumeFunctions,
  },
  {
    stack: 'CS/P(B)',
    functions: consumeFunctions,
  },
  {
    stack: 'CP/S(B)',
    functions: consumeFunctions,
  },
  {
    stack: 'CP/B(S)',
    functions: consumeFunctions,
  },
];

const blastFunctions = [
  'Ni/Fe',
  'Ni/Te',
  'Si/Fe',
  'Si/Te',
  'Fe/Ni',
  'Fe/Si',
  'Te/Ni',
  'Te/Si',
];

const blastOrders = [
  {
    stack: 'BS/C(P)',
    functions: blastFunctions,
  },
  {
    stack: 'BS/P(C)',
    functions: blastFunctions,
  },
  {
    stack: 'BP/S(C)',
    functions: blastFunctions,
  },
  {
    stack: 'BP/C(S)',
    functions: blastFunctions,
  },
];

const playFunctions = [
  'Fe/Ne',
  'Fe/Se',
  'Ne/Fe',
  'Ne/Te',
  'Se/Fe',
  'Se/Te',
  'Te/Ne',
  'Te/Se',
];

const playOrders = [
  {
    stack: 'PC/S(B)',
    functions: playFunctions,
  },
  {
    stack: 'PC/B(S)',
    functions: playFunctions,
  },
  {
    stack: 'PB/S(C)',
    functions: playFunctions,
  },
  {
    stack: 'PB/C(S)',
    functions: playFunctions,
  },
];

const stacks = [
    {
      animal: 'Sleep',
      orders: sleepOrders,
    },
    {
      animal: 'Consume',
      orders: consumeOrders,
    },
    {
      animal: 'Blast',
      orders: blastOrders,
    },
    {
      animal: 'Play',
      orders: playOrders,
    },
];

export const OpsTypeTable = {
    animalStacks: stacks
}