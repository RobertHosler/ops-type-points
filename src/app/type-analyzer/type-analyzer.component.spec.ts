import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAnalyzerComponent } from './type-analyzer.component';

describe('TypeAnalyzerComponent', () => {
  let component: TypeAnalyzerComponent;
  let fixture: ComponentFixture<TypeAnalyzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeAnalyzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
