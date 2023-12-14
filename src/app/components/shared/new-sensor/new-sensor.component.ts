import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import 'bootstrap'
import {AuthService} from "../../../services/auth.service";

interface typeOfSensor {
  value: string;
}

interface location {
  id: number;
  name: string;
}

interface room {
  id: number;
  name: string;
}


@Component({
  selector: 'app-new-sensor',
  templateUrl: './new-sensor.component.html',
  styleUrls: ['./new-sensor.component.css'],
})
export class NewSensorComponent implements OnInit {
  typeOfSensors: typeOfSensor[] = [
    {value: 'Температура'},
    {value: 'Вологість'},
    {value: 'Тиск'},
    {value: 'Освітленість'},
    {value: 'Якість повітря'}
  ];

  locations: location[] = [
    {id: 5, name: 'House'},
    {id: 5, name: 'House'},
    {id: 5, name: 'House'},
  ];

  rooms: room[] = [
    {id: 5, name: 'House'},
    {id: 5, name: 'House'},
    {id: 5, name: 'House'},
    {id: 5, name: 'House'},
  ]


  constructor(
    public dialogRef: MatDialogRef<NewSensorComponent>, public auth: AuthService) {
    this.auth.locations1$.subscribe(locations => {
      this.locations = locations;
    });
    this.auth.rooms1$.subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  selectedLocation: any | undefined;
  selectedRoom: any | undefined;

  ngOnInit() {
    console.log(this.locations)
    this.selectedLocation = this.locations[0].name;
    this.selectedRoom = this.rooms[0].name;
    console.log(this.selectedRoom)
  }

  selectedSensor: string = this.typeOfSensors[0].value;


  myForm = new FormGroup({
    name: new FormControl('', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z _а-яА-ЯіІїЇєЄ]+$/),
    ]),
    selectedSensor: new FormControl(this.selectedSensor, Validators.required),
    // @ts-ignore
    // selectedLocation: new FormControl(this.selectedLocation, Validators.required),
    selectedLocation: new FormControl('', Validators.required),
    // @ts-ignore
    selectedRoom: new FormControl(this.selectedRoom, Validators.required)
  });

  handleItemClick(item: any, i: number): void {
    console.log(`Ви вибрали: ${item.name} ${item.id}`);
    switch (i) {
      case 0:
        this.selectedSensor = item;
        this.myForm.controls['selectedSensor'].setValue(this.selectedSensor);
        break;
      case 1:
        this.selectedLocation = item.name;
        this.myForm.controls['selectedLocation'].setValue(item.id);
        break;
      case 2:
        this.selectedRoom = item.name;
        this.myForm.controls['selectedRoom'].setValue(item.id);
        break;
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.auth.fetchCreateSensor(this.myForm.value.selectedLocation, this.myForm.value.selectedRoom, this.myForm.value.name, this.myForm.value.selectedSensor);
    }
  }
}







