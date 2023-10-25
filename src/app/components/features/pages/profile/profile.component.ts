import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {NewLocationComponent} from "../../../shared/new-location/new-location.component";
import {NewSensorComponent} from "../../../shared/new-sensor/new-sensor.component";
import {NewRoomComponent} from "../../../shared/new-room/new-room.component";
import {AuthService} from "../../../../services/auth.service";

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

  logout() {
    this.authService.logout();
  }
  user: any;
  async getUserData() {
    this.user = await this.authService.getUserData();
  }

  ngOnInit() {
    this.getUserData();
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
}
