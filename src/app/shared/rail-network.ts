import {PlanningPeriod} from "./planning-period";
import {Measure} from "./measure";
import {TimeTableYear} from "./time-table-year";
import {TrackGroup} from "./track-group";

export interface RailNetwork {
  id?: string;
  name?: string;
  abbreviation?: string;
  measureList?: Measure[];
  trackGroups?: TrackGroup[];
  timeTableYear?: TimeTableYear;
}
