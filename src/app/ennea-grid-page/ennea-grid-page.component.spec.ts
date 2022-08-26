import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneaGridPageComponent } from './ennea-grid-page.component';

describe('EnneaGridPageComponent', () => {
  let component: EnneaGridPageComponent;
  let fixture: ComponentFixture<EnneaGridPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneaGridPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneaGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
