import {Infrastructure} from "./infrastructure";
import {RollingStock} from "./rolling-stock";
import {TimeTable} from "./time-table";
import {Measure, ToDoListItem} from "./measure";

export interface TimeTableYear {
  name: string;
  firstDate: Date;
  lastDate: Date;
  railNetworks: RailNetwork[];
  measureList: Measure[];
  toDoList: ToDoListItem[];
}

export interface RailNetwork {
  name: string;
  abbreviation: string;
  infrastructureList: Infrastructure[];
  rollingStockList: RollingStock[];
  timetableList: TimeTable[];
}






