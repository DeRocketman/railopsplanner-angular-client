import { TestBed } from '@angular/core/testing';

import { PlanningPeriodService } from './planning-period.service';

describe('PlanningPeriodService', () => {
  let service: PlanningPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanningPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
