import {TimeTableYear} from "./time-table-year";
import {TimeTableYearRaw} from "./time-table-year-raw";

export class TimeTableYearFactory {
  static fromRaw(tty: TimeTableYearRaw): TimeTableYear {
    return {
      ...tty,
      //firstDate: new Date(tty.firstDate),
      //lastDate: new Date(tty.lastDate),
    };
  }
}
