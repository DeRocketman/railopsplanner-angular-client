import { Component, OnInit } from '@angular/core';
import {TimeTableYear} from "../../shared/time-table-year";

@Component({
  selector: 'rop-time-table-year',
  templateUrl: './time-table-year.component.html',
  styleUrls: ['./time-table-year.component.scss']
})
export class TimeTableYearComponent implements OnInit {
  timeTableYear: TimeTableYear[];

  constructor() { }

  ngOnInit(): void {
    this.timeTableYear = [
        {
          id: 1,
          name: "21/2022",
          firstDate: new Date(2021, 12, 10),
          lastDate: new Date(2022, 12, 12),
          railNetworks:
            [{
              id: 1,
              name: "Netz Mitte",
              abbreviation: "NM",
            },
            {
              id: 2,
              name: "Netz Nord",
              abbreviation: "NN",
            },
          ]
        }
      ]
  }

}
