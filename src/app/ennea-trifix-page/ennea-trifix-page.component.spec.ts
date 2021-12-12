import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneaTrifixPageComponent } from './ennea-trifix-page.component';

describe('EnneaTrifixPageComponent', () => {
  let component: EnneaTrifixPageComponent;
  let fixture: ComponentFixture<EnneaTrifixPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneaTrifixPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneaTrifixPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
