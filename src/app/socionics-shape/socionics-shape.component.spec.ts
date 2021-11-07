import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocionicsShapeComponent } from './socionics-shape.component';

describe('SocionicsShapeComponent', () => {
  let component: SocionicsShapeComponent;
  let fixture: ComponentFixture<SocionicsShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocionicsShapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocionicsShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
