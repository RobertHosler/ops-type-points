import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsTypeLinksComponent } from './ops-type-links.component';

describe('OpsTypeLinksComponent', () => {
  let component: OpsTypeLinksComponent;
  let fixture: ComponentFixture<OpsTypeLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsTypeLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsTypeLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
