import { Component, OnInit, Input } from '@angular/core';
import { Function } from '../function.model';
import { Animal } from '../animal';

@Component({
  selector: 'app-type-dashboard',
  templateUrl: './type-dashboard.component.html',
  styleUrls: ['./type-dashboard.component.css']
})
export class TypeDashboardComponent implements OnInit {

  @Input('functions') functions: Function[] = new Array<Function>();
  @Input('animals') animals: Animal[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
