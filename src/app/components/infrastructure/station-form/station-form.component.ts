import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Station} from "../../../shared/station";

@Component({
  selector: 'rop-station-form',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.scss']
})
  export class StationFormComponent implements OnInit {
  stationFormGroup: FormGroup;

  @Input() station?: Station;

  @Output() submitStation = new EventEmitter<Station>();

  constructor(private fb: FormBuilder) {
    this.stationFormGroup = this.fb.group({
      name: new FormControl('', Validators.required),
      rl100: new FormControl('', Validators.required),
      stationType: new FormControl('',Validators.required),
    })
  }

  ngOnInit(): void {
  }

  submitStationForm(value: Station) {
    this.submitStation.emit(value);
  }
}
