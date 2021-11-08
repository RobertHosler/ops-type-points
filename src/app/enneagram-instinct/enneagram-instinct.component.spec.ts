import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneagramInstinctComponent } from './enneagram-instinct.component';

describe('EnneagramInstinctComponent', () => {
  let component: EnneagramInstinctComponent;
  let fixture: ComponentFixture<EnneagramInstinctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneagramInstinctComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneagramInstinctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
