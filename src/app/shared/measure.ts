import {Agent} from "./agent";
import {User} from "./user";

export interface Measure {
  id?: any;
  name?: string;
  start?: Date;
  end?: Date;
  stations?: string;
  reasons?: MeasureReason[];
  effect?: string;
  passengerConcept?: string;
  lossKilometer?: number;
  kigbauNumber?:string;
  trainFailures?: TrainFailure[];
  scheduleDeviations?: ScheduleDeviation[];
  agents?: Agent[];
  responseDate?: Date;
  measureKind?: string;
  clerks?: User[]
  railNetwork?: Measure;
}

export interface MeasureReason {
  id?: any;
  reason?: string;
  startOperationControlPoint?: string;
  endOperationControlPoint?: string;
  operatingMode?: string;
  start?: Date;
  end?: Date;
  disturbed?: boolean;
}

export interface TrainFailure {
  id?: any;
  trafficDay?: Date;
  trainNumber?: string;
  trainType?: string;
  startOperationControlPoint?: string;
  destinationOperationControlPoint?: string;
  failureFrom?: string;
  failureTo?: string;
}

export interface ScheduleDeviation {
  trafficDay?: Date;
  trainNumber?: string;
  trainType?: string;
  startOperationControlPoint?: string;
  destinationOperationControlPoint?: string;
  deviationType?: string;
  time?: number;
}
