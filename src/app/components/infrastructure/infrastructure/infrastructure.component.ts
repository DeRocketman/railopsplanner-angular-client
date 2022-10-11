import {Component, OnChanges, OnInit} from '@angular/core';
import {StationService} from "../../../services/station.service";
import {Station} from "../../../shared/station";
import {TrackGroupService} from "../../../services/track-group.service";
import {TrackGroup} from "../../../shared/track-group";
import {Track} from "../../../shared/track";


@Component({
  selector: 'rop-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.scss']
})
export class InfrastructureComponent implements OnInit, OnChanges {
  trackGroups: TrackGroup[] = [];
  tracks: Track[] = [];
  stations: Station[] = [];
  displayedColumns= ["name", "rl100", "stationType"];

  constructor(private trackGroupService: TrackGroupService, private stationService: StationService) { }

  ngOnInit(): void {
    this.stationService.getAll().subscribe((res) => {
      this.stations = res;
    })
    this.trackGroupService.getAll().subscribe((res) => {
      this.trackGroups = res;
      for (let groups of this.trackGroups) {
        for (let track of groups.tracks) {
          if (track.positiveDirection === true) {
            this.tracks.push(track);
          }
        }
      }
    });
  }

  ngOnChanges(): void {
  }
}
