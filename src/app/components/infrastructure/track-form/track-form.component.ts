import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Track} from "../../../shared/track";
import {StationService} from "../../../services/station.service";
import {Station} from "../../../shared/station";
import {TrackStation} from "../../../shared/track-station";


@Component({
  selector: 'rop-track-form',
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss']
})
export class TrackFormComponent implements OnInit, OnChanges {
  trackFormGroup: FormGroup;
  stations: Station[];

  @Input() track?: Track;
  @Output() submitTrack = new EventEmitter<Track>();

  constructor(private fb: FormBuilder, private stationService: StationService) {
    this.trackFormGroup = this.fb.group({
      trackNumber: new FormControl('', Validators.required),
      lineNumber: new FormControl('', Validators.required),
      positiveDirection: new FormControl(true),
      startPoint: new FormGroup({
        id: new FormControl(''),
        positionValue: new FormControl(0, [Validators.min(0), Validators.required]),
        transferTime: new FormControl(10, [Validators.min(0), Validators.required]),
        railReplacementStop: new FormControl(true),
        railReplacementDrivingTime: new FormControl(0, [Validators.min(0), Validators.required])
      }),
      endPoint: new FormGroup({
        id: new FormControl(''),
        positionValue: new FormControl(0, [Validators.min(0), Validators.required]),
        transferTime: new FormControl(10, [Validators.min(0), Validators.required]),
        railReplacementStop: new FormControl(true),
        railReplacementDrivingTime: new FormControl(0, [Validators.min(0), Validators.required])
      }),
      crossStations: this.buildStationsArray([{id:'', positionValue: 0, transferTime: 10, railReplacementStop: true, railReplacementDrivingTime: 10}])
    })
  }

  ngOnInit(): void {
    this.stationService.getAll().subscribe((res) => this.stations = res);
  }

  ngOnChanges() {
    if (this.track) {
      this.setFormValues(this.track)
    }
  }

  private setFormValues(trackFormObject: Track) {

  }

  private buildStationsArray(values: TrackStation[]): FormArray {
    return this.fb.array(values.map(s => this.fb.group(s)));
  }


  get crossStations(): FormArray {
    return this.trackFormGroup.get('crossStations') as FormArray;
  }

  addCrossStation(): void {
    this.crossStations.push(
      this.fb.group({id:'', positionValue: 0, transferTime: 10, railReplacementStop: true, railReplacementDrivingTime: 10})
    );
  }

  removeCrossStation(i: number): void {
    this.crossStations.removeAt(i);
  }

  submitTrackForm(value: Track) {
    value.id = this.track ? this.track.id : "TO_GENERATE";
    let track: Track = {
      ...value
    }
    let currentCount = 1;

    for (let station of this.stations) {
      for (let trackStation of track.crossStations) {
        if (station.id === trackStation.id) {
          trackStation.currentNumber = currentCount;
          trackStation.name = station.name;
          trackStation.rl100 = station.rl100;
          trackStation.stationType = station.stationType;
          trackStation.id = "TO_GENERATE";
          currentCount++
        }
        if (track.startPoint.id === station.id) {
          track.startPoint.currentNumber = 0;
          track.startPoint.name = station.name;
          track.startPoint.rl100 = station.rl100;
          track.startPoint.stationType = station.stationType;
          track.startPoint.id = "TO_GENERATE";
        }
        if (track.endPoint.id === station.id) {
          track.startPoint.currentNumber = value.crossStations.length;
          track.startPoint.name = station.name;
          track.startPoint.rl100 = station.rl100;
          track.startPoint.stationType = station.stationType;
          track.startPoint.id = "TO_GENERATE";
        }
      }
    }
    track.name = track.startPoint.rl100+"-"+track.endPoint.rl100
    this.submitTrack.emit(track);
    this.trackFormGroup.reset();
  }
}
