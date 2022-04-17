export interface RollingStock {
  infrastructureRef: string;
  id: string;
  timetableRef: string;
  vehicles: Vehicle[];
  formations: Formation[];
}

export interface Vehicle {
  id: string;
  name: string;
  length: number;
  speed: number;
}

export interface Formation {
  id: string;
  name: string;
  length: number;
  speed: number;
  weight: number;
  trainOrder: TrainOrder[]
}

export interface TrainOrder {
  orderNumber: string;
  vehicleRef: string;
  vehicleCount: number;
}

