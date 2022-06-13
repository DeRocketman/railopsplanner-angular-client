import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableYearEditComponent } from './time-table-year-edit.component';

describe('TimeTableYearEditComponent', () => {
  let component: TimeTableYearEditComponent;
  let fixture: ComponentFixture<TimeTableYearEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableYearEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableYearEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
