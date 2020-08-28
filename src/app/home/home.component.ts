import { Component, OnInit } from '@angular/core';
import { HomeLink } from './home-link';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  homeLinks: HomeLink[] = [
    new HomeLink(
      'Analyzer',
      '/analyzer',
      'Scope out and compare objective personality types',
      false
    ),
    {
      title: 'Quiz',
      href: '/quiz',
      lead: 'Who need objectivity when you could take a quiz?',
      ext: false,
    },
    {
      title: 'Blog',
      href: 'http://www.subjectivepersonality.com',
      lead: 'Learn more by reading our typology content on our blog.',
      ext: true,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
