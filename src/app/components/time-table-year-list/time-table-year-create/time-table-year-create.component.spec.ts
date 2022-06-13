import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableYearCreateComponent } from './time-table-year-create.component';

describe('TimeTableYearCreateComponent', () => {
  let component: TimeTableYearCreateComponent;
  let fixture: ComponentFixture<TimeTableYearCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableYearCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableYearCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
