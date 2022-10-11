import {RailNetwork} from "./rail-network";
import {Track} from "./track";

export interface TrackGroup {
  id?: string
  name?: string
  railNetwork?: RailNetwork
  tracks?: Track[]
}
