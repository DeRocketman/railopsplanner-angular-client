import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TrackService} from "../../../services/track.service";
import {TrackGroupService} from "../../../services/track-group.service";
import {StationService} from "../../../services/station.service";
import {Track} from "../../../shared/track";
import {TrackGroup} from "../../../shared/track-group";
import {Station} from "../../../shared/station";
import {RailNetwork} from "../../../shared/rail-network";
import {map, switchMap} from "rxjs";
import {RailNetworkService} from "../../../services/rail-network.service";


@Component({
  selector: 'rop-track-create',
  templateUrl: './track-create.component.html',
  styleUrls: ['./track-create.component.scss']
})
export class TrackCreateComponent implements OnInit {
  railNetwork?: RailNetwork;

  constructor(
    private stationService: StationService,
    private trackService: TrackService,
    private trackGroupService: TrackGroupService,
    private railNetworkService: RailNetworkService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => this.railNetworkService.getSingle(id))
    )
      .subscribe(railNetwork => this.railNetwork = railNetwork);
  }

  createTrackGroup(track: Track) {
    let trackGroup: TrackGroup;

    track.name = track.startPoint.ds100+"-"+track.endPoint.ds100;
    trackGroup.name= track.name;
    trackGroup.railNetwork = this.railNetwork;

    this.trackGroupService.create(trackGroup).subscribe(
      (res) => {
        trackGroup = res;
        track.trackGroup = trackGroup;
        this.createTrack(track);
      }
    )
  }

  createTrack(track: Track) {
    let oppositeDirection = this.buildOppositeTrack(track);
    this.trackService.create(track).subscribe();
    this.trackService.create(oppositeDirection).subscribe()
  }

  buildOppositeTrack(track: Track): Track {
    let oppositeTrack: Track

    oppositeTrack = track.endPoint;
    oppositeTrack.endPoint = track.startPoint;
    oppositeTrack.name = oppositeTrack.startPoint.ds100+"-"+oppositeTrack.endPoint.ds100;
    oppositeTrack.positiveDirection = false;
    oppositeTrack.trackNumber = track.trackNumber;
    oppositeTrack.lines = track.lines;

    for (let i = track.crossStations.length-1; i >=0; i--) {
      oppositeTrack.crossStations.push(track.crossStations[i])
    }
    oppositeTrack.trackGroup = track.trackGroup;
    return oppositeTrack;
  }

  createStation(station: Station) {
    this.stationService.create(station).subscribe()
  }
}
