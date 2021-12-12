import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneaTrifixStemsComponent } from './ennea-trifix-stems.component';

describe('EnneaTrifixStemsComponent', () => {
  let component: EnneaTrifixStemsComponent;
  let fixture: ComponentFixture<EnneaTrifixStemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneaTrifixStemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneaTrifixStemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
