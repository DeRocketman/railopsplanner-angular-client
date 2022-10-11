import {Agent} from "./agent";
import {User} from "./user";
import {RailNetwork} from "./rail-network";
import {Station} from "./station";

export interface Measure {
  id?: string;
  name?: string;
  start?: string;
  end?: string;
  startPoint?: Station;
  endPoint?: Station;
  reasons?: MeasureReason[];
  effect?: string;
  passengerConcept?: string;
  lossKilometer?: number;
  kigbauNumber?:string;
  trainFailures?: TrainFailure[];
  scheduleDeviations?: ScheduleDeviation[];
  agents?: Agent[];
  responseDate?: string;
  measureKind?: string;
  clerks?: User[]
  railNetwork?: RailNetwork;
}

export interface MeasureReason {
  id?: string;
  reason?: string;
  startPoint?: Station;
  endPoint?: Station;
  operatingMode?: string;
  start?: string;
  end?: string;
  disturbed?: boolean;
  measure?:Measure;
}

export interface TrainFailure {
  id?: string;
  trafficDay?: string;
  trainNumber?: string;
  line?: string;
  trainType?: string;
  startPoint?: Station;
  endPoint?: Station;
  failureFrom?: Station;
  failureTo?: Station;
  measure?: Measure
}

export interface ScheduleDeviation {
  id?: string
  trafficDay?: string;
  line?: string;
  trainNumber?: string;
  trainType?: string;
  startPoint?: Station;
  endPoint?: Station;
  deviationStartPoint?: Station;
  deviationType?: string;
  time?: number;
  measure?: Measure
}
