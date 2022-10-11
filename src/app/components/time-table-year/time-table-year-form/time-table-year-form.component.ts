import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {TimeTableYear} from "../../../shared/time-table-year";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PlanningPeriod} from "../../../shared/planning-period";
import {RailNetwork} from "../../../shared/rail-network";
import {RailmlToRopService} from "../../../services/railml-to-rop.service";

@Component({
  selector: 'rop-time-table-year-form',
  templateUrl: './time-table-year-form.component.html',
  styleUrls: ['./time-table-year-form.component.scss']
})
export class TimeTableYearFormComponent implements OnChanges{
  timeTableYearFormGroup: FormGroup;

  @Input() timeTableYear?: TimeTableYear;

  @Output() submitTimeTableYear = new EventEmitter<TimeTableYear>();

  constructor(private fb: FormBuilder, private railmlToRopService:RailmlToRopService) {
    this.timeTableYearFormGroup = this.fb.group({
          name: new FormControl('', Validators.required),
          firstDate: new FormControl(new Date().toLocaleDateString(), Validators.required),
          lastDate: [new Date().toLocaleDateString, Validators.required],
          railNetworks: this.buildRailNetworksArray([
              {name:'', abbreviation:''}
          ]),
          planningPeriods: this.buildPlanningPeriodsArray([
            {name:'', start: new Date().toLocaleDateString(), end: new Date().toLocaleDateString()}
          ]),
    });
  }

  ngOnChanges() {
    if(this.timeTableYear) {
      this.setFormValues(this.timeTableYear);
    }
  }

  private setFormValues(tty: TimeTableYear) {
    this.timeTableYearFormGroup.patchValue(tty);
    if (tty.railNetworks) {
      this.timeTableYearFormGroup.setControl(
        'railNetworks',
        this.buildRailNetworksArray(tty.railNetworks)
      );
    }

    if (tty.planningPeriods) {
      this.timeTableYearFormGroup.setControl(
        'planningPeriods',
        this.buildRailNetworksArray(tty.planningPeriods)
      );
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

  addRailNetworkControl() {
    this.railNetworks.push(this.fb.group( {name:'', abbreviation:''}));
  }

  addPlanningPeriodsControl() {
    this.planningPeriods.push(this.fb.group({name:'', start: new Date().toLocaleDateString(), end: new Date().toLocaleDateString()}));
  }

  removeRailNetwork(i: number) {
    this.railNetworks.removeAt(i);
    return false;
  }

  removePlanningPeriod(j: number) {
    this.planningPeriods.removeAt(j);
    return false;
  }

  get railNetworks(): FormArray {
    return this.timeTableYearFormGroup.get('railNetworks') as FormArray;
  }

  get planningPeriods(): FormArray {
    return this.timeTableYearFormGroup.get('planningPeriods') as FormArray;
  }

  loadRailmlFile(e): void {
    let file = e.target.files[0];
    let fr: FileReader = new FileReader();
    fr.onloadend = (e) => {
      this.railmlToRopService.importRML(fr.result.toString())
    }
    fr.readAsText(file);
  }

  submitForm(value: TimeTableYear) {
    value.id = this.timeTableYear ? this.timeTableYear.id : "TO GENERATE";
    for (let i = 0; i < value.railNetworks.length; i++) {
      if (value.railNetworks[i] == null || value.railNetworks[i].name == null || value.railNetworks[i].name == '') {
        delete value.railNetworks[i];
      }
    }

    for (let i = 0; i < value.planningPeriods.length; i++) {
      if (value.planningPeriods[i] == null || value.planningPeriods[i].name == null || value.planningPeriods[i].name == '') {
       delete value.planningPeriods[i];
      }
    }

    this.submitTimeTableYear.emit(value);
    this.timeTableYearFormGroup.reset();
  }


}
