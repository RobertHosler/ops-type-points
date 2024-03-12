import { Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  enabled = false;

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const h = new Date().getHours();
    if (h < 7 || h > 17) {
      this.toggleDarkMode();
    }
  }

  toggleDarkMode() {
    if (this.enabled) {
      this.enabled = false;
      this.renderer.removeClass(document.body, 'dark-mode');
    } else {
      this.enabled = true;
      this.renderer.addClass(document.body, 'dark-mode');
    }
  }
}
