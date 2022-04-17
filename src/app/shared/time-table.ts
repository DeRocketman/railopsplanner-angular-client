export interface TimeTable {
  infrastructureRef: string;
  rollingStockRef: string;
  id: string;
  name: string;
  description: string;
  timeTablePeriods: TimeTablePeriod[];
  operatingPeriods: OperatingPeriod[];
  categories: Category[];
  trainParts: TrainPart[];
}

export interface TimeTablePeriod {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  holidays: Holiday[];

}

export interface Holiday {
  holidayDate: Date;
}

export interface OperatingPeriod {
  id: string;
  name: string;
  description: string;
  timeTablePeriodRef: string;
  bitMask: BinaryType;
  operatingDay: OperatingDay[];
  specialServices?: SpecialService[];
}

export interface OperatingDay {
  operatingCode: BinaryType;
  startDate: Date;
  endDate: Date;
  operatingDayDeviance?: OperatingDayDeviance
}

export interface OperatingDayDeviance {
  operatingCode: BinaryType;
  holidayOffset: BinaryType;
  ranking?: number;
}

export interface SpecialService {
  type: string;
  singeDate: Date;
}

export interface Category {
  id: string;
  abbreviation: string;
  name: string;
  trainUsage?: string;
  description?: string;
  deadRun?: boolean;
}

export interface TrainPart {
  id: string;
  name: string;
  line: string;
  trainNumber: string;
  processStatus?: string;
  timeTablePeriodRef: string;
  categoryRef?: string;
  //todo: formationTT geht es weiter
}
