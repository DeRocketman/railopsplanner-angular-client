import {Injectable, OnInit} from '@angular/core';
import {Station} from "../shared/station";
import {StationService} from "./station.service";
import {Track} from "../shared/track";
import {TrackGroup} from "../shared/track-group";
import {TimeTableYear} from "../shared/time-table-year";
import {TrackStation} from "../shared/track-station";

@Injectable({
  providedIn: 'root'
})
export class RailmlToRopService implements OnInit{
  stations: Station[] = [];
  timeTableYears: TimeTableYear [] = [];
  domParser: DOMParser;
  constructor(private stationService: StationService) {
    this.domParser = new DOMParser();
  }

  ngOnInit(): void {
    this.stationService.getAll().subscribe((res)=> this.stations = res)
  }
  public importRML(frResult: string): void {
    let xmlDom = this.domParser.parseFromString(frResult, "text/xml");
    this.createStations(xmlDom.querySelectorAll("ocp"))
    this.createInfrastructure(xmlDom);
    this.createTimeTableYear(xmlDom);
  }

  private createStations(elementNodeListOf: NodeListOf<Element>): void {
    let ocps = elementNodeListOf;
    for (let i = 0; i<ocps.length; i++) {
      for (let storedStation of this.stations) {
        if (ocps[i].getAttribute("abbreviation") === storedStation.rl100) {
          delete ocps[i];
        }
      }
    }
    for (let i = 0; i<ocps.length; i++) {
      if (ocps[i].querySelector("propService").getAttribute("passenger") === "true") {
        let station: Station = {name: '', rl100: '', stationType: 'Haltepunkt'};
        station.name = ocps[i].getAttribute('name');
        station.rl100 = ocps[i].getAttribute('abbreviation');
        if (ocps[i].querySelector("propOperational").getAttribute("operationalType") === "station") {
          station.stationType = "Bahnhof";
        }
        this.stationService.create(station).subscribe((res) => this.stations.push(res));
      }
    }
  }

  private createInfrastructure(xmlDom: Document): void {
    let mlTrackGroups = xmlDom.querySelectorAll("line");
    let mlTracks = xmlDom.querySelectorAll("track");
    let mlOcps = xmlDom.querySelectorAll("ocp");
    let tracksFromML: Track[] = [];

    for (let t=0; t<mlTracks.length; t++) {
      let mlCrossSections = mlTracks[t].querySelectorAll("crossSection");
      let trackFromML: Track = {name: mlTracks[t].getAttribute("name"), trackNumber: "", crossStations:[]}
      for (let o=0; o <mlOcps.length; o++) {
        if(mlTracks[t].querySelector("trackBegin").querySelector("macroscopicNode").getAttribute("ocpRef") === mlOcps[o].getAttribute("id")) {
          trackFromML.startPoint = {
            currentNumber: 0,
            rl100: mlOcps[o].getAttribute("abbreviation"),
            name: mlOcps[o].getAttribute("name"),
            stationType: "Bahnhof",
            transferTime: 10,
            positionValue: 0,
            railReplacementDrivingTime: 0,
            railReplacementStop: true};
        }
        if(mlTracks[t].querySelector("trackEnd").querySelector("macroscopicNode").getAttribute("ocpRef") === mlOcps[o].getAttribute("id")) {
          trackFromML.startPoint = {
            currentNumber: mlCrossSections.length+1,
            rl100: mlOcps[o].getAttribute("abbreviation"),
            name: mlOcps[o].getAttribute("name"),
            stationType: "Bahnhof",
            transferTime: 10,
            positionValue: +mlTracks[t].querySelector("trackEnd").getAttribute("pos")/1000,
            railReplacementDrivingTime: 0,
            railReplacementStop: true};
        }
        for (let c=0; c<mlCrossSections.length; c++) {

          if(mlCrossSections[c].getAttribute("ocpRef") === mlOcps[o].getAttribute("id")) {
            if(mlOcps[o].querySelector("propService").getAttribute("passenger")=== "true") {
              let crossStation: TrackStation = {
                currentNumber: c+1,
                rl100: mlOcps[o].getAttribute("abbreviation"),
                name: mlOcps[o].getAttribute("name"),
                stationType: "Haltepunkt",
                transferTime: 10,
                positionValue: +mlCrossSections[c].getAttribute("pos")/1000,
                railReplacementDrivingTime: 0,
                railReplacementStop: true
              }
              if (mlOcps[o].querySelector("propOperational").getAttribute("operationalType") === "station") {
                crossStation.stationType = "Bahnhof";
              }
              trackFromML.crossStations.push(crossStation);
            }
          }
        }
      }
      console.log(trackFromML);
    }
  }

  private createTimeTableYear(xmlDom: Document): void {

  }
}
