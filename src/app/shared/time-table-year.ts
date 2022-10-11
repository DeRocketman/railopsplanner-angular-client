import {RailNetwork} from "./rail-network";
import {PlanningPeriod} from "./planning-period";

export interface TimeTableYear {
  id?: string;
  name?: string;
  firstDate?: string;
  lastDate?: string;
  railNetworks?: RailNetwork[];
  planningPeriods?: PlanningPeriod[];
}










