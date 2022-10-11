import { Component } from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'rop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'railopsplanner-angular-client';
  isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
  }
  constructor(private tokenService: TokenStorageService, private router: Router) {
  }

  logout(): void {
    this.tokenService.signOut();
    this.router.navigate([''])
  }
}
