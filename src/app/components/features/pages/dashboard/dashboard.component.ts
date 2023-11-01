import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import Chart from 'chart.js/auto';

import {NewLocationComponent} from "../../../shared/new-location/new-location.component";
import {NewSensorComponent} from "../../../shared/new-sensor/new-sensor.component";
import {NewRoomComponent} from "../../../shared/new-room/new-room.component";
import {AuthService} from "../../../../services/auth.service";
import {DataService} from "../../../../services/data.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  locations: any;

  ngOnInit(): void {
    this.createChart("m1");
    this.createChart("m2");
    this.getUserData();


    this.locations = this.dataService.getLocations();
    this.dataService.getLocationsSubject().subscribe(locations => {
      this.locations = locations;
    });
  }

  constructor(public dialog: MatDialog, private authService: AuthService, private dataService: DataService) {
  }

  user: any;

  async getUserData() {
    this.user = await this.authService.getUserData();
  }

  logout() {
    this.authService.logout();
  }


  airSensor = [
    {name: 'CO', value: '10.2', unit: 'ppm', nowValue: '10.2'},
    {name: 'O3', value: '123', unit: 'ppb', nowValue: '42.2'},
    {name: 'NO2', value: '0.212', unit: 'ppb', nowValue: '0.12'},
    {name: 'SO2', value: '40.23', unit: 'ppb', nowValue: '102.2'},
    {name: 'PM2', value: '42.2', unit: 'µg/m3', nowValue: '11.2'},
    {name: 'PM10', value: '25', unit: 'µg/m3', nowValue: '10.22'}
  ];

  openNewLocation(): void {
    const dialogRef = this.dialog.open(NewLocationComponent, {
      width: '330px',
    });

  }

  openNewSensor(): void {
    const dialogRef = this.dialog.open(NewSensorComponent, {
      width: '330px'
    });
  }

  openNewRoom(): void {
    const dialogRef = this.dialog.open(NewRoomComponent, {
      width: '330px', height:'700px'
    });
  }

  public chart: any;

  createChart(id: string): void {
    this.chart = new Chart(id, {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['0', '1', '2', '3',
          '4', '5', '6', '7'],
        datasets: [
          {
            label: "Temperature",
            data: ['15', '30', '34', '28', '20',
              '24', '20', '18'],
            backgroundColor: function (context) {
              let index = context.dataIndex;
              let value = context.dataset.data[index];
              // @ts-ignore
              return value > 25 ? 'red' : 'blue'; // змінюємо колір точки, якщо значення понад 25
            },
            borderColor: function (context) {
              let index = context.dataIndex;
              let value = context.dataset.data[index];
              // @ts-ignore
              return value > 25 ? 'red' : 'blue'; // змінюємо колір точки, якщо значення понад 25
            },
            tension: 0.4
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        maintainAspectRatio: false
      }

    });
  }
}
