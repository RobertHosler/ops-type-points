import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent implements OnInit {

  showBanner = false;

  ngOnInit(): void {
    if (!localStorage.getItem("cookieAllowed")) {
      this.showBanner = true;
    }
  }

  consentGranted(granted: boolean) {
    window["AppGtag"].consent(granted);
    window.localStorage.setItem("cookieAllowed", granted ? "yes" : "no");
    this.showBanner = false;
  }

}
