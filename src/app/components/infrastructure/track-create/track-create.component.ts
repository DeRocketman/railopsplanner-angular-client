import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TrackService} from "../../../services/track.service";
import {TrackGroupService} from "../../../services/track-group.service";
import {StationService} from "../../../services/station.service";
import {Track} from "../../../shared/track";
import {TrackGroup} from "../../../shared/track-group";
import {Station} from "../../../shared/station";
import {TrackStationService} from "../../../services/track-station.service";


@Component({
  selector: 'rop-track-create',
  templateUrl: './track-create.component.html',
  styleUrls: ['./track-create.component.scss']
})
export class TrackCreateComponent implements OnInit {
  constructor(
    private stationService: StationService,
    private trackService: TrackService,
    private trackGroupService: TrackGroupService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  createInfrastructure(track: Track) {
    let oppositeDirectionTrack: Track = this.buildOppositeTrack(track);
    let trackGroup: TrackGroup = {id:'to_create', name: track.name, tracks: []};
    trackGroup.tracks.push(track);
    trackGroup.tracks.push(oppositeDirectionTrack)
    this.trackGroupService.create(trackGroup).subscribe((res) => {
      console.log("response create track Group:" + res);
    });
  }

  buildOppositeTrack(track: Track): Track {
    let oppositeTrack: Track = {
      ...track
    };
    oppositeTrack.positiveDirection = false;
    oppositeTrack.name = oppositeTrack.endPoint.rl100+'-'+oppositeTrack.startPoint.rl100;
    return  oppositeTrack;
  }
}
