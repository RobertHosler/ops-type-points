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

const stems = new Map();
stems.set(
  '12',
  'Being good, moral, kind, helpful, proper, right, judgemental, superego, maternal, critical, what\'s right for all'
);
stems.set(
  '13',
  'Efficiency, getting the job done, repressing emotions, correct, accurate, responsible, competent, structured'
);
stems.set(
  '14',
  'Judgemental, idealistic, search for perfect circumstances, critical, negative, frustration, unyielding, particular, persnickety, exclusions ex. “I don’t do x”'
);
stems.set(
  '15',
  'Doing things right, accuracy, repressing emotions, surgical, unaesthetic, logic, not malleable'
);
stems.set(
  '16',
  'Needing to be certain, inflexibility, criticality, friendly, morality, anxious anger, frustrated reactivity, outraged at others’ behaviour, attention goes to what\'s right and should/shouldn\'t be happening, accusing, rules, procedure, structure, "real life," comedy of reality, funny hard truths, Seinfeld'
);
stems.set(
  '17',
  'Standards and vision, exploration with structure, idealism, firm but fun, kite with a tether, playful teacher, future planning of structures, architectural'
);
stems.set(
  '25',
  'Control via knowing what’s best, hiding own needs, giving from a distance, self-erasing'
);
stems.set(
  '26',
  'Friendly, helpful, kind, worried about others, “of course I’ll help,” people-oriented, amiable'
);
stems.set(
  '27',
  'Avoiding negativity, positive, playful, shallow, smile, radiant'
);
stems.set(
  '28',
  'Control, intrusive, taking charge of others’ well being, big mama, overbearing, rejecting own vulnerable needs'
);
stems.set(
  '29',
  'Receptive, helpful, kind, caring, focused on needs of other, forgets self, “nice,” good samaritan, people-focused'
);
stems.set(
  '35',
  'Accuracy, efficiency, repressing emotions, surgical'
);
stems.set(
  '36',
  'Tracking others, external orientation, worldly, tribalism, hard worker, adaptable, likeable'
);
stems.set(
  '37',
  'Aggressive with what they want, fun, exploring, narcissistic, exhibitionistic, extraverted, shallow waters'
);
stems.set(
  '38',
  'Aggressive with what they want, pushing through, not backing down, dominating, narcissistic, emotional wall'
);
stems.set(
  '39',
  'Adapting to ideals, shiny, glossy, smooth, mirroring, a star, tabula rasa'
);
stems.set(
  '45',
  'Existential, withdrawn, removed from reality, schizoid, an insect among humans, out of touch with the masses, a problem'
);
stems.set(
  '46',
  'Reactive, emotional, over-analyzing, destroying, projection and introjection, they\'ve been "wronged/hurt," Jekyll/Hyde, victim mentality, spiralling'
);
stems.set(
  '47',
  'Idealistic, epicurean, flamboyant, novelty, dramatizing both ups and down, war between rawness and sparkle, black vs. rainbow, "brat," overly individualistic, unsettled, critical, restless, frustration, amoral'
);
stems.set(
  '48',
  'Reactive, authentic, novelty, destroying, “real,” amplifies emotions externally, no bullshit, angry, bratty'
);
stems.set(
  '49',
  'Withdrawn, compassionate, feeling invisible or insignificant, “I’m nothing”'
);
stems.set(
  '58',
  'Control, emotionally dry, hard, internal and external detachment from softness and vulnerability'
);
stems.set(
  '59',
  'Withdrawn, invisible, making space for others, conceptual, passive'
);
stems.set(
  '68',
  'Reactive, counterphobic, pushing, fighting for “truth,” honour, skeptical, accusing, outspoken'
);
stems.set(
  '69',
  'Tracking others/socially aware, “folk”, doubt, uncertainty, not pushing buttons but will fight back if necessary, humility, rabbit, glorifying "uniqueness" as something to celebrate, underdog, friendly, adaptable, "real life," humanity, defying labels and categories, seeing pieces of themselves in many types, "it depends on the situation"'
);
stems.set(
  '78',
  'Aggressive, epicurean, “I want, I take,” childish, no impulse control, royalty, narcissistic'
);
stems.set(
  '79',
  'Positive, light, fluid, changing, an amorphous rainbow, fairy-like, surrealism, mixtures and variety, jazz, free-flowing, playful language, distorted imagery, swirls'
);

const stemSourceUrl = 'https://www.enneagrammer.com/fixes-stems';

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
  stems: stems,
  stemSourceUrl: stemSourceUrl,
  centers: centers,
};
