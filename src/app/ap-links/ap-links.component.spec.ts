import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApLinksComponent } from './ap-links.component';

describe('ApLinksComponent', () => {
  let component: ApLinksComponent;
  let fixture: ComponentFixture<ApLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
