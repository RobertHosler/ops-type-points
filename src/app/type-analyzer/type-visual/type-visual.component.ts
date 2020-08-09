import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-type-visual',
  templateUrl: './type-visual.component.html',
  styleUrls: ['./type-visual.component.css'],
})
export class TypeVisualComponent implements OnInit {
  @Input() opsCode: string;

  optToyLink: string;

  constructor() {}

  ngOnInit(): void {
    var base = 'https://opt-toy.now.sh/#?type[]=';
    this.optToyLink = base + this.opsCode;
  }
}
