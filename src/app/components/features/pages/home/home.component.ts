import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  async ngOnInit() {
    if (await this.authService.isAuth()) {
      this.authService.logout();
    }

  }
  login(){
    this.authService.login();
  }

  signUp(){
    this.authService.signUp();
  }


}
