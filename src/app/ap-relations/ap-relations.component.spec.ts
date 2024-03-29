import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApRelationsComponent } from './ap-relations.component';

describe('ApRelationsComponent', () => {
  let component: ApRelationsComponent;
  let fixture: ComponentFixture<ApRelationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApRelationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApRelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
