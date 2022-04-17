import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Measure} from "../../shared/measure";
import {MeasureExistsValidatorService} from "../../shared/measure-exists-validator.service";

@Component({
  selector: 'rop-measure-form',
  templateUrl: './measure-form.component.html',
  styleUrls: ['./measure-form.component.scss']
})
export class MeasureFormComponent implements OnInit, OnChanges{
  measureForm: FormGroup;

  @Input() measure?: Measure;
  @Input() set editing(isEditing: boolean) {

  }
  @Output() submitMeasure = new EventEmitter<Measure>();

  constructor(
    private fb: FormBuilder,
    private measureExistsValidator: MeasureExistsValidatorService
  ) {
    this.measureForm = this.fb.group({

      }
    )
  }

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.measure) {
      this.setFormValues(this.measure);
    }
  }

  private setFormValues(measure: Measure) {
    this.measureForm.patchValue(this.measure);

  }

  submitForm() {

  }
}
