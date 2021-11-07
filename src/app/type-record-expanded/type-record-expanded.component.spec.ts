import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRecordExpandedComponent } from './type-record-expanded.component';

describe('TypeRecordExpandedComponent', () => {
  let component: TypeRecordExpandedComponent;
  let fixture: ComponentFixture<TypeRecordExpandedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeRecordExpandedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRecordExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
