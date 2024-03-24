import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApSummaryComponent } from './ap-summary.component';

describe('ApSummaryComponent', () => {
  let component: ApSummaryComponent;
  let fixture: ComponentFixture<ApSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
