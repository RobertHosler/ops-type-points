import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeQuizComponent } from './type-quiz.component';

describe('TypeQuizComponent', () => {
  let component: TypeQuizComponent;
  let fixture: ComponentFixture<TypeQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
