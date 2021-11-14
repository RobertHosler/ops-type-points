const functions = [
  {
    name: 'Se',
    longName: 'Extroverted Sensation',
    altName: 'Force',
    description: 'authority, influence, desire, political interest/personal investment, competition/struggle, willpower, impact, force, appearance, readiness, tactics, territory'
  },
  {
    name: 'Fe',
    longName: 'Extroverted Ethics',
    altName: 'Emotions',
    description: 'emotions and emotional expression, passion, mood, excitation, exuberance, romanticism, imitation, acting, not a moral arbiter of good/evil, how they are treated as opposed to how others are treated, sympathy, at certain instances disregards other people\'s humanity in certain situations, judgements are determined by the situation - at things being done'
  },
  {
    name: 'Ne',
    longName: 'Extroverted Intuition',
    altName: 'Ideas',
    description: 'potential/possibility, the unique and unusual, ability, essence, perception of the whole, uncertainty, the unknown, search, internal makeup, suddenness, chance, being, permanence, impermanence'
  },
  {
    name: 'Te',
    longName: 'Extroverted Logic',
    altName: 'Pragmatism',
    description: 'benefit, efficiency, action, knowledge, method, mechanism, act, work, motion, reason, technology, fact, expediency, economy, asks "why" to get information, facts, analysis collected data to make logical conclusions, law, legal right, generally accepted knowledge and rules/laws is more the realm of Te'
  },
  {
    name: 'Si',
    longName: 'Introverted Sensation',
    altName: 'Senses',
    description: 'harmony, pleasure, health, comfort, pleasantness, satisfaction, convenience, quality, cosiness, aesthetics'
  },
  {
    name: 'Fi',
    longName: 'Introverted Ethics',
    altName: 'Relations',
    description: 'like/dislike, decency and niceness, morals, good/bad, etiquette, humanism, attraction/repulsion, empathy, compassion, attitude towards other human beings, how others are treated, think about other\'s humanity "let\'s hear his side," judgements determined by people doing things'
  },
  {
    name: 'Ni',
    longName: 'Introverted Intuition',
    altName: 'Time',
    description: 'development over time (processes), cause and effect, history, planning, forecasting, past/future, rhythm, speed, urgency, fantas'
  },
  {
    name: 'Ti',
    longName: 'Introverted Logic',
    altName: 'Laws',
    description: 'analysis, hierarchy, classification, understanding, order, system, structure, formal logic'
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
    block: 'Ego',
    description: 'Primary source of confidence and primary state of mind.  Personal motivator which shapes their life.'
  },
  {
    index: 2,
    name: 'Creative',
    accepting: false,
    mental: true,
    strong: true,
    valued: true,
    block: 'Ego',
    description: 'Used to interact with others and solve problems.  Overuse can lead to irritation by others.'
  },
  {
    index: 3,
    name: 'Mobilizing',
    accepting: false,
    mental: false,
    strong: false,
    valued: true,
    block: 'Super-Id',
    description: 'Function is appreciated, but can be seen as overdone by others.  Can be seen as boring and become neglected or conversely, overindulged.'
  },
  {
    index: 4,
    name: 'Suggestive',
    accepting: true,
    mental: false,
    strong: false,
    valued: true,
    block: 'Super-Id',
    description: 'Entertaining, soothing, and energizing.  Integration leads to self actualization.  Deficiency leads to attempts to self satisfy.'
  },
  {
    index: 5,
    name: 'Role',
    accepting: true,
    mental: true,
    strong: false,
    valued: false,
    block: 'Super-Ego',
    description: 'Seen as personal weakness and something to improve.  Criticism causes irritation.  Activated when anxious.'
  },
  {
    index: 6,
    name: 'Vulnerable',
    accepting: false,
    mental: true,
    strong: false,
    valued: false,
    block: 'Super-Ego',
    description: 'Usage is irritating and is avoided whenever possible. Developed through personal experience, but often ignored.'
  },
  {
    index: 7,
    name: 'Demonstrative',
    accepting: false,
    mental: false,
    strong: true,
    valued: false,
    block: 'Id',
    description: 'Used often, but privately. Perceived as obvious and made fun of while still shaping worldview.'
  },
  {
    index: 8,
    name: 'Ignoring',
    accepting: true,
    mental: false,
    strong: true,
    valued: false,
    block: 'Id',
    description: 'Annoying, but can be used when needed, causes boredom and avoidance which makes it appear weak.'
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
