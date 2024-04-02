import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApSextaComponent } from './ap-sexta.component';

describe('ApSextaComponent', () => {
  let component: ApSextaComponent;
  let fixture: ComponentFixture<ApSextaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApSextaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApSextaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
