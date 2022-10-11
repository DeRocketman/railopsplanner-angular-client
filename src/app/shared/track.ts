import {TrackGroup} from "./track-group";
import {TrackStation} from "./track-station";

export interface Track {
  id?: string
  name?: string
  trackNumber?: string
  positiveDirection?: boolean
  lineNumber?: string
  startPoint?: TrackStation
  endPoint?: TrackStation
  crossStations?: TrackStation[]
  trackGroup?: TrackGroup
}
