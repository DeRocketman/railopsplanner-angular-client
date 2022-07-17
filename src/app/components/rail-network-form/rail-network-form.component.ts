import {Component, OnChanges, OnInit} from '@angular/core';
import {RailNetwork} from "../../shared/rail-network";
import {RailNetworkService} from "../../services/rail-network.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Track} from "../../shared/track";

@Component({
  selector: 'rop-rail-network-form',
  templateUrl: './rail-network-form.component.html',
  styleUrls: ['./rail-network-form.component.scss']
})
export class RailNetworkFormComponent implements OnInit {
  railNetwork?: RailNetwork;
  railNetworkFormGroup: FormGroup;

  constructor(
    private railNetworkService: RailNetworkService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.railNetworkFormGroup = this.fb.group( {
      name:'',
      abbreviation:'',
      tracks: this.buildTracksArray({})
    })
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => this.railNetworkService.getSingle(id))
    )
      .subscribe(rn => {
        this.railNetwork = rn
        this.setFormValues(rn)
        console.log(this.railNetwork);
      });
  }

  private setFormValues(rn: RailNetwork) {
    this.railNetworkFormGroup.patchValue(rn);
  }

  private buildTracksArray(values: Track) {
    return this.fb.array(
      []
    )
  }
}
