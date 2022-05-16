import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { regex } from 'src/app/constants/regex';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  
  registerForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.pattern(regex.firstName)]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.pattern(regex.lastName)]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern(regex.email)],
      asyncValidators: [],
      updateOn: 'blur',
    })
  })
  constructor() { }

  ngOnInit(): void {
  }

}
