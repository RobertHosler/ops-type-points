import { Component, OnInit, Input } from '@angular/core';
import { HomeLink } from '../home-link';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('link') link: HomeLink;

  constructor() { }

  ngOnInit(): void {
  }

}
