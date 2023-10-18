import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/features/pages/home/home.component";
// import {ProfileComponent} from "./components/profile/profile.component";
// import {DashboardComponent} from "./components/dashboard/dashboard.component";
// import {MainHeaderComponent} from "./components/main-header/main-header.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: 'profile', component: ProfileComponent},
  // {path: 'dashboard', component: DashboardComponent},
  // {path: 'header', component: MainHeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
