import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RailNetworkFormComponent } from './rail-network-form.component';

describe('RailNetworkFormComponent', () => {
  let component: RailNetworkFormComponent;
  let fixture: ComponentFixture<RailNetworkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RailNetworkFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RailNetworkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
