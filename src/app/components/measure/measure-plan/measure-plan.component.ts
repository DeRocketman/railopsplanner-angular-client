import { Component, OnInit } from '@angular/core';
import {MeasureService} from "../../../services/measure.service";
import {Measure} from "../../../shared/measure";
import {Router} from "@angular/router";

export interface MeasureElement {
  name: string;
  railnetwork: string;
  start: Date;
  end: Date;
  from: string;
  to: string;
  line: string;
  km: number;
}

const ELEMENT_DATA: MeasureElement[] = [
  {name: '20180', railnetwork: 'Netz Nord', start: new Date(2022,2, 10), end: new Date(2022, 2, 14), from: 'AHI', to: 'ABSM', line: 'RB63', km: 1000},
  {name: '20181', railnetwork: 'Netz Nord', start: new Date(2022,3, 28), end: new Date(2022, 4, 14), from: 'AHI', to: 'ABSM', line: 'RB63', km: 1200},
  {name: '20182', railnetwork: 'Netz Nord', start: new Date(2022,4, 14), end: new Date(2022, 4, 19), from: 'AHI', to: 'ABSM', line: 'RB63', km: 1000},
  {name: '20183', railnetwork: 'Netz Nord', start: new Date(2022,5, 18), end: new Date(2022, 5, 19), from: 'AHI', to: 'ABSM', line: 'RB63', km: 1000},
  {name: '20184', railnetwork: 'Netz Nord', start: new Date(2022,6, 10), end: new Date(2022, 6, 14), from: 'AHI', to: 'ABSM', line: 'RB63', km: 1000},
]
@Component({
  selector: 'rop-measure-plan',
  templateUrl: './measure-plan.component.html',
  styleUrls: ['./measure-plan.component.scss']
})
export class MeasurePlanComponent implements OnInit{
  displayedColumns: string[] = ['name', 'railnetwork', 'start', 'end', 'from', 'to', 'line', 'km'];
  dataArray: Measure[] = [];


  constructor(private measureService: MeasureService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.measureService.getAll().subscribe((res) => this.dataArray = res);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  editMeasure(row): void {
    console.log(row.id);
    this.router.navigate(["measure-plan/edit/"+row.id])
  }
}
