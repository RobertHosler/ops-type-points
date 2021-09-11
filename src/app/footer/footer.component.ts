import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private darkModeService: DarkModeService) { }

  ngOnInit(): void {
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

}
