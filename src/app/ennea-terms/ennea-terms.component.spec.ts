import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneaTermsComponent } from './ennea-terms.component';

describe('EnneaTermsComponent', () => {
  let component: EnneaTermsComponent;
  let fixture: ComponentFixture<EnneaTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneaTermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneaTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
