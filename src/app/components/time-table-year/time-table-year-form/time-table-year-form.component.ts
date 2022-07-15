import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {TimeTableYear} from "../../../shared/time-table-year";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PlanningPeriod} from "../../../shared/planning-period";
import {TimeTableYearService} from "../../../services/time-table-year.service";

@Component({
  selector: 'rop-time-table-year-form',
  templateUrl: './time-table-year-form.component.html',
  styleUrls: ['./time-table-year-form.component.scss']
})
export class TimeTableYearFormComponent {
  ttyForm: FormGroup;
  railNetworksArray: FormArray;
  planningPeriodsArray: FormArray;

  @Input() timeTableYear?: TimeTableYear;

  @Output() submitTimeTableYear = new EventEmitter<TimeTableYear>();

  constructor(private fb: FormBuilder, private ttyService: TimeTableYearService) {
    this.ttyForm = this.fb.group({
          name: [''],
          firstDate: [''],
          lastDate: [''],
          railNetworks: fb.array([
            this.createRailNetworkControl()
          ]),
          planningPeriods: fb.array([
            this.createPlanningPeriodsControl()
          ]),
    });
    this.railNetworksArray = <FormArray>this.ttyForm.controls['railNetworks'];
    this.planningPeriodsArray = <FormArray>this.ttyForm.controls['planningPeriods'];

    this.ttyForm.valueChanges.subscribe((value) =>
    Object.assign(this.timeTableYear, value))
  }

  private createRailNetworkControl(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      abbreviation: new FormControl(''),
    });
  }

  private createPlanningPeriodsControl(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      start: new FormControl(['']),
      end: new FormControl([''])
    });
  }

  addRailNetwork() {
    this.railNetworksArray.push(this.createRailNetworkControl());
  }

  addPlanningPeriods() {
    this.planningPeriodsArray.push(this.createPlanningPeriodsControl());
  }

  removeRailNetwork(i: number) {
    this.railNetworksArray.removeAt(i);
    return false;
  }

  removePlanningPeriod(i: number) {
    this.planningPeriodsArray.removeAt(i);
    return false;
  }

  get railNetworks(): FormArray {
    return this.ttyForm.get('railNetworks') as FormArray;
  }

  get planningPeriods(): FormArray {
    return this.ttyForm.get('planningPeriods') as FormArray;
  }

  addPlanningPeriodsControl() {
    this.planningPeriods.push(this.fb.group({
      name: '',
      start: '',
      end: ''
    }));
  }

  submitForm(value: TimeTableYear) {
    const id= this.timeTableYear ? this.timeTableYear.id : "TO GENERATE";
    value.id = id;

    for (let i = 0; i < value.railNetworks.length; i++) {
      if (value.railNetworks[i] == null || value.railNetworks[i].name == null || value.railNetworks[i].name == '') {
        delete value.railNetworks[i];
        console.log("Leeres Netz gelöscht");
      }
    }

    for (let i = 0; i < value.planningPeriods.length; i++) {
      if (value.planningPeriods[i] == null || value.planningPeriods[i].name == null || value.planningPeriods[i].name == '') {
        console.log("Leere Periode gelöscht");
        delete value.planningPeriods[i];
      }
    }

    this.submitTimeTableYear.emit(value);
    this.ttyForm.reset();

  }


}
