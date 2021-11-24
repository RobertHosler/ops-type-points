import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  darkMode = true;

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
}

  toggleDarkMode() {
    if (this.darkMode) {
      this.darkMode = false;
      this.renderer.removeClass(document.body, 'dark-mode');
    } else {
      this.darkMode = true;
      this.renderer.addClass(document.body, 'dark-mode');
    }
  }
}
