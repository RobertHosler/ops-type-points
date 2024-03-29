import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypeBubblesComponent } from './type-bubbles.component';

describe('TypeBubblesComponent', () => {
  let component: TypeBubblesComponent;
  let fixture: ComponentFixture<TypeBubblesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeBubblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
