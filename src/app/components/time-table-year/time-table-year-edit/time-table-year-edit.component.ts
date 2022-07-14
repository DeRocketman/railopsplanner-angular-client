import { Component, OnInit } from '@angular/core';
import {TimeTableYear} from "../../../shared/time-table-year";
import {TimeTableYearService} from "../../../services/time-table-year.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs";

@Component({
  selector: 'rop-time-table-year-edit',
  templateUrl: './time-table-year-edit.component.html',
  styleUrls: ['./time-table-year-edit.component.scss']
})
export class TimeTableYearEditComponent implements OnInit {
  timeTableYear?: TimeTableYear;
  constructor(
    private ttyService: TimeTableYearService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => this.ttyService.getSingle(id))
    )
      .subscribe(tty => this.timeTableYear = tty);
  }

  updateTimeTableYear(tty: TimeTableYear) {
    this.ttyService.update(tty).subscribe(() => {
      this.router.navigate(['time-table-year']);
    });
  }
}
