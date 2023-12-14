import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../services/auth.service";
import {DataService} from "../../../services/data.service";
import {NewLocationComponent} from "../new-location/new-location.component";
import {forkJoin, of, switchMap} from "rxjs";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

 locations:any;
 isLocation:boolean = false;
 Username:any;
  ngOnInit() {

    this.authService.locations1$.subscribe(data => {
      this.locations = data;
      this.isLocation = this.locations.length>0;
    })
    this.authService.fetchGetLocation();
    this.isLocation = this.locations.length>0;

   this.authService.fetchGetClientInfo();
    setTimeout(() => {
      this.getUserData();
    }, 500);
    // this.getUserData()

  }

  getUserData() {
    let user  = localStorage.getItem('User')
    // @ts-ignore
    this.Username= JSON.parse(user).username
  }

  // ngOnInit(): void {
  //   this.authService.locations$.subscribe(locations => {
  //     this.locations = locations;
  //     this.isLocation = this.locations != null;
  //     // Оновлення інтерфейсу користувача з оновленими даними про локації
  //   });
  //
  //   forkJoin([this.authService.getLocations()])
  //     .subscribe(([locations]) => {
  //       this.locations = locations;
  //       this.isLocation = this.locations != null;
  //     });
  //
  //   this.isLocation = this.locations != null;
  //   console.log(this.isLocation);
  // }



  constructor(public dialog: MatDialog, private authService: AuthService) {

  }

  user: any;

  logout() {
    this.authService.logout();
  }

  openNewLocation(): void {
    const dialogRef = this.dialog.open(NewLocationComponent, {
      width: '330px',
    });

  }


}
