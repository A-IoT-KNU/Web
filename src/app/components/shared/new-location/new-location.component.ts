import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from "../../../services/data.service";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.css']
})
export class NewLocationComponent {
  @Output() locationAdded = new EventEmitter<string>();

  errorMessages: string[] = [];

  loc: any;

  myForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder, private auth: AuthService) {

    this.auth.locations1$.subscribe(locations => {
      this.loc = locations;
      // Оновлення інтерфейсу користувача з оновленими даними про локації
    });



    this.myForm = this.fb.group({
      name: this.fb.control('', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z _а-яА-ЯіІїЇєЄ]+$/),
        (control: AbstractControl) => {
          const value = control.value.trim();
          const exists = this.loc.some((e: { name: any; }) => e.name === value);
          return exists ? {duplicate: true} : null;
        }
      ]),
    });
  }


  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value.name)
      // this.auth.createLocations(this.myForm.value.name);
      this.auth.fetchCreateLocation(this.myForm.value.name);
      // console.log(this.myForm.value.name)
      // this.dataService.addItemToLocations(this.myForm.controls['location'].value);
    }
  }
}
