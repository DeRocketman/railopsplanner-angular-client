import {PlanningPeriod} from "./planning-period";

export interface RailNetwork {
  id: number;
  name: string;
  abbreviation: string;

  planningPeriods?: PlanningPeriod[];
}
