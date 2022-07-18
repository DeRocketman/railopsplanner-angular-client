import {Component, OnChanges, OnInit} from '@angular/core';
import {RailNetwork} from "../../shared/rail-network";
import {RailNetworkService} from "../../services/rail-network.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {Form, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Track} from "../../shared/track";

@Component({
  selector: 'rop-rail-network-form',
  templateUrl: './rail-network-form.component.html',
  styleUrls: ['./rail-network-form.component.scss']
})
export class RailNetworkFormComponent implements OnInit {
  railNetwork?: RailNetwork;
  railNetworkFormGroup: FormGroup;
  trackFormGroup: FormGroup;
  stationFormGroup: FormGroup;

  constructor(
    private railNetworkService: RailNetworkService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.railNetworkFormGroup = this.fb.group( {
      name:'',
      abbreviation:'',
    });

    this.trackFormGroup = this.fb.group({
      name:'',
      trackNumber:'',
      positiveDirection: true,
      startPoint: '',
      endPoint: '',
      crossStations: this.buildCrossStationsArray([''])
    });

    this.stationFormGroup
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

  private buildCrossStationsArray(values: string[]): FormArray {
    return this.fb.array(values, Validators.required);
  }
  get tracks(): FormArray {
    return this.railNetworkFormGroup.get('tracks') as FormArray;
  }
}
