import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";

export class SignupErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'rop-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  matcher = new SignupErrorStateMatcher();
  pwHide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenStorageService,
  ) {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      pw: new FormControl('', [Validators.required]),
      firstName: new FormControl(''),
      name: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  signupUser() {


  }

}
