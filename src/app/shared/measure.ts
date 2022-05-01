
import {RailNetwork} from "./rail-network";


export interface Measure {
  id: number;
  name: string;
  start: Date;
  end: Date;
  stations: string;
  railNetwork: RailNetwork;
  reasons: MeasureReason[];
  effect?: string;
  passengerConcept?: string;
  lossKilometer?: number;
  kigbauNumber?:string;
  trainFailures?: TrainFailure[];
  scheduleDeviations?: ScheduleDeviation[];
  toDoListRow?: ToDoListRow;
}

export interface ToDoListRow {
  name: string;
  start: Date;
  end: Date;
  stations: string;
  receivingDate: Date;
  assignedPlannerName: string;
  agentName: string;
  processingStatus: number;
  toDoListItems?: ToDoListItem[];
}

export interface ToDoListItem {
  group: string;
  name: string;
  deadline: Date;
  closingDate?: Date;
  testMark?: string;
  metaData: ToDoListItemMetaData[];
}

export interface ToDoListItemMetaData {
  milestoneItem: boolean;
  testMarkNeeded: boolean;
  relativeToStart: boolean;
  global: boolean;
}

export interface MeasureReason {
  reason: string;
  vzgList?: string[];
  startOperationControlPoint?: string;
  endOperationControlPoint?: string;
  operatingMode?: string;
  start?: Date;
  end?: Date;
  disturbed?: boolean;
}

export interface TrainFailure {
  trafficDay: Date;
  trainNumber: string;
  trainType: string;
  startOperationControlPoint: string;
  destinationOperationControlPoint: string;
  failureFrom: string;
  failureTo: string;
}

export interface ScheduleDeviation {
  trafficDay: Date;
  trainNumber: string;
  trainType: string;
  startOperationControlPoint: string;
  destinationOperationControlPoint: string;
  deviationType: string;
  time: number;
}
