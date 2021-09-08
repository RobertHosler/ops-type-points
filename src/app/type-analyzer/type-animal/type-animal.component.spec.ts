import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypeAnimalComponent } from './type-animal.component';

describe('TypeAnimalComponent', () => {
  let component: TypeAnimalComponent;
  let fixture: ComponentFixture<TypeAnimalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
