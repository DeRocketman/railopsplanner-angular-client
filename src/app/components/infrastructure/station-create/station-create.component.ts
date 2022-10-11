import { Component, OnInit } from '@angular/core';
import {Station} from "../../../shared/station";
import {StationService} from "../../../services/station.service";

@Component({
  selector: 'rop-station-create',
  templateUrl: './station-create.component.html',
  styleUrls: ['./station-create.component.scss']
})
export class StationCreateComponent implements OnInit {

  constructor(private stationService: StationService) { }

  ngOnInit(): void {
  }

  createStation(station: Station) {
    this.stationService.create(station).subscribe();
  }
}
