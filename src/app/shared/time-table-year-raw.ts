import {RailNetwork} from "./rail-network";

export interface TimeTableYearRaw {
  id: number;
  name: string;
  firstDate: string;
  lastDate: string;
  railNetworks?: RailNetwork[];
}
