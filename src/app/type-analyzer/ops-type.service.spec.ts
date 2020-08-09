import { TestBed } from '@angular/core/testing';

import { OpsTypeService } from './ops-type.service';

describe('OpsTypeService', () => {
  let service: OpsTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpsTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
