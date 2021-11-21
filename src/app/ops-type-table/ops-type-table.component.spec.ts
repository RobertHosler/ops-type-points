import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsTypeTableComponent } from './ops-type-table.component';

describe('OpsTypeTableComponent', () => {
  let component: OpsTypeTableComponent;
  let fixture: ComponentFixture<OpsTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsTypeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
