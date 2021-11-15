import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsTypeAnimalComponent } from './ops-type-animal.component';

describe('OpsTypeAnimalComponent', () => {
  let component: OpsTypeAnimalComponent;
  let fixture: ComponentFixture<OpsTypeAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsTypeAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpsTypeAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
