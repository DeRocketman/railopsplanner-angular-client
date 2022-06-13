import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableYearListComponent } from './time-table-year-list.component';

describe('TimeTableYearListComponent', () => {
  let component: TimeTableYearListComponent;
  let fixture: ComponentFixture<TimeTableYearListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableYearListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableYearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
