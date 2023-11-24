import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsSocialTypeComponent } from './ops-social-type.component';

describe('OpsSocialTypeComponent', () => {
  let component: OpsSocialTypeComponent;
  let fixture: ComponentFixture<OpsSocialTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsSocialTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsSocialTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
