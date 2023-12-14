import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginFormComponent>,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: this.fb.control('Valeram', [Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^(?=.*[a-zA-Z]).{3,}$/),
      ]),
      password: this.fb.control('Aa1!aaaa', [Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,30}$/),
      ]),
    });
  }


  loginClient(data: any) {
    this.auth.login(JSON.stringify(data))
  }

  onSubmit() {
    this.loginClient(this.loginForm.value)
    // if (this.loginForm.invalid) {
    //   console.log(this.loginForm.value)
    //   return this.dialogRef.close();
    // }
    this.dialogRef.close();
  }
}
