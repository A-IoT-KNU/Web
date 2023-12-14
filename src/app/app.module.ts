import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/features/pages/home/home.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpInterceptor} from "@angular/common/http";
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
import { MainHeaderComponent } from './components/shared/main-header/main-header.component';
import { LoginFormComponent } from './components/shared/login-form/login-form.component';
import { RegisterFormComponent } from './components/shared/register-form/register-form.component';
import { DeleteSensorComponent } from './components/shared/delete-sensor/delete-sensor.component';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/app.guard";
import {TokenInterceptorService} from "./services/token-interceptor.service";
import { TestdashComponent } from './components/features/testdash/testdash.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', ".json");
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
    ChangeSensorComponent,
    MainHeaderComponent,
    LoginFormComponent,
    RegisterFormComponent,
    DeleteSensorComponent,
    TestdashComponent,
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
  AuthService,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
