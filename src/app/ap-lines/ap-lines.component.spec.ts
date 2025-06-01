import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApLinesComponent } from './ap-lines.component';

describe('ApLinesComponent', () => {
  let component: ApLinesComponent;
  let fixture: ComponentFixture<ApLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApLinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
