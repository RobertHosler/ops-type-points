import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneagramTypeComponent } from './enneagram-type.component';

describe('EnneagramTypeComponent', () => {
  let component: EnneagramTypeComponent;
  let fixture: ComponentFixture<EnneagramTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneagramTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneagramTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
