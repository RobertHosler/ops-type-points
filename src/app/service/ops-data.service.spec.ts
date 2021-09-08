import { TestBed } from '@angular/core/testing';

import { OpsDataService } from './ops-data.service';

describe('OpsDataService', () => {
  let service: OpsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
