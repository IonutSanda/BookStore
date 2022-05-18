import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl, AsyncValidatorFn, FormControl } from '@angular/forms';
import { BookLoadingService } from 'src/app/core/services/utility/book-loading.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(private afAuth: AngularFireAuth, private loadingService: BookLoadingService) { }

  numberValidator(control: FormControl): {[key: string]: boolean} | null {
    const value = control.value;

    if(!/[0-9]+/.test(value)) return {hasNotNumber: true};
    return null;
  }

  capitalCaseValidator(control: FormControl): {[key: string] : boolean} | null {
    const value = control.value;

    if(!/[A-Z]+/.test(value)) return {hasNoUpperCase: true};
    
    return null;
  }

  lowerCaseValidator(control: FormControl): {[key: string] : boolean} | null {
    const value = control.value;

    if(!/[a-z]+/.test(value)) return {hasNoLowerCase: true};
    
    return null;
  }

  specialCharacterValidator(control: FormControl): {[key: string] : boolean} | null {
    const value = control.value;

    if(!/[$&+,:;=?@#|'<>.^*()%!-]+/.test(value)) return {hasNoSpecialCharacter: true};
    
    return null;
  }

  passwordConfirm(form: AbstractControl): {[key: string]:boolean} | null {
    if(form.get('password')?.value !== form.get('confirmPassword')?.value){
      return {isNotMatching: true};
    }
    return null;
  }

  checkedTermsValidator(control: AbstractControl): {[key: string]: boolean} | null {
    if(!control.get('confirmTerms')?.valid) return {isNotChecked: true};

    return null;
  }

  searchEmail(email: string): Promise<any>{
    return this.afAuth.fetchSignInMethodsForEmail(email);
  }

  emailValidator(): AsyncValidatorFn{
    return (
      control: AbstractControl
    ): Promise<{[key: string]:boolean} | null> => {
      this.loadingService.show();
      return this.searchEmail(control.value).then((res) => {
        this.loadingService.hide();
        return res.length > 0 ? {emailExist: true} : null;
      });
    };
  }
}
