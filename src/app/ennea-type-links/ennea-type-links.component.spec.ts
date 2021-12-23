import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneaTypeLinksComponent } from './ennea-type-links.component';

describe('EnneaTypeLinksComponent', () => {
  let component: EnneaTypeLinksComponent;
  let fixture: ComponentFixture<EnneaTypeLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneaTypeLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneaTypeLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
