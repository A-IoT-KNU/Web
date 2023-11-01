import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from "../../../services/data.service";



@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent {

  locations = this.dataService.getLocations();

  myForm: FormGroup;

  constructor(private fb: FormBuilder,private dataService:DataService) {
    this.myForm = this.fb.group({
      room: this.fb.control('', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z _а-яА-ЯіІїЇєЄ]+$/),
      ]),
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
