import {PlanningPeriod} from "./planning-period";

export interface RailNetwork {
  id?: any;
  name?: string;
  abbreviation?: string;

  planningPeriods?: PlanningPeriod[];
}
