const descriptions = new Map();
descriptions.set(
  '2',
  'sweetness and care, positive emotions, heartfelt love and affection, goodness and serving'
);
descriptions.set(
  '3',
  'excellence, accomplishments, repressing emotion, value and success fitting a recognizable mold'
);
descriptions.set(
  '4',
  'withdrawn individuation, negative self-image, chronic disappointment, self-distinct taste in aesthetics'
);
descriptions.set(
  '5',
  'dissecting/uncovering the unknown, conceptualizing, granular over-focus'
);
descriptions.set(
  '6',
  'hyper-vigilance, guidance outside of myself, orienting to a system or structure'
);
descriptions.set(
  '7',
  'possibilities, animated interestingness, multi-faceted options for experience'
);
descriptions.set(
  '8',
  'forcefulness and impact, pushing and expanding out, amping up at the expense of softer and smaller inner parts'
);
descriptions.set(
  '9',
  'fuzzy and unclear, inner confusion from dispersed and cluttered wants and needs, diffuse absorbing of outside influences'
);
descriptions.set(
  '1',
  'rigidity and self-control, high standards of purity maintained by self-restriction, moralistic criticism and judgment'
);

const descriptionsSourceUrl =
  'https://www.enneagrammer.com/-blog/trifix-cheat-sheet';

const centers = {
  head: "In the Head/Thinking center (5,6,7) fixation is how you're compensating for not knowing and trying to navigate and understand what's real. Each head fix is overdoing a different style of insight.",
  heart:
    'In the Heart/Image center (2,3,4) fixation is your preferred way of maintaining a self-image. One might feel “I should” show this.',
  gut: 'In the Gut/Body center (8,9,1) fixation is how you’re maintaining ego boundaries. It’s how you’re creating psychological boundaries and distance internally and externally.',
};

export const Trifix = {
  descriptions: descriptions,
  descriptionsSourceUrl: descriptionsSourceUrl,
  centers: centers,
};
