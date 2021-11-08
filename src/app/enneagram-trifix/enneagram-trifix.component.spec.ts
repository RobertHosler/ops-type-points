import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneagramTrifixComponent } from './enneagram-trifix.component';

describe('EnneagramTrifixComponent', () => {
  let component: EnneagramTrifixComponent;
  let fixture: ComponentFixture<EnneagramTrifixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneagramTrifixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneagramTrifixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
