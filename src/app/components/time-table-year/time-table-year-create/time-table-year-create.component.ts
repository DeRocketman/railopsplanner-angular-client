import { Component, OnInit } from '@angular/core';
import {TimeTableYearService} from "../../../services/time-table-year.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeTableYear} from "../../../shared/time-table-year";
import {RailNetworkService} from "../../../services/rail-network.service";
import {RailNetwork} from "../../../shared/rail-network";

@Component({
  selector: 'rop-time-table-year-create',
  templateUrl: './time-table-year-create.component.html',
  styleUrls: ['./time-table-year-create.component.scss']
})
export class TimeTableYearCreateComponent implements OnInit {

  constructor(
    private ttys: TimeTableYearService,
    private railNetService: RailNetworkService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createTimeTableYear(tty: TimeTableYear) {
    let createdTimeTable: TimeTableYear;
    this.ttys.create(tty).subscribe((res) => {
      console.log(res);
      createdTimeTable = res;
      for (let railNetwork of tty.railNetworks) {
        railNetwork.timeTableYear = createdTimeTable;
        this.createRailNetwork(railNetwork);
      }
      this.router.navigate(['time-table-year'])
    });
  }

  createRailNetwork(rn: RailNetwork) {
    this.railNetService.create(rn).subscribe((res) => console.log(res));
  }
}
