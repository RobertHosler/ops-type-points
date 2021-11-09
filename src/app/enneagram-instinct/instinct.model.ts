const descriptions = new Map();
descriptions.set('so', {
  name: 'Social',
  description: [
    'hierarchy and status within the group',
    'sense of belonging and contribution',
    'social responsibility and service',
  ],
});
descriptions.set('sp', {
  name: 'Self-Preservation',
  description: [
    'grounded and physical',
    'self-sufficient and disciplined',
    "one's own health, comforts, and stability",
  ],
});
descriptions.set('sx', {
  name: 'Sexual',
  description: [
    'attraction and excitement',
    'what expands and intensifies life',
    'high expectations and ideals for partners',
  ],
});

const order = [
  {
    name: 'Dominant',
    description: 'A weakness which looks like a strength - overdeveloped',
  },
];

export const Instinct = {
  descriptions: descriptions,
};
