import { Component, OnInit } from '@angular/core';
import {MeasureService} from "../../../services/measure.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Measure, MeasureReason, ScheduleDeviation} from "../../../shared/measure";
import {AgentService} from "../../../services/agent.service";
import {Agent} from "../../../shared/agent";

@Component({
  selector: 'rop-measure-create',
  templateUrl: './measure-create.component.html',
  styleUrls: ['./measure-create.component.scss']
})
export class MeasureCreateComponent implements OnInit {
  storedAgents: Agent[] = [];
  constructor(
    private measureService: MeasureService,
    private agentService: AgentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.agentService.getAll().subscribe((res) => this.storedAgents = res);
  }

  createMeasure(measure: Measure): void {
    this.measureService.create(measure).subscribe((res) => {
      console.log(res)
      this.router.navigate(["measure-plan"])
    })
  }
}
