import { TestBed } from '@angular/core/testing';

import { RailNetworkService } from './rail-network.service';

describe('RailNetworkService', () => {
  let service: RailNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RailNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
