import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsTypeTwinsComponent } from './ops-type-twins.component';

describe('OpsTypeTwinsComponent', () => {
  let component: OpsTypeTwinsComponent;
  let fixture: ComponentFixture<OpsTypeTwinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsTypeTwinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsTypeTwinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
