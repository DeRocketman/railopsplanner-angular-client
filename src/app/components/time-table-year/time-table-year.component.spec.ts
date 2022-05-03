import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableYearComponent } from './time-table-year.component';

describe('TimeTableYearComponent', () => {
  let component: TimeTableYearComponent;
  let fixture: ComponentFixture<TimeTableYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
