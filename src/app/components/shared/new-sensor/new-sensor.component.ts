import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import 'bootstrap'
interface typeOfSensor {
  value: string;
}

interface location {
  value: string;
}

interface room {
  value: string;
}


@Component({
  selector: 'app-new-sensor',
  templateUrl: './new-sensor.component.html',
  styleUrls: ['./new-sensor.component.css'],
})
export class NewSensorComponent {
  typeOfSensors:typeOfSensor[]=[
    {value:'Температура'},
    {value:'Вологість'},
    {value:'Тиск'},
    {value:'Освітленість'},
    {value:'Якість повітря'}
  ];

  locations:location[]=[
    {value:'Квартира А'},
    {value:'Дім'},
    {value:'Квартира Б'},
  ];

  rooms:room[]=[
    {value:"Кухня"},
    {value:"Спальня"},
    {value:"Туалет"},
    {value:"Коридор"},
  ]

  constructor(
    public dialogRef: MatDialogRef<NewSensorComponent>
  ){}

  selectedSensor: string = this.typeOfSensors[0].value;
  selectedLocation: string = this.locations[0].value;
  selectedRoom: string = this.rooms[0].value;

  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    selectedSensor: new FormControl(this.selectedSensor, Validators.required),
    selectedLocation: new FormControl(this.selectedLocation, Validators.required),
    selectedRoom: new FormControl(this.selectedRoom, Validators.required)
  });

  handleItemClick(item: string, i:number): void {
    console.log(`Ви вибрали: ${item}`);
    switch(i){
      case 0:
        this.selectedSensor = item;
        this.myForm.controls['selectedSensor'].setValue(this.selectedSensor);
        break;
      case 1:
        this.selectedLocation = item;
        this.myForm.controls['selectedLocation'].setValue(this.selectedLocation);
        break;
      case 2:
        this.selectedRoom = item;
        this.myForm.controls['selectedRoom'].setValue(this.selectedRoom);
        break;
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    }
  }
}







