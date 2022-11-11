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
  
  constructor() { }

  ngOnInit(): void {
  }

}
