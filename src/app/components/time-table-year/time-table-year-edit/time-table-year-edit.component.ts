import { Component, OnInit } from '@angular/core';
import {TimeTableYear} from "../../../shared/time-table-year";
import {TimeTableYearService} from "../../../services/time-table-year.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs";
import {RailNetwork} from "../../../shared/rail-network";
import {PlanningPeriod} from "../../../shared/planning-period";
import {RailNetworkService} from "../../../services/rail-network.service";
import {PlanningPeriodService} from "../../../services/planning-period.service";

@Component({
  selector: 'rop-time-table-year-edit',
  templateUrl: './time-table-year-edit.component.html',
  styleUrls: ['./time-table-year-edit.component.scss']
})
export class TimeTableYearEditComponent implements OnInit {
  timeTableYear?: TimeTableYear;
  constructor(
    private ttyService: TimeTableYearService,
    private rnService: RailNetworkService,
    private ppService: PlanningPeriodService,
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
    console.log(tty);
    let timeTableYearUpdate = {
      id: tty.id,
      name: tty.name,
      firstDate: tty.firstDate,
      lastDate: tty.lastDate
    }

    let railNetworksToUpdate: RailNetwork[] = [];
    let railNetworksBeforeEdit: RailNetwork[] = this.timeTableYear.railNetworks;

    let planningPeriodsToUpdate: PlanningPeriod[] = [];
    let planningPeriodsToDelete: PlanningPeriod[] = this.timeTableYear.planningPeriods;


    for (let railNetwork of tty.railNetworks) {
      railNetwork.timeTableYear = {
        id: tty.id
      };
      if (railNetwork.id == null || railNetwork.id === "") {
        this.rnService.create(railNetwork).subscribe();
      } else {
        railNetworksToUpdate.push(railNetwork);
      }
    }

    for (let planningPeriod of tty.planningPeriods) {
      planningPeriod.timeTableYear = {
        id: tty.id
      };

      if (planningPeriod.id == null || planningPeriod.id == "") {
        this.ppService.create(planningPeriod).subscribe()
      } else {
        planningPeriodsToUpdate.push(planningPeriod);
      }
    }

    for (let networkToUpdate of railNetworksToUpdate) {
      for (let networkToDelete of railNetworksBeforeEdit) {
        if (networkToUpdate.id === networkToDelete.id) {
          this.rnService.update(networkToUpdate).subscribe();
          networkToDelete.id = "NO_DELETE"
        }
      }
    }

    for (let networkToDelete of railNetworksBeforeEdit) {
      if (networkToDelete.id !== "NO_DELETE") {
        this.rnService.delete(networkToDelete.id).subscribe();
      }
    }


    for (let periodToUpdate of planningPeriodsToUpdate) {
      for (let periodeToDelete of planningPeriodsToDelete) {
        if (periodToUpdate.id === periodeToDelete.id) {
          this.ppService.update(periodToUpdate).subscribe();
          periodeToDelete.id = "NO_DELETE"
        }
      }
    }

    for (let periodToDelete of planningPeriodsToDelete) {
      if (periodToDelete.id !== "NO_DELETE") {
        this.ppService.delete(periodToDelete.id).subscribe();
      }
    }

    this.ttyService.update(timeTableYearUpdate).subscribe(() =>
        this.router.navigate(['time-table-year'])
    );
  }
}
