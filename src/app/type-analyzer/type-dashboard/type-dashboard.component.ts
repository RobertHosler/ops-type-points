import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-type-dashboard',
  templateUrl: './type-dashboard.component.html',
  styleUrls: ['./type-dashboard.component.css']
})
export class TypeDashboardComponent implements OnInit {

  @Input('functions') functions: Function[] = new Array<Function>();
  @Input('animals') animals: { animal: string; savior: string }[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
