import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {NewLocationComponent} from "../../../shared/new-location/new-location.component";
import {NewSensorComponent} from "../../../shared/new-sensor/new-sensor.component";
import {NewRoomComponent} from "../../../shared/new-room/new-room.component";
import {AuthService} from "../../../../services/auth.service";
import expandToHashMap from "@popperjs/core/lib/utils/expandToHashMap";

interface location {
  value: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(public dialog: MatDialog,private authService: AuthService) { }

user:any;
  Username: any;
  Email: any;
  FLName: any;
  getUserData() {
    let user  = localStorage.getItem('User')
    // @ts-ignore
    this.Username= JSON.parse(user).username
    // @ts-ignore
    this.Email= JSON.parse(user).email
    // @ts-ignore
    this.FLName= JSON.parse(user).username

  }

  ngOnInit() {
    setTimeout(() => {
      this.getUserData();
    }, 500);
  }
  locations: location[] = [
    {value: 'Підвал'},
    {value: 'Квартира'},
    {value: 'Дача'},
    {value: 'Будинок'},
    {value: 'Гараж'},
  ];
  openNewLocation(): void {
    const dialogRef = this.dialog.open(NewLocationComponent, {
      width: '330px', height:'230px'
    });
    dialogRef.componentInstance.locationAdded.subscribe((location: string) => {
      this.locations.push({ value: location });
    });

  }

  openNewSensor(): void {
    const dialogRef = this.dialog.open(NewSensorComponent, {
      width: '330px', height:'430px'
    });
  }

  openNewRoom(): void {
    const dialogRef = this.dialog.open(NewRoomComponent, {
      width: '330px', height:'280px'
    });
  }

  protected readonly expandToHashMap = expandToHashMap;
}
