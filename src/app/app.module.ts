import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/features/pages/home/home.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MatDialogModule} from "@angular/material/dialog";
import {LanguageSelectorComponent} from './components/shared/language-selector/language-selector.component';
import {NgOptimizedImage} from "@angular/common";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { ProfileComponent } from './components/features/pages/profile/profile.component';
import { DashboardComponent } from './components/features/pages/dashboard/dashboard.component';
import { NewLocationComponent } from './components/shared/new-location/new-location.component';
import { NewRoomComponent } from './components/shared/new-room/new-room.component';
import { NewSensorComponent } from './components/shared/new-sensor/new-sensor.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ChangeSensorComponent } from './components/shared/change-sensor/change-sensor.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', ".json");
}

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'angular-web',
        clientId: 'angular-web-client'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LanguageSelectorComponent,
    ProfileComponent,
    DashboardComponent,
    NewLocationComponent,
    NewRoomComponent,
    NewSensorComponent,
    ChangeSensorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    KeycloakAngularModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: "en"

    }),
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
