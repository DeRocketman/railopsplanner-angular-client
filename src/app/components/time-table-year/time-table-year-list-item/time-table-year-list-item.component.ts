import {Component, Input, OnInit} from '@angular/core';
import {TimeTableYear} from "../../../shared/time-table-year";
import {TimeTableYearService} from "../../../services/time-table-year.service";
import {RailNetworkService} from "../../../services/rail-network.service";
import {MeasureService} from "../../../services/measure.service";
import {Router} from "@angular/router";
import {PlanningPeriodService} from "../../../services/planning-period.service";

@Component({
  selector: 'rop-time-table-year-list-item',
  templateUrl: './time-table-year-list-item.component.html',
  styleUrls: ['./time-table-year-list-item.component.scss']
})
export class TimeTableYearListItemComponent implements OnInit {
  @Input() timeTableYear: TimeTableYear;

  constructor(
    private timeTableYearService: TimeTableYearService,
    private railNetworkService: RailNetworkService,
    private measureService: MeasureService,
    private planningPeriodService: PlanningPeriodService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  removeItem() {
    const confirmText = "Soll das Fahrplanjahr sowie alle Perioden und " +
      "Netze mit allen Maßnahmen wirklich gelöscht werden?"
    if (this.timeTableYear && confirm(confirmText)) {
      for (let railNetwork of this.timeTableYear.railNetworks) {
        this.railNetworkService.delete(railNetwork.id).subscribe();
      }
      for (let planningPeriod of this.timeTableYear.planningPeriods) {
        this.planningPeriodService.delete(planningPeriod.id).subscribe();
      }
      this.timeTableYearService.delete(this.timeTableYear.id).subscribe(()=>{
          window.location.reload();
          this.router.navigate(["time-table-year"]);
      });
    }
  }
}
