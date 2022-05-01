import {Measure} from "./measure";

export interface PlanningPeriod {
  id: number;
  name: string;
  start: Date;
  end: Date;
  measureList?: Measure[];
}
