import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneaTypeCalculatorComponent } from './ennea-type-calculator.component';

describe('EnneaTypeCalculatorComponent', () => {
  let component: EnneaTypeCalculatorComponent;
  let fixture: ComponentFixture<EnneaTypeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneaTypeCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneaTypeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
