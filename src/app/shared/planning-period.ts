import {Measure} from "./measure";
import {TimeTableYear} from "./time-table-year";

export interface PlanningPeriod {
  id?: string;
  name?: string;
  start?: string;
  end?: string;
  timeTableYear?: TimeTableYear;
}
