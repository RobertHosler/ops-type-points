import { Component, OnInit } from '@angular/core';
import { HomeLink } from '../home/home-link';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerCollapsed = true;

  headerLinks: HomeLink[] = [
    new HomeLink(
      'Analyzer',
      '/analyzer',
      '',
      false
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
    },
    {
      title: 'Release Notes',
      href: '/updates',
      lead: '',
      ext: false,
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
