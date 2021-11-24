import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneagramTrifixCombinationComponent } from './enneagram-trifix-combination.component';

describe('EnneagramTrifixCombinationComponent', () => {
  let component: EnneagramTrifixCombinationComponent;
  let fixture: ComponentFixture<EnneagramTrifixCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneagramTrifixCombinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneagramTrifixCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
