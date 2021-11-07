import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-tags',
  templateUrl: './type-tags.component.html',
  styleUrls: ['./type-tags.component.scss']
})
export class TypeTagsComponent implements OnInit {

  @Input()
  allActive = false;

  @Input()
  tags: string;
  activeTag: string;

  constructor() { }

  ngOnInit(): void {
  }

}
