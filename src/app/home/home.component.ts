import { Component, OnInit } from '@angular/core';
import { TelephoneMinusFill } from 'ngx-bootstrap-icons';
import { Greeting, OpsDataService } from '../service/ops-data.service';
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
      false
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
    },
    {
      title: 'YouTube',
      href: 'https://www.youtube.com/channel/UCIbfLuHIY6Ox8dAm6Xidvqw',
      lead: 'For some reason I decided to show my face on YouTube.',
      ext: true,
    },
  ];

  greeting: string;

  constructor() {}

  ngOnInit(): void {
  }
}
