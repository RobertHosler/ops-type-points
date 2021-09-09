import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeRecordListComponent } from './type-record-list.component';

describe('TypeRecordListComponent', () => {
  let component: TypeRecordListComponent;
  let fixture: ComponentFixture<TypeRecordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeRecordListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
