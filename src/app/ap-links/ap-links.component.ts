import { Component, Input } from '@angular/core';
import { apModel } from '../model/ap-model';
import { TypedPerson } from '../service/ops-data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ap-links',
  templateUrl: './ap-links.component.html',
  styleUrls: ['./ap-links.component.scss']
})
export class ApLinksComponent {

  @Input()
  typedPerson: TypedPerson;

  apModel = apModel;
  aspects : string[];
  sanitizedEmbed: SafeResourceUrl;
  
  apType : {
    name: string;
    sexta: string;
    descriptionLink: string;
    sextaLink: string;
  };

  constructor(private _sanitizer: DomSanitizer) {}
  
  ngOnInit(): void {
    this.apType = apModel.apTypeMap.get(this.typedPerson.apType);
    this.aspects = this.apType.name.split('');

    if (this.typedPerson.apLink) {
      this.sanitizedEmbed = this.sanitize(this.typedPerson.apLink);
    }

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

}
