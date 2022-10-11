import { TestBed } from '@angular/core/testing';

import { RailmlToRopService } from './railml-to-rop.service';

describe('RailmlToRopService', () => {
  let service: RailmlToRopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RailmlToRopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
