import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneaTypeTwinsComponent } from './ennea-type-twins.component';

describe('EnneaTypeTwinsComponent', () => {
  let component: EnneaTypeTwinsComponent;
  let fixture: ComponentFixture<EnneaTypeTwinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneaTypeTwinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneaTypeTwinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
