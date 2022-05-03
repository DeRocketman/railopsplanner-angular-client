import {RailNetwork} from "./rail-network";
import {PlanningPeriod} from "./planning-period";

export interface TimeTableYear {
  id: number;
  name: string;
  firstDate: Date;
  lastDate: Date;
  railNetworks?: RailNetwork[];
}










