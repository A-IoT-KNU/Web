import {Injectable} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";
import { KeycloakProfile } from 'keycloak-js';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private keycloak: KeycloakService, private router: Router) {
    }
    user: KeycloakProfile | null = null;
    signUp() {
        this.keycloak.register();
    }
    login() {
        this.keycloak.login();
        this.router.navigate(['/dashboard']);
    }

    logout() {
        this.keycloak.logout(window.location.origin + '/');
    }

    async isAuth() {
        return await this.keycloak.isLoggedIn();
    }
    async getUserData() {
        return this.user = await this.keycloak.loadUserProfile();
    }

}
