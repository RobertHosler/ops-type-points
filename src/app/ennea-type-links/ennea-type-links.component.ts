import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-ennea-type-links',
  templateUrl: './ennea-type-links.component.html',
  styleUrls: ['./ennea-type-links.component.scss']
})
export class EnneaTypeLinksComponent implements OnInit {
  @Input()
  typedPerson: TypedPerson;

  youtubeLinks: Link[] = [];
  daaLinks: Link[] = [];

  constructor() {}

  ngOnInit(): void {
    if (this.typedPerson.enneaLinks) {
      let linkStrings = this.typedPerson.enneaLinks.split('\n');
      linkStrings.forEach((linkString) => {
        if (linkString) {
          if (
            linkString.includes('youtube.com') ||
            linkString.includes('youtu.be')
          ) {
            let link = new Link();
            link.text = "Public DAA Typing";
            link.href = linkString;
            this.daaLinks.push(link);
          } else if (
            linkString.includes('vimeo.com')
          ) {
            let link = new Link();
            link.text = "Public DAA Typing";
            link.href = linkString;
            this.daaLinks.push(link);
          } else if (linkString.includes('enneagrammer.com/typing-series')) {
            let link = new Link();
            link.text = "Members only DAA Typing";
            link.href = linkString;
            this.daaLinks.push(link);
          }
        }
      });
      let link = new Link();
      link.text = "Join DAA";
      link.href = 'https://www.enneagrammer.com/members-home';
      this.daaLinks.push(link);
      let publicDaa = new Link();
      publicDaa.text = "Public DAA Content";
      publicDaa.href = 'https://vimeo.com/user146722472?embedded=true&source=owner_name&owner=146722472';
      this.daaLinks.push(publicDaa);
    }
  }


  private validYoutubeLink(href: string) {
    return (
      !href.includes('youtube.com/channel') &&
      !href.includes('youtube.com/user') &&
      !href.includes('youtube.com/u/') &&
      !href.includes('youtube.com/c/')
    );
  }

  get allEmpty(): boolean {
    return (
      this.youtubeLinks.length === 0 &&
      this.daaLinks.length === 0
    );
  }

}

class Link {
  text: string;
  href: string;
}

