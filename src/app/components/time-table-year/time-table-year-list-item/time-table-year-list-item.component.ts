import {Component, Input, OnInit} from '@angular/core';
import {TimeTableYear} from "../../../shared/time-table-year";

@Component({
  selector: 'rop-time-table-year-list-item',
  templateUrl: './time-table-year-list-item.component.html',
  styleUrls: ['./time-table-year-list-item.component.scss']
})
export class TimeTableYearListItemComponent implements OnInit {
  @Input() timeTableYear: TimeTableYear;

  ngOnInit(): void {

  }
}
