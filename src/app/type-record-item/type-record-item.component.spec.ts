import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRecordItemComponent } from './type-record-item.component';

describe('TypeRecordItemComponent', () => {
  let component: TypeRecordItemComponent;
  let fixture: ComponentFixture<TypeRecordItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeRecordItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRecordItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
