import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";

export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'rop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  matcher = new LoginErrorStateMatcher();
  pwHide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenStorageService,
  ) {
    this.signinForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
  }

  loginUser() {
    let email = this.signinForm?.get("email")?.value;
    let pw = this.signinForm?.get("password")?.value;
    this.authService.signin(email, pw).subscribe((res) => {
      this.tokenService.saveToken(res);
      this.router.navigate(['home']);
    });
  }
}
