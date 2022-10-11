import {Component, Input, OnInit} from '@angular/core';
import {Track} from "../../../shared/track";
@Component({
  selector: 'rop-track-list-item',
  templateUrl: './track-list-item.component.html',
  styleUrls: ['./track-list-item.component.scss']
})
export class TrackListItemComponent implements OnInit {
  @Input() track?: Track;
  constructor() { }

  ngOnInit(): void {
  }

  deleteTrack(): void {

  }
}
