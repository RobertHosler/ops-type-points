import { Component, OnInit } from '@angular/core';
import { HomeLink } from './home-link';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  homeLinks: HomeLink[] = [
    new HomeLink(
      'Analyzer',
      '/analyzer',
      'Scope out and compare objective personality types',
      false,
      '/assets/images/analyzer.png'
    ),
    new HomeLink(
      'Search',
      '/search',
      'Explore the Objective Personality Database',
      false,
      '/assets/images/database.png'
    ),
    // {
    //   title: 'Quiz',
    //   href: '/quiz',
    //   lead: 'Who need objectivity when you could take a quiz?',
    //   ext: false,
    // },
    {
      title: 'Blog',
      href: 'http://www.subjectivepersonality.com',
      lead: 'Learn more by reading our typology content on our blog.',
      ext: true,
      img: '/assets/images/sp-logo-no-bg.png'
    },
    // {
    //   title: 'YouTube',
    //   href: 'https://www.youtube.com/channel/UCIbfLuHIY6Ox8dAm6Xidvqw',
    //   lead: 'For some reason I decided to show my face on YouTube.',
    //   ext: true,
    //   img: ''
    // },
  ];

  constructor() {}

  ngOnInit(): void {}
}
