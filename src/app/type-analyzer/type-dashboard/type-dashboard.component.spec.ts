import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDashboardComponent } from './type-dashboard.component';

describe('TypeDashboardComponent', () => {
  let component: TypeDashboardComponent;
  let fixture: ComponentFixture<TypeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
