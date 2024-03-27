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
      'Search',
      '/search',
      'Explore our Typology Database',
      false,
      '/assets/images/database.png'
    ),
    new HomeLink(
      'Analyze',
      '/analyzer',
      'Break down and compare personality types from multiple systems',
      false,
      '/assets/images/analyzer.png'
    ),
    {
      title: 'Practice',
      href: '/practice',
      lead: 'Sharpen your typing skills with random celebrities from our database.',
      ext: false,
      img: '/assets/images/sp-logo-no-bg.png'
    },
    // {
    //   title: 'Quiz',
    //   href: '/quiz',
    //   lead: 'Who need objectivity when you could take a quiz?',
    //   ext: false,
    // },
    // {
    //   title: 'Blog',
    //   href: 'http://www.subjectivepersonality.com',
    //   lead: 'Learn more by reading our typology content on our blog.',
    //   ext: true,
    //   img: '/assets/images/sp-logo-no-bg.png'
    // },
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
