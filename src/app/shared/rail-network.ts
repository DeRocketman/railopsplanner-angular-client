import {PlanningPeriod} from "./planning-period";
import {Measure} from "./measure";

export interface RailNetwork {
  id?: any;
  name?: string;
  abbreviation?: string;
  measureList?: Measure[];
}
