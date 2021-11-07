import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTagsComponent } from './type-tags.component';

describe('TypeTagsComponent', () => {
  let component: TypeTagsComponent;
  let fixture: ComponentFixture<TypeTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
