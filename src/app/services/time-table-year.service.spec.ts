import { TestBed } from '@angular/core/testing';

import { TimeTableYearService } from './time-table-year.service';

describe('TimeTableYearService', () => {
  let service: TimeTableYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTableYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
