import {RailNetwork} from "./rail-network";
import {PlanningPeriod} from "./planning-period";

export interface TimeTableYearRaw {
  id: string;
  name: string;
  firstDate: string;
  lastDate: string;
  railNetworksCounter: number,
  planningPeriodsCounter: number,
  railNetworks?: RailNetwork[];
  planningPeriods?: PlanningPeriod[];
}
