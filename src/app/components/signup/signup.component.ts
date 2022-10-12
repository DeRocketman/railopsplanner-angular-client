import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";
import {User} from "../../shared/user";
import {F} from "@angular/cdk/keycodes";

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
      password: new FormControl('', [Validators.required]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      initials: new FormControl(''),
      phone: new FormControl(''),
      fax: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  signupUser(formValue: User): void {
    let checkedFirstName = this.checkFirstName(formValue);
    let checkedLastName = this.checkLastName(formValue);
    let checkedInitials = this.checkedInitials(formValue);
    let signUpUser: User = {
      ...formValue,
    }
    signUpUser.firstName = checkedFirstName;
    signUpUser.lastName = checkedLastName;
    signUpUser.initials = checkedInitials;
    console.log(formValue);
    console.log(signUpUser)
    this.authService.signup(signUpUser).subscribe(
      (res) => {
        window.alert("Benutzer erfolgreich erstellt!")
        this.router.navigate(["login"])
      }
    )
  }

  checkFirstName(user: User): String {
    let checkedFirstName : String = '';
    if (user.firstName === '' || user.firstName == null) {
        checkedFirstName = user.email.substring(0, user.email.indexOf("."));
    } else {
      checkedFirstName = user.firstName;
    }
    return checkedFirstName;
  }

  checkLastName(user: User): String {
    let checkedLastName: String = '';
    if (user.lastName === '' || user.lastName == null) {
      checkedLastName = user.email.substring(user.email.indexOf(".")+1 ,user.email.indexOf("@"));
    } else {
      checkedLastName = user.lastName;
    }
    return checkedLastName;
  }

  checkedInitials(user: User): String {
    let checkedInitials: String = '';
    if (user.initials === '' || user.initials == null) {
      checkedInitials = user.email.charAt(0).toUpperCase() + user.email.charAt(user.email.indexOf(".")+1).toUpperCase()
    }
    return checkedInitials;
  }
}
