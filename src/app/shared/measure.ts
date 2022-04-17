export interface Measure {
  id: number;
  name: string;
  begin: Date;
  end: Date;
  railNetwork: string;
  reasons: MeasureReason[];
  effects?: string;
  passengerConcept?: string;
  lossKilometer?: number;
  cancellationList?: Cancellation[];
  timetableChanges?: TimetableChange[];
  kigbauNumber?:string;
}

export interface ToDoListItem {

}

export interface Cancellation {

}

export interface TimetableChange {

}

export interface MeasureReason {

}
