import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TimeTableYear} from "../../../shared/time-table-year";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RailNetwork} from "../../../shared/rail-network";

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
    this.ttyForm = this.fb.group(
      {
          name: [''],
          firstDate: [''],
          lastDate: ['']
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
  }

  private buildRailNetworksArray(values: RailNetwork[]): FormArray {
    return this.fb.array(
      values.map(rn => this.fb.group(rn))
    );
  }

  get railNetworks(): FormArray {
    return this.ttyForm.get('railNetworks') as FormArray;
  }

  addRailNetworkControl() {
    this.railNetworks.push(this.fb.group({
      name: '',
      abbreviation:'',
    }))
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
