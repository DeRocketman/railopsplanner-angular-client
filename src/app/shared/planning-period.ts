import {Measure} from "./measure";
import {TimeTableYear} from "./time-table-year";

export interface PlanningPeriod {
  id?: string;
  name?: string;
  start?: Date;
  end?: Date;
  timeTableYear?: TimeTableYear;
}
