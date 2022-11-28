import { Component, ElementRef, OnInit } from '@angular/core';
import { HomeLink } from '../home/home-link';

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
      '/ops/terms',
      '',
      false,
      ''
    ),
    new HomeLink(
      'OPS Class in Order',
      '/ops/class',
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
      'OPS Molecule - OPT Toy',
      'https://opt-toy.vercel.app/',
      '',
      false,
      ''
    ),
    new HomeLink(
      'OPS Database on Airtable',
      'http://db.subjectivepersonality.com',
      '',
      false,
      ''
    ),
    new HomeLink(
      'OPS Class Notes',
      'https://docs.google.com/document/d/1aLrwLdhvOGIF-fdouUxAxJ_5tlt6mgu_NBnXaN4N_JU/edit?usp=sharing',
      '',
      false,
      ''
    ),
    new HomeLink(
      'OPS Class Archives',
      'https://docs.google.com/document/d/1lNO4NjYwvPQYSBhHZNzTiFTTVfhitOWlFsdvr-WTX9g/edit?usp=sharing',
      '',
      false,
      ''
    ),
    new HomeLink(
      'OPS Type-A-Tool',
      'https://docs.google.com/document/d/1CcoxI6aknkRsc5-LCb41Ire-jGNCsqIKA76oeY4cxsQ/edit#',
      '',
      false,
      ''
    ),
    new HomeLink(
      'OPS Elimination Tool',
      'https://www.objectivepersonalitysystem.com/elimination-tool',
      '',
      false,
      ''
    ),
    
  ];

  constructor(private _eref: ElementRef) { }

  ngOnInit(): void {
  }
  
  onClick(event) {
    console.log("test1", this._eref.nativeElement.contains(event.target), this.show, this.headerCollapsed);
    setTimeout(() => {
      if (!this._eref.nativeElement.contains(event.target) && (!this.headerCollapsed || this.show)) {// or some similar check
        console.log("test2");
        this.show = false;
        this.headerCollapsed = true;
      }
    });
   }

   openExternal(href:string) {
    this.show=false;
    window.open(href, "_blank");
   }

}
