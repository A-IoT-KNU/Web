import {Component, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {


  private backendUrl = 'http://localhost:8080/';


  registerClient(data: any) {
    this.auth.signUp(JSON.stringify(data))

  }


  registerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^(?=.*[a-zA-Z]).{3,}$/),
      ]),
      lastName: this.fb.control('', [Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^(?=.*[a-zA-Z]).{3,}$/),
      ]),
      email: this.fb.control('', [Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/),
      ]),
      username: this.fb.control('', [Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^(?=.*[a-zA-Z]).{3,}$/),
      ]),
      password: this.fb.control('', [Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,30}$/),
      ]),
    });
  }

  onSubmit() {

    this.registerClient(this.registerForm.value)
    this.dialogRef.close();
  }
}
