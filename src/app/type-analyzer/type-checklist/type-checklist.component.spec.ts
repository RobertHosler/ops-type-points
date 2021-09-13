import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeChecklistComponent } from './type-checklist.component';

describe('TypeChecklistComponent', () => {
  let component: TypeChecklistComponent;
  let fixture: ComponentFixture<TypeChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
