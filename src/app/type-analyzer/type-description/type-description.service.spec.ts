import { TestBed } from '@angular/core/testing';

import { TypeDescriptionService } from './type-description.service';

describe('TypeDescriptionService', () => {
  let service: TypeDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
