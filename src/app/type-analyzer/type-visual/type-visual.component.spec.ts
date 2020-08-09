import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeVisualComponent } from './type-visual.component';

describe('TypeVisualComponent', () => {
  let component: TypeVisualComponent;
  let fixture: ComponentFixture<TypeVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
