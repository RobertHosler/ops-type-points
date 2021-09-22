import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css'],
})
export class UpdatesComponent implements OnInit {
  updates: {
    date: string;
    title: string;
    lead: string;
    bullets: string[];
  }[] = [
    {
      date: '09.21.2021',
      title: 'Search Coins Formatting',
      lead: `Face lift to the coins search`,
      bullets: [
        `Making use of button groups so you don't have to press buttons multiple times to find the coin you want.`,
        'Created coin objects which can be shared across components for centralized information.'
      ],
    },
    {
      date: '09.16.2021',
      title: 'Type Practice Shortcuts',
      lead: `Added shortcuts to the practice typing page`,
      bullets: [
        `Select functions to automatically select the corresponding Human Need and Letter Coins.`,
        'Modality, Animal, and Human Needs combinations also as shortcuts',
        'Type Checklist added to type results on practice page.',
        'Type you are about to submit shown once you select all ten coins.',
        'Validation message shown when 10 coins are invalid since there is an overlap between the Human Needs and the first savior animal',
        'Added functions to search page.'
      ],
    },
    {
      date: '09.15.2021',
      title: 'Styling & Typing Practice Updates',
      lead: `Various styling and updates to the typing practice page`,
      bullets: [
        `Typing practice now displays the list of type records so you
         can pick from among them who you want to type rather than only finding at random.`,
        'Updates to the home page - cards are now a banner.',
        'Fixed links to analyzer on search to be routerLinks rather than refreshing the app.'
      ],
    },
    {
      date: '09.13.2021',
      title: 'Typing Practice',
      lead: `New Type Practice Page`,
      bullets: [
        'Practice your Objective Personality Typing with randomized OPS database selections.',
      ],
    },
    {
      date: '09.12.2021',
      title: 'Checklist',
      lead: `New Checklist Tab`,
      bullets: [
        'View type checklist with definitions from the class notes and an X next to the applicable description for the current type.',
      ],
    },
    {
      date: '09.12.2021',
      title: 'Search Params',
      lead: `Added Search Parameters which appear in the url`,
      bullets: [
        'Send/share direct links to search results with others.',
        'Updates to home page.',
        'Added dark mode.',
        'Added sex and class filters.',
        'Added cluster buttons which allow you to quickly search by combining coins together.',
      ],
    },
    {
      date: '09.09.2021',
      title: 'Search',
      lead: `Added Search Page`,
      bullets: [
        'Search by each of the ten coins.',
        'Search by name of typed person.',
      ],
    },
    {
      date: '09.08.2021',
      title: 'Type Twins',
      lead: `Added Type Twins to the type Summary Tab`,
      bullets: [
        'Using new service I wrote to pull from the Airtable Database.',
        'A "twin" must have the same saviors and animal stack. Modalities Ignored.',
        'Does not currently pull community members.',
      ],
    },
    {
      date: '09.07.2021',
      title: 'Summary Tab',
      lead: `Added new Summary Tab with dashboard and molecule`,
      bullets: [
        'Created new primary tab with dashboard and molecule as a summary of the type lookup.',
        'Summary does not currently work for comparisons.',
        'Added tooltips for mobile dashboard headings.',
      ],
    },
    {
      date: '09.06.2021',
      title: 'Tables and Molecule updates',
      lead: `Updated type visual to molecule and added minimalist options.`,
      bullets: [
        'Fixed issues with tables on certain screen sizes where the borders would become hidden',
        'Reduced number of old men shrugging on the home page',
        'Changed the type visual tab to Molecule',
        'Added new minimalist options to the molecule to remove labels for animals, functions, and the type',
      ],
    },
    {
      date: '03.21.2021',
      title: 'Description and various styling',
      lead: `Added new home page and color theme throughout the app.`,
      bullets: [
        'Analyzer visual tab description update',
        'Release page styling',
        'Green links -> hover orange, some external link icons',
        'Touched the description tab, added a link, future links to supporting info to come',
      ],
    },
    {
      date: '09.05.2020',
      title: 'Theme and Home Page',
      lead: `Added new home page and color theme throughout the app.`,
      bullets: [
        'Color theme uses purple, green/blue, and orange',
        'SP Gradient Branding',
        'Mobile friendly navigation menu',
      ],
    },
    {
      date: '08.25.2020',
      title: 'Validation',
      lead: `Added light validation on the form inputs.`,
      bullets: [
        `Case no longer matters, inputs will automatically be cased as needed.`,
        `Modalities must match MM, MF, FF, or FM`,
        `Functions must be a valid observer and decider function`,
        `Animal stack must be one of the 16 valid stacks`,
        `First animal must match the provided saviors. Ex: Fe Ni cannot be lead Play.`,
      ],
    },
    {
      date: '08.25.2020',
      title: 'Visuals and Comparisons',
      lead: `Added type visuals using bubbles as well as the ability to compare types
       in the various tabs.`,
      bullets: [
        `Checkbox to enable the ability to compare types in the form`,
        `Tabs will show info for each type being compared rather than a single type`,
        `Added a type visualization in the visual tab.  Shoutout to Adam Brooking
        for his 2D representation.`,
        `Visuals have optional 2D and 3D`,
        `Function bubble sizing can be based on multiple factors: (1) S1 > S2 > A > -,
        (2) Grant Stack, or (3) S1, S2, then grant stack order.
        `,
      ],
    },
    {
      date: '08.08.2020',
      title: 'Animal Emojis',
      lead: "Added a tab for the emoji animals based on the type's animal stack.",
      bullets: [],
    },
    {
      date: '08.05.2020',
      title: 'Enhanced Type Description',
      lead: `Added enhanced type descriptions to the Type Descriptions tab using the
        beginner series notes.`,
      bullets: [],
    },
    {
      date: '07.30.2020',
      title: 'Animal Points',
      lead: '',
      bullets: [
        `New points calculation which factors in animal order such that BSPC has
        more Oi than BPSC.`,
        `Added points percentage calculation column.`,
        `Ability to swap between new point calculation and old.`,
        `Ability to configure Animal Order weights.`,
        `Ability to copy links to type using request parameters.`,
        `App navigation header.`,
        `Release Notes page. Yes, this one.`,
      ],
    },
    {
      date: '07.26.2020',
      title: 'Point Theory',
      lead: 'Update to add explanation of pointing theory and the weights being applied.',
      bullets: [],
    },
    {
      date: '07.25.2020',
      title: 'Initial Release',
      lead: 'Initial launch of this app',
      bullets: [
        'OPS Dashboard Generator',
        'Function Points Table',
        'Point Theory Explanation',
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
