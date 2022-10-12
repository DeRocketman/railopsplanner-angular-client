import {Component, OnInit} from '@angular/core';
import {RailNetwork} from "../../shared/rail-network";
import {RailNetworkService} from "../../services/rail-network.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TrackGroupService} from "../../services/track-group.service";
import {TrackGroup} from "../../shared/track-group";

@Component({
  selector: 'rop-rail-network-form',
  templateUrl: './rail-network-form.component.html',
  styleUrls: ['./rail-network-form.component.scss']
})
export class RailNetworkFormComponent implements OnInit {
  railNetwork?: RailNetwork;
  availableTrackGroups: TrackGroup[] = [];
  railNetworkFormGroup: FormGroup;

  constructor(
    private railNetworkService: RailNetworkService,
    private trackGroupService: TrackGroupService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.railNetworkFormGroup = this.fb.group( {
      name: new FormControl(''),
      abbreviation: new FormControl(''),
      trackGroups: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => this.railNetworkService.getSingle(id))
    ).subscribe(rn => {
        this.railNetwork = rn;
        if (this.railNetwork) {
          this.setFormValues(this.railNetwork)
        }
    });
    this.trackGroupService.getAll().subscribe((res) => {
      for (let group of res) {
        this.availableTrackGroups = res;
      }
    });
  }

  private setFormValues(rn: RailNetwork): void {
    console.log(rn)
    this.railNetworkFormGroup.patchValue(rn);
  }

  get trackGroups(): FormControl {
    return this.railNetworkFormGroup.get('trackGroups') as FormControl;
  }

  submitRailNetwork(value: RailNetwork): void {
    let railNetworkToUpdate: RailNetwork = {
      ...value,
      id: this.railNetwork.id,
      trackGroups: [],
    }
    for (let tGroupId of value.trackGroups) {
      for (let selTrackGroup of this.availableTrackGroups) {
        if (tGroupId == selTrackGroup.id) {
          selTrackGroup.railNetwork = {id: railNetworkToUpdate.id}
          this.trackGroupService.update(selTrackGroup).subscribe(res => console.log(res));
        }
      }
    }
  }

}
