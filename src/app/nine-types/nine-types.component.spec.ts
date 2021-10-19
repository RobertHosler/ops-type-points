import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NineTypesComponent } from './nine-types.component';

describe('NineTypesComponent', () => {
  let component: NineTypesComponent;
  let fixture: ComponentFixture<NineTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NineTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NineTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
