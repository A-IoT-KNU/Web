import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from "../../../services/data.service";
import {AuthService} from "../../../services/auth.service";



@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  // locations = this.dataService.getLocations();
  locations :any;
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {

    this.auth.locations1$.subscribe(locations => {
      this.locations = locations;
      // Оновлення інтерфейсу користувача з оновленими даними про локації
    });


    this.myForm = this.fb.group({
      room: this.fb.control('', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z _а-яА-ЯіІїЇєЄ]+$/),
      ]),
    });
  }

  selectedLocation:any;
  ngOnInit() {
    console.log(this.locations[0].name);
    this.selectedLocation = this.locations[0];
  }




  handleItemClick(item: any): void {
    console.log(`Ви вибрали: ${item.name}`);
    this.selectedLocation = item;
  }

  onSubmit() {
    if (this.myForm.valid) {
      // this.auth.createRooms(this.selectedLocation.id, this.myForm.value.room)
      this.auth.fetchCreateRoom(this.selectedLocation.id, this.myForm.value.room);
      console.log(this.myForm.value.room, this.selectedLocation.id);
    }
  }
}
