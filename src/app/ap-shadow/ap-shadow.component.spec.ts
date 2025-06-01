import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApShadowComponent } from './ap-shadow.component';

describe('ApShadowComponent', () => {
  let component: ApShadowComponent;
  let fixture: ComponentFixture<ApShadowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApShadowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApShadowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
