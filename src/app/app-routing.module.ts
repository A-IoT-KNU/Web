import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/features/pages/home/home.component";
import {ProfileComponent} from "./components/features/pages/profile/profile.component";
import {DashboardComponent} from "./components/features/pages/dashboard/dashboard.component";
import {AuthGuard} from "./services/app.guard";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', component: ProfileComponent, /*canActivate: [AuthGuard]*/},
  {path: 'dashboard', component: DashboardComponent, /*canActivate: [AuthGuard]*/},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
