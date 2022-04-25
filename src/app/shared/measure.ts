export interface Measure {
  id: number;
  name: string;
  start: Date;
  end: Date;
  station: string;
  railNetwork: string;
  reasons: MeasureReason[];
  effects?: string;
  passengerConcept?: string;
  lossKilometer?: number;
  kigbauNumber?:string;
  trainFailures?: TrainFailure[];
  scheduleDeviations?: ScheduleDeviation[];
}

export interface ToDoListItem {
  measureRef: number;

}



export interface MeasureReason {
  reason: string;
  vzgList: string[];
  startOperationControlPoint: string;
  endOperationControlPoint: string;
  operatingMode: string;
  start: Date;
  end: Date;
  disturbed: boolean;
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
