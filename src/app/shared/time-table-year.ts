import {RailNetwork} from "./rail-network";

export interface TimeTableYear {
  id?: number;
  name?: string;
  firstDate?: Date;
  lastDate?: Date;
  railNetworks?: RailNetwork[];
}










