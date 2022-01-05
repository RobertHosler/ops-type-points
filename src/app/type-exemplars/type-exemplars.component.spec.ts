import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeExemplarsComponent } from './type-exemplars.component';

describe('TypeExemplarsComponent', () => {
  let component: TypeExemplarsComponent;
  let fixture: ComponentFixture<TypeExemplarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeExemplarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeExemplarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
