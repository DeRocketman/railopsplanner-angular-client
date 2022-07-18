import {Line} from "./line";
import {Station} from "./station";
import {TrackGroup} from "./track-group";

export interface Track {
  id?: string
  name?: string
  trackNumber?: string
  positiveDirection?: boolean
  lines?: Line[]
  startPoint?: Station
  endPoint?: Station
  crossStations?: Station[]
  trackGroup?: TrackGroup
}
