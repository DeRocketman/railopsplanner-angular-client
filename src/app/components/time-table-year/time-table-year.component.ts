import { Component, OnInit } from '@angular/core';
import {TimeTableYear} from "../../shared/time-table-year";
import {TimeTableYearService} from "../../services/time-table-year.service";

@Component({
  selector: 'rop-time-table-year',
  templateUrl: './time-table-year.component.html',
  styleUrls: ['./time-table-year.component.scss']
})
export class TimeTableYearComponent implements OnInit {
  timeTableYear: TimeTableYear[] = [];
  railNetworkCounter: number;
  planningPeriodCounter: number;
  measureCounter: number = 0;

  constructor(private timeTableYearService: TimeTableYearService) { }

  ngOnInit(): void {
    this.receiveTimeTableYear();
    this.printData();
  }

  receiveTimeTableYear(): void {
    this.timeTableYearService.getAll()
      .subscribe({
        next: (data) => {
          this.timeTableYear = data;
          for (let tty of this.timeTableYear ) {
            this.railNetworkCounter = tty.railNetworks.length;
            console.log("Anzahl der Netze für " + tty.name + ": "+ tty.railNetworks.length)
            for (let rn of tty.railNetworks) {
              this.planningPeriodCounter = rn.planningPeriods.length;
              console.log("Anzahl der Perioden:" + rn.planningPeriods.length)
              for (let pp of rn.planningPeriods) {
                this.measureCounter = this.measureCounter + pp.measureList.length;
              }
            }
          }
        },
        error: (e) => console.log(e)

      });
  }

  printData(): void {
    console.log(this.timeTableYear);
  }
}
