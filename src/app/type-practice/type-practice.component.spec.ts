import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePracticeComponent } from './type-practice.component';

describe('TypePracticeComponent', () => {
  let component: TypePracticeComponent;
  let fixture: ComponentFixture<TypePracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
