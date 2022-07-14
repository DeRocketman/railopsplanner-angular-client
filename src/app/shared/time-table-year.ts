import {RailNetwork} from "./rail-network";
import {PlanningPeriod} from "./planning-period";

export interface TimeTableYear {
  id: string;
  name: string;
  firstDate: Date;
  lastDate: Date;
  railNetworksCounter: number,
  planningPeriodsCounter: number,
  railNetworks?: RailNetwork[];
  planningPeriods?: PlanningPeriod[];
}










