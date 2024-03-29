import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApFunctionsComponent } from './ap-functions.component';

describe('ApFunctionsComponent', () => {
  let component: ApFunctionsComponent;
  let fixture: ComponentFixture<ApFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApFunctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
