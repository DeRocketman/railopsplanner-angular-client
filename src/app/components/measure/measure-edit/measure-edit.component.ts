import { Component, OnInit } from '@angular/core';
import {Measure} from "../../../shared/measure";
import {MeasureService} from "../../../services/measure.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs";

@Component({
  selector: 'rop-measure-edit',
  templateUrl: './measure-edit.component.html',
  styleUrls: ['./measure-edit.component.scss']
})
export class MeasureEditComponent implements OnInit {
  measure?: Measure;
  formActive: Boolean = false;
  constructor(
    private measureService: MeasureService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => this.measureService.getSingle(id))
    ).subscribe((m) => {
      console.log(m);
      this.measure = m;
    });
  }

  updateMeasure(measureToUpdate: Measure): void {

  }
}
