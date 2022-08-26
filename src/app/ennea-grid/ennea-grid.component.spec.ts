import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneaGridComponent } from './ennea-grid.component';

describe('EnneaGridComponent', () => {
  let component: EnneaGridComponent;
  let fixture: ComponentFixture<EnneaGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneaGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
