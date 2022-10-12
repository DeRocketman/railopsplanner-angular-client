import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MeasureService} from "../../../services/measure.service";
import {Measure, MeasureReason, ScheduleDeviation, TrainFailure} from "../../../shared/measure";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Agent} from "../../../shared/agent";
import {StationService} from "../../../services/station.service";
import {Station} from "../../../shared/station";
import {XmlToMeasureService} from "../../../services/xml-to-measure.service";
import {User} from "../../../shared/user";
import {RailNetworkService} from "../../../services/rail-network.service";
import {RailNetwork} from "../../../shared/rail-network";
import {TrackService} from "../../../services/track.service";
import {Track} from "../../../shared/track";

@Component({
  selector: 'rop-measure-form',
  templateUrl: './measure-form.component.html',
  styleUrls: ['./measure-form.component.scss']
})
export class MeasureFormComponent implements OnInit, OnChanges {
  measureFormGroup: FormGroup;
  stations: Station[] = [];
  railNetworks: RailNetwork[] = [];
  tracks: Track[] = [];
  measureFromXML?: Measure;

  @Input() measureToEdit?: Measure;
  @Output() submitMeasure = new EventEmitter<Measure>();

  today = new Date()
  constructor(
    private fb: FormBuilder,
    private railNetworkService: RailNetworkService,
    private measureService: MeasureService,
    private stationService: StationService,
    private trackService: TrackService,
    private xmlToMeasureService: XmlToMeasureService,
  ) {
    this.measureFormGroup = this.fb.group({
      name: ['', {validators: [Validators.required, Validators.min(5)]}],
      start: [new Date().toISOString().slice(0,10), {validators: [Validators.required]}],
      end: [new Date().toISOString().slice(0,10), {validators: [Validators.required]}],
      startPoint: fb.group({id: ['',{validators: [Validators.required]}]}),
      endPoint: fb.group({id: ['',{validators: [Validators.required]}]}),
      effect: [''],
      passengerConcept: [''],
      kigbauNumber: [''],
      measureKind: ['Baumaßnahme'],
      responseDate: [new Date().toISOString().slice(0,10)],
      clerks: fb.array([this.createClerkControl()]),
      railNetwork: fb.group({id: ['']}),
      agents: fb.array([this.createAgentsControl()]),
      trainFailures: fb.array([this.createTrainFailureControl()]),
      scheduleDeviations: fb.array([this.createScheduleDeviationControl()]),
      reasons: fb.array([this.createReasonControl()])
    })
  }

  ngOnInit(): void {
    this.stationService.getAll().subscribe(res => this.stations = res);
    this.railNetworkService.getAll().subscribe(res => this.railNetworks = res);
    this.trackService.getAll().subscribe(res => this.tracks = res)
  }

  ngOnChanges(): void {
    if (this.measureToEdit) {
      this.setFormValues(this.measureToEdit);
    }
    if (this.measureFromXML) {
      this.setFormValues(this.measureFromXML)
    }
  }

  setFormValues(measureToLoad:Measure): void {
    const clerksCount = measureToLoad.clerks ? measureToLoad.clerks.length : 0;
    const agentsCount = measureToLoad.agents ? measureToLoad.agents.length : 0;
    const trainFailCount = measureToLoad.trainFailures ? measureToLoad.trainFailures.length : 0;
    const scheduleDevCount = measureToLoad.scheduleDeviations ? measureToLoad.scheduleDeviations.length : 0;
    const reasonsCount = measureToLoad.reasons ? measureToLoad.reasons.length : 0;

    while(clerksCount > this.clerks.length) {
      this.addClerk();
    }
    while(clerksCount < this.clerks.length) {
      this.removeClerk(0);
    }

    while(agentsCount > this.agents.length) {
      this.addAgent();
    }
    while(agentsCount < this.agents.length) {
      this.removeAgent(0);
    }

    while(trainFailCount > this.trainFailures.length) {
      this.addTrainFailure();
    }
    while(trainFailCount < this.trainFailures.length) {
      this.removeTrainFailure(0);
    }

    while(trainFailCount > this.trainFailures.length) {
      this.addTrainFailure();
    }
    while(trainFailCount < this.trainFailures.length) {
      this.removeTrainFailure(0);
    }

    while(scheduleDevCount > this.scheduleDeviations.length) {
      this.addScheduleDeviation();
    }
    while(scheduleDevCount < this.scheduleDeviations.length) {
      this.removeSchuleDeviation(0);
    }

    while(reasonsCount > this.reasons.length) {
      this.addReason();
    }
    while(reasonsCount < this.reasons.length) {
      this.removeReason(0);
    }

    if (measureToLoad) {
      this.measureFormGroup.patchValue(measureToLoad);
    }
  }

  private createClerkControl(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    })
  }

  private createAgentsControl(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      email:new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      initials: new FormControl(''),
      phone: new FormControl(''),
      fax: new FormControl(''),
    })
  }

  private createTrainFailureControl(): FormGroup {
    return new FormGroup({
      trafficDay: new FormControl(new Date().toISOString().slice(0,10)),
      trainNumber: new FormControl(''),
      line: new FormControl(''),
      trainType: new FormControl(''),
      startPoint: new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        rl100: new FormControl(''),
      }),
      endPoint: new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        rl100: new FormControl(''),
      }),
      failureFrom: new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        rl100: new FormControl(''),
      }),
      failureTo: new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        rl100: new FormControl(''),
      }),
    })
  }

  private createScheduleDeviationControl(): FormGroup {
    return new FormGroup({
      trafficDay: new FormControl(new Date().toISOString().slice(0,10)),
      trainNumber: new FormControl(''),
      line: new FormControl(''),
      trainType: new FormControl(''),
      startPoint: new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        rl100: new FormControl(''),
      }),
      endPoint: new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        rl100: new FormControl(''),
      }),
      deviationType: new FormControl(''),
      deviationStartPoint: new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        rl100: new FormControl(''),
      }),
      time: new FormControl(''),
    })
  }

  private createReasonControl(): FormGroup {
    return new FormGroup({
      reason: new FormControl(''),
      startPoint: new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        rl100: new FormControl(''),
      }),
      endPoint: new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        rl100: new FormControl(''),
      }),
      operatingMode: new FormControl(''),
      start: new FormControl(new Date().toISOString().slice(0,10)),
      end: new FormControl(new Date().toISOString().slice(0,10)),
      disturbed: new FormControl(false),
    })
  }

  get agents(): FormArray {
    return this.measureFormGroup.get('agents') as FormArray;
  }

  get trainFailures(): FormArray {
    return this.measureFormGroup.get('trainFailures') as FormArray;
  }

  get scheduleDeviations(): FormArray {
    return this.measureFormGroup.get('scheduleDeviations') as FormArray;
  }

  get clerks(): FormArray {
    return this.measureFormGroup.get('clerks') as FormArray;
  }

  get reasons(): FormArray {
    return  this.measureFormGroup.get('reasons') as FormArray;
  }

  addAgent(): void {
    this.agents.push(this.createAgentsControl());
  }

  removeAgent(i: number): void {
    this.agents.removeAt(i);
  }

  addTrainFailure(): void {
    this.trainFailures.push(this.createTrainFailureControl());
  }

  removeTrainFailure(j: number): void {
    this.trainFailures.removeAt(j);
  }

  addScheduleDeviation(): void {
    this.scheduleDeviations.push(this.createScheduleDeviationControl());
  }

  removeSchuleDeviation(k: number): void {
    this.scheduleDeviations.removeAt(k);
  }

  addClerk(): void {
    this.clerks.push(this.createClerkControl());
  }

  removeClerk(l: number): void {
    this.clerks.removeAt(l);
  }

  addReason(): void {
    this.reasons.push(this.createReasonControl());
  }

  removeReason(m: number): void {
    this.reasons.removeAt(m)
  }

  submitMeasureForm(value: Measure): void {
    let checkedMeasure=  value;
    checkedMeasure.id = this.measureToEdit ? this.measureToEdit.id : "TO GENERATE"
    checkedMeasure.agents = this.checkAgents(value.agents);
    checkedMeasure.reasons = this.checkReasons(value.reasons);
    checkedMeasure.scheduleDeviations = this.checkScheduleDeviations(value.scheduleDeviations);
    checkedMeasure.trainFailures = this.checkTrainFailures(value.trainFailures);
    this.submitMeasure.emit(checkedMeasure);
  }

  loadXmlFile(e): void {
    let file = e.target.files[0];
    let fr : FileReader = new FileReader();
    fr.onloadend = (e) => {
      this.measureFromXML = this.xmlToMeasureService.xmlToMeasure(fr.result.toString())
      this.setFormValues(this.measureFromXML);
      console.log(e)
    }
    fr.readAsText(file);
  }

  checkAgents(agents: Agent[]): Agent[] {
    for (let i = 0; i < agents.length; i++) {
      if (agents[i] == null || agents[i].email == null || agents[i].email == '') {
        delete agents[i];
      }

      if (agents[i].firstName == null || agents[i].firstName == '') {
          agents[i].firstName = agents[i].email.substring(0, agents[i].email.lastIndexOf("."))
      }

      if (agents[i].lastName == null || agents[i].lastName == '') {
        agents[i].lastName= agents[i].email.substring(agents[i].email.lastIndexOf(".")+1, agents[i].email.lastIndexOf("@"))
      }

      if (agents[i].initials == null || agents[i].initials == '') {
        agents[i].initials = agents[i].firstName.charAt(0) + agents[i].lastName.charAt(0)
      }
    }
    return agents;
  }

  checkReasons(reasons: MeasureReason[]): MeasureReason[] {
    for (let i = 0; i < reasons.length; i++) {
      if (reasons[i].reason == null || reasons[i].reason == '') {
        delete reasons[i];
      }
    }
    return reasons;
  }

  checkScheduleDeviations(scheduleDeviations: ScheduleDeviation[]): ScheduleDeviation[] {
    for (let i = 0; i < scheduleDeviations.length; i++) {
      if (scheduleDeviations[i].trainNumber == null || scheduleDeviations[i].trainNumber == '') {
        delete scheduleDeviations[i];
      }
    }
    return scheduleDeviations;
  }

  private checkTrainFailures(trainFailures: TrainFailure[]): TrainFailure[] {
    for (let i = 0; i < trainFailures.length; i++) {
      if (trainFailures[i].trainNumber == null || trainFailures[i].trainNumber == '') {
        delete trainFailures[i];
      }
    }
    return trainFailures;
  }

  calculateKilometer(value: Measure): Number {
    let sum = 0;
    for (let failure of value.trainFailures) {
      for (let track of this.tracks) {
        if (failure.startPoint.rl100) {

        }
      }
    }
    return sum;
  }
}
