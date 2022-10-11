import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyCheckComponent } from './duty-check.component';

describe('DutyCheckComponent', () => {
  let component: DutyCheckComponent;
  let fixture: ComponentFixture<DutyCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
