import { Component, OnInit } from '@angular/core';
import {TimeTableYear} from "../../shared/time-table-year";

@Component({
  selector: 'rop-time-table-year',
  templateUrl: './time-table-year.component.html',
  styleUrls: ['./time-table-year.component.scss']
})
export class TimeTableYearComponent implements OnInit {
  timeTableYear: TimeTableYear[];

  constructor(
  ) { }

  ngOnInit(): void {
    this.timeTableYear = [
        {
          id: 1,
          name: "21/2022",
          firstDate: new Date(2021, 11, 12),
          lastDate: new Date(2022, 11, 10),
          railNetworks: [
            {
              id: 1,
              name: "Netz Mitte",
              abbreviation: "NM",
              planningPeriods: [
                {
                  id: 1,
                  name: "Januar",
                  start: new Date(2022, 1, 3),
                  end: new Date(2022,2, 6)
                },
                {
                  id: 2,
                  name: "Februar",
                  start: new Date(2022, 2, 7),
                  end: new Date(2022,3, 6)
                },
                {
                  id: 3,
                  name: "Februar",
                  start: new Date(2022, 3, 7),
                  end: new Date(2022,4, 3)
                },
              ]
            },
            {
              id: 2,
              name: "Netz Nord",
              abbreviation: "NN",
              planningPeriods: [
                {
                  id: 1,
                  name: "Januar",
                  start: new Date(2022, 1, 3),
                  end: new Date(2022,2, 6)
                },
                {
                  id: 2,
                  name: "Februar",
                  start: new Date(2022, 2, 7),
                  end: new Date(2022,3, 6)
                },
                {
                  id: 3,
                  name: "Februar",
                  start: new Date(2022, 3, 7),
                  end: new Date(2022,4, 3)
                },
              ]
            },
          ]
        }
      ]
  }

}
