import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import Chart from 'chart.js/auto';

import {NewLocationComponent} from "../../../shared/new-location/new-location.component";
import {NewSensorComponent} from "../../../shared/new-sensor/new-sensor.component";
import {NewRoomComponent} from "../../../shared/new-room/new-room.component";
import {AuthService} from "../../../../services/auth.service";
import {DataService} from "../../../../services/data.service";
import {ChangeSensorComponent} from "../../../shared/change-sensor/change-sensor.component";
import {DeleteSensorComponent} from "../../../shared/delete-sensor/delete-sensor.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit  {

  locations: any;

  sensors = [
    { title: 'Температура в кухні', typeOfSensor:'temperature', idChart:'nm1', showPanel: false, value:'20C', errorData:false, chartData:"5, 10, 3, 4, 57, 3, 9"},
    { title: 'Вологість в кухні', typeOfSensor:'wet', idChart:'nm2', showPanel: false , value:'30', errorData:false, chartData:"3, 7, 3, 9, 5"},
    { title: 'Тиск в кухні', typeOfSensor:'pressure', idChart:'nm3', showPanel: false , value:'12', errorData:true, chartData:"8, 15, 9, 3, 1"},
    { title: 'Освітленість в кухні', typeOfSensor:'light', idChart:'nm4', showPanel: false , value:'4', errorData:false, chartData:"5, 10, 3, 4, 5"},
    { title: 'Якість повітря в кухні', typeOfSensor:'airSensor', idChart:'nm5', showPanel: false , value:'5', errorData:false, chartData:"5, 10, 3, 4, 5"},
  ];

ngAfterViewInit() {
  // Temp for
  //Write the loop to create the chart for all sensors
  for(const sensor of this.sensors){
    this.createChart(sensor.idChart, sensor.chartData);
  }
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

  openDeleteSensor(): void {
    const dialogRef = this.dialog.open(DeleteSensorComponent, {
      width: '385px', height:'145px'
    });

  }

  openNewSensor(): void {
    const dialogRef = this.dialog.open(NewSensorComponent, {
      width: '330px'
    });
  }

  openChangeSensor(): void {
    const dialogRef = this.dialog.open(ChangeSensorComponent, {
      width: '330px'
    });
  }

  openNewRoom(): void {
    const dialogRef = this.dialog.open(NewRoomComponent, {
      width: '330px', height:'400px'
    });
  }

  public chart: any;
  createChart(id: string, chartData:any): void {

    const chartValues: string[] = chartData.split(', ');
    let labelsCount= chartValues.map((value, index) => index.toString());
    console.log(labelsCount)
    this.chart = new Chart(id, {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labelsCount ,
        datasets: [
          {
            label: "Temperature",
            data: chartValues,
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
