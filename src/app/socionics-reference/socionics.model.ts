const functions = [
  {
    name: 'Se',
    longName: 'Extroverted Sensation',
    altName: 'Force',
  },
  {
    name: 'Fe',
    longName: 'Extroverted Feeling',
    altName: 'Emotions',
  },
  {
    name: 'Ne',
    longName: 'Extroverted Intuition',
    altName: 'Ideas',
  },
  {
    name: 'Te',
    longName: 'Extroverted Logic',
    altName: 'Pragmatism',
  },
  {
    name: 'Si',
    longName: 'Introverted Sensation',
    altName: 'Senses',
  },
  {
    name: 'Fi',
    longName: 'Introverted Feeling',
    altName: 'Relations',
  },
  {
    name: 'Ni',
    longName: 'Introverted Intuition',
    altName: 'Time',
  },
  {
    name: 'Ti',
    longName: 'Introverted Logic',
    altName: 'Laws',
  },
];

const functionCharacteristics = [
  {
    index: 1,
    name: 'Leading',
    accepting: true,
    mental: true,
    strong: true,
    valued: true,
    block: 'Ego'
  },
  {
    index: 2,
    name: 'Creative',
    accepting: false,
    mental: true,
    strong: true,
    valued: true,
    block: 'Ego'
  },
  {
    index: 3,
    name: 'Mobilizing',
    accepting: false,
    mental: false,
    strong: false,
    valued: true,
    block: 'Super-Id'
  },
  {
    index: 4,
    name: 'Suggestive',
    accepting: true,
    mental: false,
    strong: false,
    valued: true,
    block: 'Super-Id'
  },
  {
    index: 5,
    name: 'Role',
    accepting: true,
    mental: true,
    strong: false,
    valued: false,
    block: 'Super-Ego'
  },
  {
    index: 6,
    name: 'Vulnerable',
    accepting: false,
    mental: true,
    strong: false,
    valued: false,
    block: 'Super-Ego'
  },
  {
    index: 7,
    name: 'Demonstrative',
    accepting: false,
    mental: false,
    strong: true,
    valued: false,
    block: 'Id'
  },
  {
    index: 8,
    name: 'Ignoring',
    accepting: true,
    mental: false,
    strong: true,
    valued: false,
    block: 'Id'
  },
];

const alpha = { types: ['ILE', 'LII', 'ESE', 'SEI'] };
const beta = { types: ['SLE', 'LSI', 'EIE', 'IEI'] };
const gamma = { types: ['SEE', 'ESI', 'LIE', 'ILI'] };
const delta = { types: ['IEE', 'EII', 'LSE', 'SLI'] };

const types = [
  {
    name: 'ILE',
    quadra: 'Alpha',
    stack: ['Ne', 'Ti', 'Fe', 'Si', 'Se', 'Fi', 'Te', 'Ni'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/05/ile-intuitive-logical-energiser.html',
    socioLink: 'https://www.sociotype.com/socionics/types/ILE-ENTp/',
  },
  {
    name: 'LII',
    quadra: 'Alpha',
    stack: ['Ti', 'Ne', 'Si', 'Fe', 'Fi', 'Se', 'Ni', 'Te'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/05/lii-logical-intuitive-integrator.html',
    socioLink: 'https://www.sociotype.com/socionics/types/LII-INTj/',
  },
  {
    name: 'ESE',
    quadra: 'Alpha',
    stack: ['Fe', 'Si', 'Ne', 'Ti', 'Te', 'Ni', 'Se', 'Fi'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/09/ese-ethical-sensory-energiser.html',
    socioLink: 'https://www.sociotype.com/socionics/types/ESE-ESFj/',
  },
  {
    name: 'SEI',
    quadra: 'Alpha',
    stack: ['Si', 'Fe', 'Ti', 'Ne', 'Ni', 'Te', 'Fi', 'Se'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/08/sei-sensory-ethical-integrator.html',
    socioLink: 'https://www.sociotype.com/socionics/types/SEI-ISFp/',
  },
  // Beta
  {
    name: 'EIE',
    quadra: 'Beta',
    stack: ['Fe', 'Ni', 'Se', 'Ti', 'Te', 'Si', 'Ne', 'Fi'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/05/eie-ethical-intuitive-energiser.html',
    socioLink: 'https://www.sociotype.com/socionics/types/EIE-ENFj/',
  },
  {
    name: 'IEI',
    quadra: 'Beta',
    stack: ['Ni', 'Fe', 'Ti', 'Se', 'Si', 'Te', 'Fi', 'Ne'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/05/iei-intuitive-ethical-integrator.html',
    socioLink: 'https://www.sociotype.com/socionics/types/IEI-INFp/',
  },
  {
    name: 'LSI',
    quadra: 'Beta',
    stack: ['Ti', 'Se', 'Ni', 'Fe', 'Fi', 'Ne', 'Si', 'Te'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/09/lsi-logical-sensory-integrator.html',
    socioLink: 'https://www.sociotype.com/socionics/types/LSI-ISTj/',
  },
  {
    name: 'SLE',
    quadra: 'Beta',
    stack: ['Se', 'Ti', 'Fe', 'Ni', 'Ne', 'Fi', 'Te', 'Si'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/09/sle-sensory-logical-energiser.html',
    socioLink: 'https://www.sociotype.com/socionics/types/SLE-ESTp/',
  },
  // Gamma
  {
    name: 'LIE',
    quadra: 'Gamma',
    stack: ['Te', 'Ni', 'Se', 'Fi', 'Fe', 'Si', 'Ne', 'Ti'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/06/lie-logical-intuitive-energiser.html',
    socioLink: 'https://www.sociotype.com/socionics/types/LIE-ENTj/',
  },
  {
    name: 'ILI',
    quadra: 'Gamma',
    stack: ['Ni', 'Te', 'Fi', 'Se', 'Si', 'Fe', 'Ti', 'Ne'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/06/ili-intuitive-logical-integrator.html',
    socioLink: 'https://www.sociotype.com/socionics/types/ILI-INTp/',
  },
  {
    name: 'SEE',
    quadra: 'Gamma',
    stack: ['Se', 'Fi', 'Te', 'Ni', 'Ne', 'Ti', 'Fe', 'Si'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/07/see-sensory-ethical-energiser.html',
    socioLink: 'https://www.sociotype.com/socionics/types/SEE-ESFp/',
  },
  {
    name: 'ESI',
    quadra: 'Gamma',
    stack: ['Fi', 'Se', 'Ni', 'Te', 'Ti', 'Ne', 'Si', 'Fe'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/07/esi-ethical-sensory-integrator.html',
    socioLink: 'https://www.sociotype.com/socionics/types/ESI-ISFj/',
  },
  // Delta
  {
    name: 'IEE',
    quadra: 'Delta',
    stack: ['Ne', 'Fi', 'Te', 'Si', 'Se', 'Ti', 'Fe', 'Ni'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/05/iee-intuitive-ethical-energiser.html',
    socioLink: 'https://www.sociotype.com/socionics/types/IEE-ENFp/',
  },
  {
    name: 'EII',
    quadra: 'Delta',
    stack: ['Fi', 'Ne', 'Si', 'Te', 'Ti', 'Se', 'Ni', 'Fe'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/05/eii-ethical-intuitive-integrator.html',
    socioLink: 'https://www.sociotype.com/socionics/types/EII-INFj/',
  },
  {
    name: 'LSE',
    quadra: 'Delta',
    stack: ['Te', 'Si', 'Ne', 'Fi', 'Fe', 'Ni', 'Se', 'Ti'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/09/lse-logical-sensory-energiser.html',
    socioLink: 'https://www.sociotype.com/socionics/types/LSE-ESTj/',
  },
  {
    name: 'SLI',
    quadra: 'Delta',
    stack: ['Si', 'Te', 'Fi', 'Ne', 'Ni', 'Fe', 'Ti', 'Se'],
    wssLink: 'https://worldsocionics.blogspot.com/2015/09/sli-sensory-logical-integrator.html',
    socioLink: 'https://www.sociotype.com/socionics/types/SLI-ISTp/',
  },
];

const functionMap = new Map();
functions.forEach((f) => {
  functionMap.set(f.name, f);
});
const typeMap = new Map();
types.forEach((t) => {
  typeMap.set(t.name, t);
  const stack = [];
  for (let i = 0; i < t.stack.length; i++) {
    const f = {
        function: functionMap.get(t.stack[i]),
        characteristics: functionCharacteristics[i]
      };
      stack.push(f);
  }
  // REPLACES the stack with a new array combining the stack name and additional characteristics for each function
  t.stack = stack;
});

export const SocionicsModel = {
  functionMap: functionMap,
  typeMap: typeMap,
  functionCharacteristics: functionCharacteristics
};
