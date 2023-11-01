import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from "../../../services/data.service";


@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.css']
})
export class NewLocationComponent {
  @Output() locationAdded = new EventEmitter<string>();

  errorMessages: string[] = [];

loc = this.dataService.getLocations();

myForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {


    this.myForm = this.fb.group({
      location: this.fb.control('', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z _а-яА-ЯіІїЇєЄ]+$/),
        (control: AbstractControl) => {
          const value = control.value.trim();
          const exists = this.loc.some(e => e.value === value);
          return exists ? { duplicate: true } : null;
        }
      ]),
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.dataService.addItemToLocations(this.myForm.controls['location'].value);
    }
  }
}
