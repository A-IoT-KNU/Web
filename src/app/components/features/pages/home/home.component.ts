import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";
import {RegisterFormComponent} from "../../../shared/register-form/register-form.component";
import {LoginFormComponent} from "../../../shared/login-form/login-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    this.authService.logout();
  }

  constructor(private authService: AuthService,public dialog: MatDialog) {
  }


  openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(RegisterFormComponent, {
      width: '420px', minHeight: '500px'
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '420px', minHeight: '275px'
    });
  }




}
