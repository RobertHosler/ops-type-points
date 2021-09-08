import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypePointsComponent } from './type-points.component';

describe('TypePointsComponent', () => {
  let component: TypePointsComponent;
  let fixture: ComponentFixture<TypePointsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypePointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
