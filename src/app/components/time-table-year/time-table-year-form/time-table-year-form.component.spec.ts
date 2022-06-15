import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableYearFormComponent } from './time-table-year-form.component';

describe('TimeTableYearFormComponent', () => {
  let component: TimeTableYearFormComponent;
  let fixture: ComponentFixture<TimeTableYearFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableYearFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableYearFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
