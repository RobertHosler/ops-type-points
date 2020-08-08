export class Animal {

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
