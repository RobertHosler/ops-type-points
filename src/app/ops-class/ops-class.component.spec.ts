import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsClassComponent } from './ops-class.component';

describe('OpsClassComponent', () => {
  let component: OpsClassComponent;
  let fixture: ComponentFixture<OpsClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
