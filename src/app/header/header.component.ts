import { Component, OnInit } from '@angular/core';
import { HomeLink } from '../home/home-link';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  show = false;
  headerCollapsed = true;

  headerLinks: HomeLink[] = [
    new HomeLink(
      'Search',
      '/search',
      '',
      false,
      ''
    ),
    new HomeLink(
      'Analyze',
      '/analyzer',
      '',
      false,
      ''
    ),
    new HomeLink(
      'Practice',
      '/practice',
      '',
      false,
      ''
    ),
    // {
    //   title: 'Quiz',
    //   href: '/quiz',
    //   lead: '',
    //   ext: false,
    // },
    {
      title: 'Blog',
      href: 'http://www.subjectivepersonality.com',
      lead: '',
      ext: true,
      img: ''
    },
    {
      title: 'Support',
      href: 'https://subjectivepersonality.wordpress.com/about/support/',
      lead: '',
      ext: true,
      img: ''
    }
  ];

  
  dropdownLinks: HomeLink[] = [
    new HomeLink(
      'OPS Terms',
      '/terms',
      '',
      false,
      ''
    ),
    new HomeLink(
      'Enneagram Descriptions',
      '/nineTypes/descriptions',
      '',
      false,
      ''
    ),
    new HomeLink(
      'Enneagram Trifixes',
      '/nineTypes/trifix',
      '',
      false,
      ''
    ),
    new HomeLink(
      'Enneagram Grid',
      '/nineTypes/grid',
      '',
      false,
      ''
    ),
    new HomeLink(
      'DAA Class in Order',
      '/nineTypes/daa',
      '',
      false,
      ''
    ),
  ];
  
  externalLinks: HomeLink[] = [
    new HomeLink(
      'Directory of OPS Links',
      'https://docs.google.com/document/d/1h5MkfI1KpnVZl2AWaUnm45Nkt6A12F7Bgi3CFZkXinM/edit#',
      '',
      false,
      ''
    ),
    new HomeLink(
      'OPT Toy',
      'https://opt-toy.vercel.app/',
      '',
      false,
      ''
    ),
    new HomeLink(
      'OPS Database',
      'http://db.subjectivepersonality.com/',
      '',
      false,
      ''
    ),
    new HomeLink(
      'Class Notes',
      'https://docs.google.com/document/d/1aLrwLdhvOGIF-fdouUxAxJ_5tlt6mgu_NBnXaN4N_JU/edit?usp=sharing',
      '',
      false,
      ''
    ),
    new HomeLink(
      'Class Archives',
      'https://docs.google.com/document/d/1lNO4NjYwvPQYSBhHZNzTiFTTVfhitOWlFsdvr-WTX9g/edit?usp=sharing',
      '',
      false,
      ''
    ),
    new HomeLink(
      'Type-A-Tool',
      'https://docs.google.com/document/d/1CcoxI6aknkRsc5-LCb41Ire-jGNCsqIKA76oeY4cxsQ/edit#',
      '',
      false,
      ''
    ),
    new HomeLink(
      'Elimination Tool',
      'https://www.objectivepersonalitysystem.com/elimination-tool',
      '',
      false,
      ''
    ),
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
