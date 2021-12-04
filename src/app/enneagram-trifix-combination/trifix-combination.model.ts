const combinations = [
  {
    numbers: '479',
    name: 'Huh?',
    description: [
      'Not grounded',
      'Overly creative',
      '"Dude, what?"',
      'Indulge in fantasy',
      'Slippery slime',
      '"What the hell is this?"',
      'Peter Pan',
    ],
    reactive: 0,
    positive: 0,
    competency: 0,
    assertive: 0,
    compliant: 0,
    withdrawn: 0,
    attachment: 0,
    frustration: 0,
    rejection: 0
  },
  {
    numbers: '478',
    name: 'Revolving Door Rehab',
    description: [
      'Chaos',
      'Individualistic',
      'Indulgement',
      'Self-interest',
      'Bratty Energy',
    ],
  },
  {
    numbers: '469',
    name: 'Whiny Tears',
    description: [
      'Whiny',
      'Self-pity',
      '2x reactive, but no punch to it',
      'No mobilization',
    ],
  },
  {
    numbers: '468',
    name: 'Public Display of Affliction',
    description: [
      "Incendiary, drama instigator, let's hash it out",
      'Reaction to inconsistencies',
      'Push outward, triple reaction types',
      "Inner conflict between attachment type (6) and I don't care what you think of me",
    ],
  },
  {
    numbers: '459',
    name: 'Hateful Ghost',
    description: [
      'Triple withdrawn types',
      'Not present in body',
      'Frustration',
    ],
  },
  {
    numbers: '458',
    name: 'Useless Beast',
    description: [
      'Withdrawn individualist',
      'Bold about being against others',
      'Sad beige children',
    ],
  },
  {
    numbers: '379',
    name: 'The DJ',
    description: [
      'Uplifting and makes thing happen, but take no responsibility',
      '"What do you guys think about this?"',
      "Let's get a discussion going/make it a party",
      'Stirs things up with 3/7 combined with likeability of the 9',
    ],
  },
  {
    numbers: '378',
    name: 'Chad / Stacy',
    description: [
      'Triple assertive types',
      'Oozes egoism and confidence',
      'Image conscious',
    ],
  },
  {
    numbers: '369',
    name: 'Bermuda',
    description: [
      'Triple attachment types',
      "Left hand doesn't know what right is up to",
      'Can relate to anyone',
    ],
  },
  {
    numbers: '368',
    name: 'The Kyle / Kylie',
    description: [
      'Punch through walls',
      'Chip on their shoulder',
      'Ready to go off when pushed',
      'Most competitive trifix',
      'Prove it through effort',
    ],
  },
  {
    numbers: '359',
    name: 'Flatline',
    description: [
      'Bypass their feelings, not many fluctuations',
      'Don\t express emotions outwardly',
      'Checked out but busy and focused on stuff',
    ],
  },
  {
    numbers: '358',
    name: 'American Psycho',
    description: [
      'Mask of the 3 + Energy of the 8 + Knowledge of the 5',
      'An impersonal type of friendly, leaning toward heartlessness',
      'Intense imposing vision',
    ],
  },
  {
    numbers: '279',
    name: 'Hippie Burnout',
    description: [
      '"Why can\'t we all just get along?"',
      'Disassociate to hold boundaries',
      'Positivity as a weapon/defense',
      '"Everything happens for a reason"',
    ],
  },
  {
    numbers: '278',
    name: 'Smothering Jazz Hands',
    description: [
      'So exuberant and forceful they might "good intention" you into a bad situation',
      'Self interested helper',
      '2x Positive and 2x Aggressive',
    ],
  },
  {
    numbers: '269',
    name: 'Stockhold Syndrome',
    description: [
      'Befriend your captor and take abuse while putting self in service',
      'Anti-self interest',
      'Overly empathetic',
      'Sacrificial lamb looking to offer their service',
    ],
  },
  {
    numbers: '268',
    name: "Wouldn't hurt a fly",
    description: [
      'Powerful but wants to use it for good',
      '8 engine behind two supportive types - coaches',
      'Parental figure - 2 mother + 8 father + 6 authority',
      '2x rejection, 2x reactive, 2x super-ego',
    ],
  },
  {
    numbers: '259',
    name: 'Spineless Saint',
    description: [
      'Wants to help you but not directly',
      'Removed but works to do good',
      '"Philospher of the Universe"',
      '2x positive, 2x withdrawn, 2x super-ego',
    ],
  },
  {
    numbers: '258',
    name: 'Cult Classic',
    description: [
      'Wants to offer something',
      'Influence and help with the intellect to back it up',
      'Gets involved rather than providing a generalized offering',
    ],
  },
  {
    numbers: '147',
    name: 'Princess and the Pea',
    description: [
      'Dissatisfaction and impatience',
      'Manic "I hate this" energy wanting to get to the next thing',
      'Would throw people out of the bar for rooming the vibe',
    ],
  },
  {
    numbers: '146',
    name: 'My Big Pain',
    description: [
      'Triple critical types so very picky',
      '2x frustration, 2x reactive, 2x super-ego',
      '4 - subjective preferences + 1 - morality + 6 expecting things to go wrong',
    ],
  },
  {
    numbers: '145',
    name: 'Insectoid',
    description: [
      'Highly obscure and particular',
      'Hard angles and peculiar, alien quality like a praying mantis',
      'Unexpressive 4 but rather a smoldering disdain',
      '2x rejection and sharp distinctions',
    ],
  },
  {
    numbers: '137',
    name: 'Welcome to my Ted Talk',
    description: [
      'Projects inspiration, innovaion, and "goodness" in a handwavey way',
      '"I know where this needs to go but have no idea how to get there"',
      'Capitalistic visionary fueled by narcissism',
    ],
  },
  {
    numbers: '136',
    name: 'Middle Manager',
    description: [
      'Triple control types',
      'Anxiety of being in the middle and feeling like they know the way things should be done',
      'Can become preoccupied with work over everything else',
    ],
  },
  {
    numbers: '135',
    name: 'Robo Celebate',
    description: [
      '3x competency',
      'I am here to get it done in swift robotic fashion',
      'Order and productivity above all else',
    ],
  },
  {
    numbers: '127',
    name: 'Cool Teacher',
    description: [
      '2x positive types add a cheesyness to the 1',
      '2x super-ego wants to be seen as good',
      'Wants to let loose, but constrainted by morality of the 1',
      '"The least cool 7" a non-celebrity type',
    ],
  },
  {
    numbers: '126',
    name: 'Ball Buster / Ok Boomer',
    description: [
      '3x super-ego, dorky and by the book',
      '"I tuck in my polo shirts" and no rock-n-roll',
      'Strict adherence to morals and correction',
      'Nagging partner with focus on how things should be done',
    ],
  },
  {
    numbers: '152',
    name: 'Friendzone',
    description: [
      'Helpful goodness, but with no edge to lead to something more',
      'Nice guys that gets friendzoned or a librarian type',
      'Either too into your business (2) or too withdrawn (5)',
      'Researches how to be more helpful',
      '"I\'ll be a such a good friend to you that you will fall for me"',
    ],
  },
];

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

export const TrifixCombinations = {
  descriptions: combinations,
};
