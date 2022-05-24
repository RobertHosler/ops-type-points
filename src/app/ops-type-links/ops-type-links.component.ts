import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TypedPerson } from '../service/ops-data.service';

@Component({
  selector: 'app-ops-type-links',
  templateUrl: './ops-type-links.component.html',
  styleUrls: ['./ops-type-links.component.scss'],
})
export class OpsTypeLinksComponent implements OnInit {
  @Input()
  typedPerson: TypedPerson;

  youtubeLinks: Link[] = [];
  classLinks: Link[] = [];
  links: Link[] = [];
  sanitizedEmbed: SafeResourceUrl;

  communityMember;

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.communityMember = this.typedPerson.tags.includes('Community Member');
    if (this.typedPerson.opsLinks) {
      let linkStrings = this.typedPerson.opsLinks.split('[');
      linkStrings.forEach((linkString) => {
        let link = this.parseLink(linkString);
        if (link) {
          if (
            link.href.includes('youtube.com') ||
            link.href.includes('youtu.be')
          ) {
            this.youtubeLinks.push(link);
          } else if (link.href.includes('objectivepersonalitysystem.com')) {
            this.classLinks.push(link);
          } else {
            this.links.push(link);
          }
        }
      });
    }
    if (this.typedPerson.binLink) {
      let binlinks = this.typedPerson.binLink.split('\n');
      binlinks.forEach((binlink) => {
        let link = new Link();
        link.text = 'Binyamin Tsadik Interview';
        link.href = binlink;
        this.youtubeLinks.push(link);
      });
    }
    if (this.typedPerson.enfpLink) {
      let enfplinks = this.typedPerson.enfpLink.split('\n');
      enfplinks.forEach((enfplink) => {
        let link = new Link();
        link.text = 'ENFP Male Interview';
        link.href = enfplink;
        this.youtubeLinks.push(link);
      });
    }
    if (this.typedPerson.otherLinks) {
      let otherLinks = this.typedPerson.otherLinks.split('\n');
      otherLinks.forEach((otherlink) => {
        let link = new Link();
        link.text = 'Other YouTube Interview';
        link.href = otherlink;
        this.youtubeLinks.push(link);
      });
    }
    if (this.typedPerson.ytLink && this.communityMember) {
      this.sanitizedEmbed = this.sanitize(this.typedPerson.ytLink);
    } else {
      for (let i = 0; i < this.youtubeLinks.length; i++) {
        let ytLink = this.youtubeLinks[i];
        if (this.validYoutubeLink(ytLink.href)) {
          this.sanitizedEmbed = this.sanitize(ytLink.href);
          break;
        }
      }
    }
    if (!this.communityMember) {
      let searchLink = new Link();
      searchLink.text = 'Google Search';
      searchLink.href =
        'https://www.google.com/search?q=' + this.typedPerson.name;
      this.links.push(searchLink);
      let imageLink = new Link();
      imageLink.text = 'Image Search';
      imageLink.href =
        'https://www.google.com/search?tbm=isch&q=' + this.typedPerson.name;
      this.links.push(imageLink);
      let interviewLink = new Link();
      interviewLink.text = 'Interview Search';
      interviewLink.href =
        'https://www.youtube.com/results?search_query=interview ' +
        this.typedPerson.name;
      this.links.push(interviewLink);
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

  private parseLink(linkString: string) {
    let link = null;
    let leftText = linkString.indexOf('[');
    leftText = leftText > -1 ? leftText : 0;
    let rightText = linkString.indexOf(']');
    let leftHref = linkString.indexOf('(', rightText);
    let rightHref = linkString.lastIndexOf(')');
    if (rightText > -1 && leftHref > -1 && rightHref > -1) {
      link = new Link();
      link.text = linkString.substring(leftText, rightText);
      link.href = linkString.substring(leftHref + 1, rightHref);
    }
    return link;
  }

  sanitize(url: string) {
    let youtubeIndex = url.indexOf('youtube.com/');
    let embedUrl = null;
    if (youtubeIndex > 0) {
      embedUrl = url.replace('watch?v=', 'embed/');
    } else {
      youtubeIndex = url.indexOf('youtu.be/');
      if (youtubeIndex > 0) {
        embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
      }
    }
    if (embedUrl) {
      let ampIndex = embedUrl.indexOf('&');
      if (ampIndex > 0) {
        embedUrl = embedUrl.substring(0, ampIndex);
      }
      return this._sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else {
      return null;
    }
  }

  get allEmpty(): boolean {
    return (
      this.youtubeLinks.length === 0 &&
      this.classLinks.length === 0 &&
      this.links.length === 0
    );
  }
}

export class Link {
  text: string;
  href: string;
}
