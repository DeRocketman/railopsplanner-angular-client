import {Component, Input, OnInit} from '@angular/core';
import {TimeTableYear} from "../../../shared/time-table-year";

@Component({
  selector: 'rop-time-table-year-list-item',
  templateUrl: './time-table-year-list-item.component.html',
  styleUrls: ['./time-table-year-list-item.component.scss']
})
export class TimeTableYearListItemComponent implements OnInit {
  @Input() timeTableYear: TimeTableYear;
  railNetworkCounter: number;
  planningPeriodCounter: number;
  measureCounter: number = 0;

  ngOnInit(): void {
    this.countData();
  }

  countData(): void {
    this.railNetworkCounter = this.timeTableYear.railNetworks.length;
    this.planningPeriodCounter = this.timeTableYear.planningPeriods.length;
    for (let rn of this.timeTableYear.railNetworks) {
      this.measureCounter = rn.measureList.length;
    }
  }
}
