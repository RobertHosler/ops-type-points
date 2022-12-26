import { HomeLink } from '../home/home-link';

export const HeaderModel = {
  opsLinks: {
    label: 'OPS',
    toggle: false,
    links: [
      new HomeLink('Classes in Order', '/ops/class', '', false, ''),
      new HomeLink('Type Analyzer', '/analyzer', '', false, ''),
      new HomeLink('Type Practice', '/practice', '', false, ''),
      new HomeLink('Type Exemplars', '/practice/exemplars', '', false, ''),
      new HomeLink('Terms', '/ops/terms', '', false, ''),
    ],
  },
  enneagramLinks: {
    label: 'Enneagram',
    toggle: false,
    links: [
      new HomeLink('Classes in Order', '/nineTypes/daa', '', false, ''),
      new HomeLink(
        'Type Descriptions',
        '/nineTypes/descriptions',
        '',
        false,
        ''
      ),
      new HomeLink('Trifix Descriptions', '/nineTypes/trifix', '', false, ''),
      new HomeLink('Type Grid', '/nineTypes/grid', '', false, ''),
    ],
  },
  externalLinks: {
    label: 'External',
    toggle: false,
    links: [
      new HomeLink(
        'Directory of OPS Links',
        'https://docs.google.com/document/d/1h5MkfI1KpnVZl2AWaUnm45Nkt6A12F7Bgi3CFZkXinM/edit#',
        '',
        true,
        ''
      ),
      new HomeLink(
        'OPS Molecule - OPT Toy',
        'https://opt-toy.vercel.app/',
        '',
        true,
        ''
      ),
      new HomeLink(
        'OPS Database on Airtable',
        'http://db.subjectivepersonality.com',
        '',
        true,
        ''
      ),
      new HomeLink(
        'OPS Class Notes',
        'https://docs.google.com/document/d/1aLrwLdhvOGIF-fdouUxAxJ_5tlt6mgu_NBnXaN4N_JU/edit?usp=sharing',
        '',
        true,
        ''
      ),
      new HomeLink(
        'OPS Class Archives',
        'https://docs.google.com/document/d/1lNO4NjYwvPQYSBhHZNzTiFTTVfhitOWlFsdvr-WTX9g/edit?usp=sharing',
        '',
        true,
        ''
      ),
      new HomeLink(
        'OPS Type-A-Tool',
        'https://docs.google.com/document/d/1CcoxI6aknkRsc5-LCb41Ire-jGNCsqIKA76oeY4cxsQ/edit#',
        '',
        true,
        ''
      ),
      new HomeLink(
        'OPS Elimination Tool',
        'https://www.objectivepersonalitysystem.com/elimination-tool',
        '',
        true,
        ''
      ),
    ],
  },
};
