import {Component, Input, OnInit} from '@angular/core';
import {Station} from "../../../shared/station";

@Component({
  selector: 'rop-station-list-item',
  templateUrl: './station-list-item.component.html',
  styleUrls: ['./station-list-item.component.scss']
})
export class StationListItemComponent implements OnInit {
  @Input() station?: Station;



  constructor() { }

  ngOnInit(): void {
  }

}
