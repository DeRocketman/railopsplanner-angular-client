import {Measure} from "./measure";

export interface PlanningPeriod {
  id?: any;
  name?: string;
  start?: Date;
  end?: Date;
  measureList?: Measure[];
}
