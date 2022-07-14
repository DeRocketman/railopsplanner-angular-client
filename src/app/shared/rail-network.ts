import {PlanningPeriod} from "./planning-period";
import {Measure} from "./measure";

export interface RailNetwork {
  id?: string;
  name?: string;
  abbreviation?: string;
  measureList?: Measure[];
}
