export class AnimalStack {

  extroversionInt: string; //Ranging from -7 to +7
  stack: string; //Ex: BPSC
  name: string; //Ex: Owls, Dolphins
  emoji: string; //Used to map this animal to the emoji object to display
  active: boolean; //Set to true if this is the matching emoji

  constructor(stack?: string, extroversionInt?: string, name?: string, emoji?: string) {
    this.stack = stack;
    this.extroversionInt = extroversionInt;
    this.name = name;
    this.emoji = emoji;
  }
}

const sleepFirst: AnimalStack[] = [
  new AnimalStack('SCBP', '-7', 'Owls', 'owl'),
  new AnimalStack('SCPB', '-5', 'Hedgehogs', 'hedgehog'),
  new AnimalStack('SBCP', '-2', 'Rhinos', 'rhinoceros'),
  new AnimalStack('SBPC', '+1', 'Beavers', 'beaver'),
];

const consumeFirst: AnimalStack[] = [
  new AnimalStack('CSBP', '-6', 'Turtles', 'turtle'),
  new AnimalStack('CSPB', '-4', 'Pandas', 'panda_face'),
  new AnimalStack('CPSB', '-0', 'Hares', 'rabbit'),
  new AnimalStack('CPBS', '+3', 'Zebras', 'zebra_face'),
];

const blastFirst: AnimalStack[] = [
  new AnimalStack('BSCP', '-3', 'Deer', 'deer'),
  new AnimalStack('BSPC', '+0', 'Raccoons', 'raccoon'),
  new AnimalStack('BPSC', '+4', 'Otters', 'otter'),
  new AnimalStack('BPCS', '+6', 'Kangaroos', 'kangaroo'),
];

const playFirst: AnimalStack[] = [
  new AnimalStack('PCSB', '-1', 'Tigers', 'tiger'),
  new AnimalStack('PCBS', '+2', 'Foxes', 'fox_face'),
  new AnimalStack('PBSC', '+5', 'Seals', 'seal'),
  new AnimalStack('PBCS', '+7', 'Dolphins', 'dolphin'),
];

const allStacks = [];
blastFirst.forEach(stack => {
  allStacks.push(stack);
});
consumeFirst.forEach(stack => {
  allStacks.push(stack);
});
playFirst.forEach(stack => {
  allStacks.push(stack);
});
sleepFirst.forEach(stack => {
  allStacks.push(stack);
});

const findAnimal = function(findStack: string) {
  findStack = findStack.replace('/', '');
  findStack = findStack.replace('(', '');
  findStack = findStack.replace(')', '');
  for (let i = 0; i < allStacks.length; i++) {
    let stack = allStacks[i];
    if (stack.stack === findStack) {
      return stack;
    }
  }
  return null;
}

export const AnimalStackModel = {
  sleepFirst: sleepFirst,
  playFirst: playFirst,
  blastFirst: blastFirst,
  consumeFirst: consumeFirst,
  findAnimal: findAnimal
}