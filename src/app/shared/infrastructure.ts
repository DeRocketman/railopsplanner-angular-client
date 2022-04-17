export interface Infrastructure {
  id: string;
  tracks: Track[];
  trackGroups: TrackGroup[];
  OperationalControlPoints: OperationControlPoint[];

}

export interface Track {
  id: string;
  name: string;
  type: string;
  trackTopology: TrackTopology;
}

export interface TrackTopology {
  trackBegin: TrackElement;
  trackEnd: TrackElement;
  mileageChanges: MileChange[];
}

export interface TrackElement {
  id: string;
  pos: number;
  absPos: number;
  ocpRef: string;
}

export interface MileChange {
  id: string;
  absPos: number;
  pos: number;
  dir: string;
  type: string;
}

export interface TrackGroup {
  id: string;
  name: string;
  uicNumber: string;
  lineNumber: string;
  trackRef: string;
}

export interface OperationControlPoint {
  id: string;
  abbreviation: string;
  number: string;
  name: string;

}
