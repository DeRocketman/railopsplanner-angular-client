import { Component, OnInit } from '@angular/core';
import {TimeTableYearService} from "../../../services/time-table-year.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TimeTableYear} from "../../../shared/time-table-year";
import {RailNetworkService} from "../../../services/rail-network.service";
import {RailNetwork} from "../../../shared/rail-network";
import {PlanningPeriod} from "../../../shared/planning-period";
import {PlanningPeriodService} from "../../../services/planning-period.service";

@Component({
  selector: 'rop-time-table-year-create',
  templateUrl: './time-table-year-create.component.html',
  styleUrls: ['./time-table-year-create.component.scss']
})
export class TimeTableYearCreateComponent implements OnInit {

  constructor(
    private ttys: TimeTableYearService,
    private railNetService: RailNetworkService,
    private planningPeriodService: PlanningPeriodService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createTimeTableYear(tty: TimeTableYear) {
    let railNetworksToCreate : RailNetwork[] = tty.railNetworks;
    let planningPeriodsToCreate: PlanningPeriod[] = tty.planningPeriods;
    tty.railNetworks = [];
    tty.planningPeriods = [];

    let createdTimeTable: TimeTableYear;
    this.ttys.create(tty).subscribe((res) => {
      console.log(res);
      createdTimeTable = res;
      for (let railNetwork of railNetworksToCreate) {
        railNetwork.timeTableYear = createdTimeTable;
        railNetwork.trackGroups = [];
        this.createRailNetwork(railNetwork);
      }
      for (let planningPeriods of planningPeriodsToCreate) {
        planningPeriods.timeTableYear = createdTimeTable;
        this.createPlanningPeriod(planningPeriods);
      }
      this.router.navigate(['time-table-year'])
    });
  }

  createRailNetwork(rn: RailNetwork) {
    this.railNetService.create(rn).subscribe((res) => console.log(res));
  }

  createPlanningPeriod(pp: PlanningPeriod) {
    this.planningPeriodService.create(pp).subscribe((res)=> console.log(res));
  }
}
