import { Component, OnInit } from '@angular/core';
import {TimeTableYear} from "../../../shared/time-table-year";
import {TimeTableYearService} from "../../../services/time-table-year.service";


@Component({
  selector: 'rop-time-table-year-list',
  templateUrl: './time-table-year-list.component.html',
  styleUrls: ['./time-table-year-list.component.scss']
})
export class TimeTableYearListComponent implements OnInit {
  timeTableYearList: TimeTableYear[] = [];
  constructor(private ttyService: TimeTableYearService) {
  }

  ngOnInit(): void {
    this.ttyService.getAll().subscribe(res => this.timeTableYearList = res);
  }
}
