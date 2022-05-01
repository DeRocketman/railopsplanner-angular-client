import { TestBed } from '@angular/core/testing';

import { MeasureExistsValidatorService } from './measure-exists-validator.service';

describe('MeasureExistsValidatorService', () => {
  let service: MeasureExistsValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasureExistsValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
