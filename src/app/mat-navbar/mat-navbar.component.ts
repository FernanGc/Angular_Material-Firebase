import { AppUser } from './../models/app-user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-navbar',
  templateUrl: './mat-navbar.component.html',
  styleUrls: ['./mat-navbar.component.scss']
})
export class MatNavbarComponent {
  
  appUser: AppUser;

  constructor(public authService: AuthService) {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logOut() {
    this.authService.logout();
  }

}