import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocionicsReferenceComponent } from './socionics-reference.component';

describe('SocionicsReferenceComponent', () => {
  let component: SocionicsReferenceComponent;
  let fixture: ComponentFixture<SocionicsReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocionicsReferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocionicsReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
