import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableYearListItemComponent } from './time-table-year-list-item.component';

describe('TimeTableYearListItemComponent', () => {
  let component: TimeTableYearListItemComponent;
  let fixture: ComponentFixture<TimeTableYearListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableYearListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableYearListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
