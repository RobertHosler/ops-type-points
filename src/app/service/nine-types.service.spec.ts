import { TestBed } from '@angular/core/testing';

import { NineTypesService } from './nine-types.service';

describe('NineTypesService', () => {
  let service: NineTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NineTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
