import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneaTriadsComponent } from './ennea-triads.component';

describe('EnneaTriadsComponent', () => {
  let component: EnneaTriadsComponent;
  let fixture: ComponentFixture<EnneaTriadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneaTriadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneaTriadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
