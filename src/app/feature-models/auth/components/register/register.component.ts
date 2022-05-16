import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { regex } from 'src/app/constants/regex';
import { BookLoadingService } from 'src/app/core/services/utility/book-loading.service';
import { LoadingService } from 'src/app/core/services/utility/loading.service';
import { ValidatorsService } from 'src/app/shared/components/services/validators.service';
import { RegisterDataModel } from '../../models/register-model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  
  registerForm = new FormGroup(
    {
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.pattern(regex.firstName)]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.pattern(regex.lastName)]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern(regex.email)],
      asyncValidators: [this.validatorService.emailValidator()],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        this.validatorService.numberValidator.bind(this),
        this.validatorService.capitalCaseValidator.bind(this),
        this.validatorService.lowerCaseValidator.bind(this),
        this.validatorService.specialCharacterValidator.bind(this)
      ],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required]
    }),
  },
  {
    validators: [this.validatorService.passwordConfirm.bind(this)],
    updateOn: 'change',
  });

  disable = false;
  modalRef: BsModalRef;
  items: string[];
  userData: RegisterDataModel;
  isAccepted = false;
  isDisabled = false;
  isLoadingEmail$: Observable<boolean>;
  isLoadingData$: Observable<boolean>;

  constructor(private validatorService: ValidatorsService, private modalService: BsModalService, private authService: AuthService, private router: Router, private loadingSpinner: LoadingService, private bookLoading: BookLoadingService) { 

    this.items = Array(15).fill(0);
    this.isLoadingEmail$ = loadingSpinner.loading$;
    this.isLoadingData$ = bookLoading.loading$;
  }

  ngOnInit(): void {
  }

  submit(){
    this.bookLoading.show();

    this.authService.createUser(
      this.registerForm.value.email,
      this.registerForm.value.password,
      {
        ...this.userData,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
      }
    ).subscribe(() => {
      this.registerForm.reset();
      this.isAccepted = !this.isAccepted;
      this.isDisabled = true;
      this.bookLoading.hide();
      this.router.navigate(['/books']);
    })
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  closeModal(){
    this.modalRef.hide();
    this.isDisabled = false;
  }

  isValid(){
    if(this.registerForm.valid && this.isAccepted){
      return true;
    } else {
      return false;
    }
  }

}
