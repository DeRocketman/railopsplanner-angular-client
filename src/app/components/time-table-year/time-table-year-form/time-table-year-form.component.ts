import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {TimeTableYear} from "../../../shared/time-table-year";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {RailNetwork} from "../../../shared/rail-network";
import {PlanningPeriod} from "../../../shared/planning-period";

@Component({
  selector: 'rop-time-table-year-form',
  templateUrl: './time-table-year-form.component.html',
  styleUrls: ['./time-table-year-form.component.scss']
})
export class TimeTableYearFormComponent implements OnInit, OnChanges {
  ttyForm: FormGroup;

  @Input() timeTableYear?: TimeTableYear;

  @Input() set editing(isEditing: boolean) {
    const idControl = this.ttyForm.get('id')!;
    if(isEditing) {
      idControl.disable();
    } else {
      idControl.enable();
    }
  };

  @Output() submitTimeTableYear = new EventEmitter<TimeTableYear>();

  constructor(private fb: FormBuilder) {
    this.ttyForm = this.fb.group({
          name: [''],
          firstDate: [''],
          lastDate: [''],
          railNetworks: this.buildRailNetworksArray([
            { name: '', abbreviation: ''}
          ]),
          planningPeriods: this.buildPlanningPeriodsArray([
            { name:'',}
          ]),
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.timeTableYear) {
      this.setFormValues(this.timeTableYear);
    }
  }

  private setFormValues(tty: TimeTableYear) {
    this.ttyForm.patchValue(tty);

    if (tty.railNetworks) {
      this.ttyForm.setControl(
        "railNetworks",
        this.buildRailNetworksArray(tty.railNetworks)
      );
    }

    if (tty.planningPeriods) {
      this.ttyForm.setControl(
        "planningPeriods",
        this.buildPlanningPeriodsArray(tty.planningPeriods)
      )
    }
  }

  private buildRailNetworksArray(values: RailNetwork[]): FormArray {
    return this.fb.array(
      values.map(rn => this.fb.group(rn))
    );
  }

  private buildPlanningPeriodsArray(values: PlanningPeriod[]): FormArray {
    return this.fb.array(
      values.map(pp => this.fb.group(pp))
    );
  }

  get railNetworks(): FormArray {
    return this.ttyForm.get('railNetworks') as FormArray;
  }

  get planningPeriods(): FormArray {
    return this.ttyForm.get('planningPeriods') as FormArray;
  }

  addRailNetworkControl() {
    this.railNetworks.push(
      this.fb.group({ name: '', abbreviation:'', })
    );
  }

  addPlanningPeriodsControl() {
    this.planningPeriods.push(this.fb.group({
      name: '',
      start: '',
      end: ''
    }));
  }

  submitForm() {
    const formValue = this.ttyForm.value;
    const id = this.timeTableYear ? this.timeTableYear.id : formValue.id;

    const newTimeTableYear: TimeTableYear = {
      ...formValue,
      id,
      //railNetworks,
    };
  }
}
