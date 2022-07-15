import {PlanningPeriod} from "./planning-period";
import {Measure} from "./measure";
import {TimeTableYear} from "./time-table-year";

export interface RailNetwork {
  id?: string;
  name?: string;
  abbreviation?: string;
  measureList?: Measure[];
  timeTableYear?: TimeTableYear;
}
