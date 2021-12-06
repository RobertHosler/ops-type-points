import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneaDescriptionComponent } from './ennea-description.component';

describe('EnneaDescriptionComponent', () => {
  let component: EnneaDescriptionComponent;
  let fixture: ComponentFixture<EnneaDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneaDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneaDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
