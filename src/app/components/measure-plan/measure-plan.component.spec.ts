import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurePlanComponent } from './measure-plan.component';

describe('MeasurePlanComponent', () => {
  let component: MeasurePlanComponent;
  let fixture: ComponentFixture<MeasurePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurePlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
