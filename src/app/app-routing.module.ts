import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/features/pages/home/home.component";
import {ProfileComponent} from "./components/features/pages/profile/profile.component";
import {DashboardComponent} from "./components/features/pages/dashboard/dashboard.component";
import {AuthGuard} from "./services/app.guard";
import {MainHeaderComponent} from "./components/shared/main-header/main-header.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'mh', component: MainHeaderComponent, children: [{
    path: 'profile', component:ProfileComponent
    },{
      path: 'dashboard', component:DashboardComponent
    }
    ]},
  // {path: 'profile', component: ProfileComponent, /*canActivate: [AuthGuard]*/},
  // {path: 'dashboard', component: DashboardComponent, /*canActivate: [AuthGuard]*/},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
