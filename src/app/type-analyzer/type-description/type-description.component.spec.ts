import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDescriptionComponent } from './type-description.component';

describe('TypeDescriptionComponent', () => {
  let component: TypeDescriptionComponent;
  let fixture: ComponentFixture<TypeDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
