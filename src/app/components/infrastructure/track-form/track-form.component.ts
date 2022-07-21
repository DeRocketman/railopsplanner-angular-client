import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Track} from "../../../shared/track";
import {StationService} from "../../../services/station.service";
import {RailNetwork} from "../../../shared/rail-network";


@Component({
  selector: 'rop-track-form',
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss']
})
export class TrackFormComponent implements OnInit, OnChanges {
  trackFormGroup: FormGroup;
  stationFormGroup: FormGroup;

  @Input() track?: Track;
  @Input() railNetwork?: RailNetwork;
  @Output() submitTrack = new EventEmitter<Track>();

  constructor(private fb: FormBuilder, private stationService: StationService) {
    this.trackFormGroup = this.fb.group({
      trackNumber: new FormControl('', Validators.required),
      lineNumber: new FormControl('', Validators.required),
      positiveDirection: new FormControl(true),
      startPoint: new FormControl('', Validators.required),
      endPoint: new FormControl('', Validators.required),
      crossStations: this.buildCrossStationsArray([''])
    })

    this.stationFormGroup = this.fb.group({
      name: new FormControl('', Validators.required),
      ds100: new FormControl('', Validators.required),
      stationType: new FormControl('Bahnhof', Validators.required),
      positionValue: new FormControl(0, Validators.required),
      transferTime: new FormControl(10, Validators.required)
    })

  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.track) {
      this.setFormValues(this.track)
    }
  }

  private setFormValues(track: Track) {
    this.trackFormGroup.patchValue(track)
    if (track.crossStations) {
      //this.trackFormGroup.setControl('crossSations')
    }
  }

  private buildCrossStationsArray(values: string[]): FormArray {
    return this.fb.array(values, Validators.required);
  }

  addTrackControl() {
    this.crossStations.push(this.fb.group(['']))
  }

  removeRailNetwork(i: number) {
    this.crossStations.removeAt(i);
    return false;
  }

  get crossStations(): FormArray {
    return this.trackFormGroup.get('crossStation') as FormArray;
  }

  submitTrackForm(value: Track) {

  }


}
