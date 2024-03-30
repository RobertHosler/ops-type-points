import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApDescriptionComponent } from './ap-description.component';

describe('ApDescriptionComponent', () => {
  let component: ApDescriptionComponent;
  let fixture: ComponentFixture<ApDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
