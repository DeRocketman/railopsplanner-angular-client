import {Line} from "./line";
import {Station} from "./station";

export interface Track {
  name?: string
  positiveDirection?: boolean
  lines?: Line[]
  startPoint?: Station
  endPoint?: Station
  crossStations?: Station[]
}
