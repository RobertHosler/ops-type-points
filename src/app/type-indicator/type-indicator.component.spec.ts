import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeIndicatorComponent } from './type-indicator.component';

describe('TypeIndicatorComponent', () => {
  let component: TypeIndicatorComponent;
  let fixture: ComponentFixture<TypeIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
