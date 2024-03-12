import { Component, ElementRef, OnInit } from '@angular/core';
import { HomeLink } from '../home/home-link';
import { HeaderModel } from './header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class HeaderComponent implements OnInit {

  show = false;
  showOps = false;
  headerCollapsed = true;

  headerLinks = [
    new HomeLink(
      'Search',
      '/search',
      '',
      false,
      ''
    ),
    HeaderModel.opsLinks,
    HeaderModel.enneagramLinks,
    HeaderModel.externalLinks,
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

  constructor(private _eref: ElementRef) { }

  ngOnInit(): void {
  }
  
  onClick(event: any) {
    setTimeout(() => {
      if (this.eventIsOutsideHeader(event)) {
          // && (!this.headerCollapsed || this.show || this.showOps)) { // header isn't collapsed yet
        HeaderModel.opsLinks.toggle = false;
        HeaderModel.enneagramLinks.toggle = false;
        HeaderModel.externalLinks.toggle = false;
        this.headerCollapsed = true;
      }
    });
   }

   openExternal(href:string) {
    this.show = false;
    this.showOps = false;
    window.open(href, "_blank");
   }

   eventIsOutsideHeader(event: any) {
     return !this._eref.nativeElement.contains(event.target);
   }

   isArray(link) {
    return !!link.label;
   }
}

