import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnneaDaaChronologicalComponent } from './ennea-daa-chronological.component';

describe('EnneaDaaChronologicalComponent', () => {
  let component: EnneaDaaChronologicalComponent;
  let fixture: ComponentFixture<EnneaDaaChronologicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnneaDaaChronologicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnneaDaaChronologicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
