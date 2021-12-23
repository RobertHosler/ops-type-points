const combinations = [
  {
    numbers: '479',
    names: ['The Palm Reader', 'Huh?'],
    description: [
      'Not grounded, and overly creative, esoteric',
      'Indulge in a possibly delusional fantasy',
      'A Slippery slime which invokes, "Dude, what?" and "What the hell is this?" from others',
    ],
    reactive: 0,
    positive: 0,
    competency: 0,
    assertive: 0,
    compliant: 0,
    withdrawn: 0,
    attachment: 0,
    frustration: 0,
    rejection: 0,
  },
  {
    numbers: '478',
    names: ['The Uranus', 'Revolving Door Rehab'],
    description: [
      'Breaking things down and starting new. In a word, "Chaos"',
      'Individualistic and Indulgent',
      'A self-interested and bratty energy',
    ],
  },
  {
    numbers: '469',
    names: ['Charlie Brown', 'Whiny Tears'],
    description: [
      'Whining, Complianing, and Self-pity/Self-deprecation',
      '2x reactive, but with no punch to it',
      'No real mobilization or action to resolve',
    ],
  },
  {
    numbers: '468',
    names: ['The Grenade', 'Public Display of Affliction'],
    description: [
      "Incendiary, drama instigator, let's hash it out",
      'Reactionary to inconsistencies',
      'Push outward, triple reaction types',
      "Inner conflict between attachment type (6) and I don't care what you think of me",
    ],
  },
  {
    numbers: '459',
    names: ['Hateful Ghost'],
    description: [
      'Triple withdrawn, double rejection, double frustration',
      'Not present in body so has a very ghost like essence',
    ],
  },
  {
    numbers: '458',
    names: ['The Demon', 'Useless Beast'],
    description: [
      'Withdrawn individualist experiencing internal havoc',
      'Bold about being against others',
      "Werner Herzog's sad beige children",
      'The 3 "darkest" fixes',
    ],
  },
  {
    numbers: '379',
    names: ['The DJ', 'The Sex'],
    description: [
      'Stirs things up with 3/7 assertiveness combined with easygoing nature of the 9',
      'Uplifting and makes thing happen, but takes no responsibility',
      '"What do you guys think about this?" "Let\'s get a discussion going/make it a party"',
      'Natural sex appeal through the sense that bodies are fun and its not a big deal',
    ],
  },
  {
    numbers: '378',
    names: ['The Comet', 'Chad / Stacy'],
    description: [
      'Triple assertive types - fast and action oriented',
      'Oozes egoism and confidence - shooting for the stars',
      'Image conscious',
    ],
  },
  {
    numbers: '369',
    names: ['The Bermuda Triangle'],
    description: [
      'Lose themselves through over-attaching - 3x attachment types',
      "Disconnection within self - Left hand doesn't know what right is up to",
      'Can relate and adapt to anyone - but loses sight of themselves',
      'The 3 types on the triangle within the enneagram'
    ],
  },
  {
    numbers: '368',
    names: ['The Warrior', 'The Kyle / Kylie'],
    description: [
      'Natural warrior attitude - Ready to go off when pushed - Reactive and tough',
      'Chip on their shoulder - like they could punch through walls',
      'Most competitive trifix - wants to prove it through effort',
    ],
  },
  {
    numbers: '359',
    names: ['The Coder', 'Flatline'],
    description: [
      'Bypass their feelings, not many fluctuations',
      'Don\t express emotions outwardly',
      'Checked out but busy and focused on stuff',
      '3/5 competency meets broadened thinking of the 9',
    ],
  },
  {
    numbers: '358',
    names: ['The Serial Killer', 'American Psycho'],
    description: [
      'Mask of the 3 + Energy of the 8 + Knowledge of the 5',
      'An impersonal type of friendly, leaning toward heartlessness - No natural warmth',
      'An intense imposing vision carried outwardly - like a robotic Ares',
    ],
  },
  {
    numbers: '279',
    names: ['The Rainbow', 'Hippie Burnout'],
    description: [
      'Triple Positive - "Why can\'t we all just get along?" - Sunshine and Rainbows',
      'Disassociate to hold boundaries',
      'Positivity as a weapon/defense',
      '"Everything happens for a reason"',
    ],
  },
  {
    numbers: '278',
    names: ['The Venusian Brat', 'Smothering Jazz Hands'],
    description: [
      'A sense of deserving to be pampered but with a Venusian air, a loud-mouth Goddess',
      'So exuberant and forceful they might "good intention" you into a bad situation',
      'A self-interested helper (2/7), with the forcefulness (2x Aggressive) to push it forward',
    ],
  },
  {
    numbers: '269',
    names: ['Stockhold Syndrome'],
    description: [
      'Befriend your captor and take abuse while putting self in service',
      '3x "Niceness" - Overly empathetic, Anti-self interest',
      'A sacrificial lamb looking to offer their service for the good of others',
    ],
  },
  {
    numbers: '268',
    names: ['The Superhero Rebel', "Wouldn't hurt a fly"],
    description: [
      'Powerful but wants to use it for good - fighting for the underdog',
      '8 engine behind two supportive types - a coach archetype',
      'A parental figure - 2 mother + 8 father + 6 authority',
    ],
  },
  {
    numbers: '259',
    names: ['The Psychotherapist', 'Spineless Saint'],
    description: [
      'Wants to help you but not directly - an analytical humanist',
      'Remains removed but works to do good',
      '"Philospher of the Universe"',
    ],
  },
  {
    numbers: '258',
    names: ['The Monk', 'Cult Classic'],
    description: [
      'Wants to offer something specific - triple rejection',
      'Influence and help with the intellect to back it up',
      'Gets involved rather than providing a generalized offering',
    ],
  },
  {
    numbers: '147',
    names: ['Princess and the Pea', 'The Lunatic'],
    description: [
      'Dissatisfaction and impatience - a combination of opposing energies',
      'Manic "I hate this" energy wanting to get to the next thing',
      'Would throw people out of the bar for rooming the vibe - extreme frustration',
    ],
  },
  {
    numbers: '146',
    names: ['The Critic', 'My Big Pain'],
    description: [
      'Triple critical types so very picky and judgy',
      '4 subjective preferences + 1 morality + 6 expecting things to go wrong',
      'Always seems to have something they can criticize/complain about - their "big pain"',
      '2x frustration, 2x reactive, 2x super-ego',
    ],
  },
  {
    numbers: '145',
    names: ['The Inflexible', 'Insectoid'],
    description: [
      'Highly obscure and particular - the least flexible/malleable fixes',
      'Hard angles and peculiar, alien quality like a praying mantis',
      'An unexpressive type 4 instead expressed through a smoldering disdain',
      '2x rejection creating sharp distinctions',
    ],
  },
  {
    numbers: '137',
    names: ['The Startup', 'Welcome to my Ted Talk'],
    description: [
      'Projects inspiration, innovation, and "goodness" in a handwavey way',
      '"I know where this needs to go but have no idea how to get there"',
      'Capitalistic visionary fueled by narcissism',
      'Architecturally creative and enthusiastic - keeps going despite failures',
    ],
  },
  {
    numbers: '136',
    names: ['Middle Manager', 'The Worker'],
    description: [
      'Triple control types - holding things together',
      'Anxiety of being in the middle and feeling like they know the way things should be done',
      'Can become preoccupied with work over everything else - wants to get it done and right',
    ],
  },
  {
    numbers: '135',
    names: ['The Robot', 'The Robo Celebate'],
    description: [
      '3x competency - lacking warmth and humanness',
      'I am here to get it done in swift robotic fashion',
      'Order and productivity above all else',
    ],
  },
  {
    numbers: '127',
    names: ['Cool Teacher', 'The Priest'],
    description: [
      'Inspirational 2x positive types add a cheesyness to the 1',
      '2x super-ego wants to be seen as good',
      'Wants to let loose and be positive, but constrained and grounded by the morality of the 1',
      '"The least cool 7" and thus a "non-celebrity" type',
    ],
  },
  {
    numbers: '126',
    names: ['The Helicopter Parent', 'Ball Buster',' Ok Boomer'],
    description: [
      '3x super-ego, dorky and by the book',
      '"I tuck in my polo shirts" and no rock-n-roll',
      'Strict adherence to morals and correction',
      'Nagging partner with focus on how things should be done',
    ],
  },
  {
    numbers: '125',
    names: ['The Know-It-All', 'Friendzone'],
    description: [
      'The three fixes that "know better" than you do, and they\'re happy to tell you',
      'Nice guys that gets friendzoned or the librarian archetype',
      'Either too into your business (2) or too withdrawn (5)',
      'Helpful goodness, but with no "edge" to lead to something more',
      '"I\'ll be a such a good friend to you that you will fall for me" - researches how to be helpful',
    ],
  },
];

const gut = [8, 9, 1];
const head = [5, 6, 7];
const heart = [2, 3, 4];

const reactive = [4, 6, 8];
const positive = [2, 7, 9];
const competency = [1, 3, 5];

const assertive = [3, 7, 8];
const compliant = [1, 2, 6];
const withdrawn = [4, 5, 9];

const attachment = [3, 6, 9];
const frustration = [1, 4, 7];
const rejection = [2, 5, 8];

const triads = [
  {
    name: 'Centers',
    parts: [
      {
        name: 'Gut',
        numbers: [8, 9, 1],
      },
      {
        name: 'Heart',
        numbers: [2, 3, 4],
      },
      {
        name: 'Head',
        numbers: [5, 6, 7],
      },
    ],
  },
  {
    name: 'Harmonics',
    parts: [
      {
        name: 'Reactive',
        numbers: [4, 6, 8],
      },
      {
        name: 'Positive',
        numbers: [2, 7, 9],
      },
      {
        name: 'Competency',
        numbers: [1, 3, 5],
      },
    ],
  },
  {
    name: 'Hornevian',
    parts: [
      {
        name: 'Assertive',
        numbers: [3, 7, 8],
      },
      {
        name: 'Compliant',
        numbers: [1, 2, 6],
      },
      {
        name: 'Withdrawn',
        numbers: [4, 5, 9],
      },
    ],
  },
  {
    name: 'Object Relations',
    parts: [
      {
        name: 'Attachment',
        numbers: [3, 6, 9],
      },
      {
        name: 'Frustration',
        numbers: [1, 4, 7],
      },
      {
        name: 'Rejection',
        numbers: [2, 5, 8],
      },
    ],
  },
];

combinations.forEach((combo) => {
  combo.reactive = 0;
  reactive.forEach((number) => {
    if (combo.numbers.includes(number + '')) {
      combo.reactive++;
    }
  });
  combo.positive = 0;
  positive.forEach((number) => {
    if (combo.numbers.includes(number + '')) {
      combo.positive++;
    }
  });
  combo.competency = 0;
  competency.forEach((number) => {
    if (combo.numbers.includes(number + '')) {
      combo.competency++;
    }
  });
  combo.assertive = 0;
  assertive.forEach((number) => {
    if (combo.numbers.includes(number + '')) {
      combo.assertive++;
    }
  });
  combo.compliant = 0;
  compliant.forEach((number) => {
    if (combo.numbers.includes(number + '')) {
      combo.compliant++;
    }
  });
  combo.withdrawn = 0;
  withdrawn.forEach((number) => {
    if (combo.numbers.includes(number + '')) {
      combo.withdrawn++;
    }
  });
  combo.attachment = 0;
  attachment.forEach((number) => {
    if (combo.numbers.includes(number + '')) {
      combo.attachment++;
    }
  });
  combo.frustration = 0;
  frustration.forEach((number) => {
    if (combo.numbers.includes(number + '')) {
      combo.frustration++;
    }
  });
  combo.rejection = 0;
  rejection.forEach((number) => {
    if (combo.numbers.includes(number + '')) {
      combo.rejection++;
    }
  });
});

combinations.sort((a, b) => {
  if (a.numbers < b.numbers) {
    return -1;
  } else if (a.numbers > b.numbers) {
    return 1;
  } else {
    return 0;
  }
});

export const TrifixCombinations = {
  descriptions: combinations,
  nicknamesUrl: 'https://www.enneagrammer.com/-blog/trifix-nicknames',
  moreNicknamesUrl: 'http://enneasite.com/trifix/',
  getCenter: function (number: number) {
    if (TrifixCombinations.isGut(number)) {
      return 'Gut';
    } else if (TrifixCombinations.isHead(number)) {
      return 'Head';
    } else if (TrifixCombinations.isHeart(number)) {
      return 'Heart';
    }
    return '';
  },
  isGut: function (number: number) {
    return gut.includes(number);
  },
  isHead: function (number: number) {
    return head.includes(number);
  },
  isHeart: function (number: number) {
    return heart.includes(number);
  },
  getHarmonics(number: number) {
    if (TrifixCombinations.isReactive(number)) {
      return 'Reactive';
    } else if (TrifixCombinations.isPositive(number)) {
      return 'Positive';
    } else if (TrifixCombinations.isCompetency(number)) {
      return 'Competency';
    }
  },
  isReactive: function (number: number) {
    return reactive.includes(number);
  },
  isPositive: function (number: number) {
    return positive.includes(number);
  },
  isCompetency: function (number: number) {
    return competency.includes(number);
  },
  getHornevian(number: number) {
    if (TrifixCombinations.isAssertive(number)) {
      return 'Assertive';
    } else if (TrifixCombinations.isCompliant(number)) {
      return 'Compliant';
    } else if (TrifixCombinations.isWithdrawn(number)) {
      return 'Withdrawn';
    }
  },
  isAssertive: function (number: number) {
    return assertive.includes(number);
  },
  isCompliant: function (number: number) {
    return compliant.includes(number);
  },
  isWithdrawn: function (number: number) {
    return withdrawn.includes(number);
  },
  coreNumber(number: number) {
    if (TrifixCombinations.isAttachment(number)) {
      return 'Attachment';
    } else if (TrifixCombinations.isRejection(number)) {
      return 'Rejection';
    } else if (TrifixCombinations.isFrustration(number)) {
      return 'Frustration';
    }
  },
  isAttachment: function (number: number) {
    return attachment.includes(number);
  },
  isRejection: function (number: number) {
    return rejection.includes(number);
  },
  isFrustration: function (number: number) {
    return frustration.includes(number);
  },
};
