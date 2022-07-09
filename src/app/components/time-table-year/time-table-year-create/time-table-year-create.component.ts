import { Component, OnInit } from '@angular/core';
import {TimeTableYearService} from "../../../services/time-table-year.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeTableYear} from "../../../shared/time-table-year";

@Component({
  selector: 'rop-time-table-year-create',
  templateUrl: './time-table-year-create.component.html',
  styleUrls: ['./time-table-year-create.component.scss']
})
export class TimeTableYearCreateComponent implements OnInit {

  constructor(
    private ttys: TimeTableYearService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createTimeTableYear(tty: TimeTableYear) {
    this.ttys.create(tty).subscribe(() => {
      this.router.navigate(['../', 'time-table-year'], {relativeTo: this.route})
    });
  }
}
