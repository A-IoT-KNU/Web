import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

interface location {
  value: string;
}

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent {

  locations: location[] = [
    {value: 'Квартира А'},
    {value: 'Дім'},
    {value: 'Квартира Б'},
  ];

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      room: ['', Validators.required],
    });
  }

  selectedLocation: string = this.locations[0].value;

  handleItemClick(item: string): void {
    console.log(`Ви вибрали: ${item}`);
    this.selectedLocation = item;
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value, this.selectedLocation);
    }
  }
}
