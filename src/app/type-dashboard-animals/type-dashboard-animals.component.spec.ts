import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDashboardAnimalsComponent } from './type-dashboard-animals.component';

describe('TypeDashboardAnimalsComponent', () => {
  let component: TypeDashboardAnimalsComponent;
  let fixture: ComponentFixture<TypeDashboardAnimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeDashboardAnimalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDashboardAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
