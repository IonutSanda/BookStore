import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { regex } from 'src/app/constants/regex';
import { LoadingService } from 'src/app/core/services/utility/loading.service';
import { ValidatorsService } from 'src/app/shared/components/services/validators.service';
import { UserModel } from '../../models/user-model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
// import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isLoadingData$: Observable < boolean > ;
  currentUserObs$: Observable < UserModel > = this.auth.users$;
  user: any;
  private userId: string;

  profileForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.pattern(regex.firstName)]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.pattern(regex.lastName)]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern(regex.email)],
      asyncValidators: [this.validatorService.emailValidator()],
      updateOn: 'blur'
    }),
  })

  constructor(private loadingService: LoadingService, private validatorService: ValidatorsService, private auth: AuthService, private userService: UserService) {
    this.isLoadingData$ = loadingService.loading$;
  }

  

  ngOnInit(): void {
    this.loadingService.show();
    this.getUserData();
    this.loadingService.hide();
  }

  getUserData() {
    this.currentUserObs$
      .pipe(
        switchMap((data) => {
          this.userId = data.id;
          return this.auth.getUserById(data.id);
        })).subscribe((data) => {
        this.user = data;
      })
  }

  submit() {
    this.userService.updateUserProfile(this.userId, this.profileForm.value)
      .subscribe(() => console.log('E-mail updated'));      
  }

  isValid() {
    if (this.profileForm.valid) {
      return true
    } else {
      return false;
    }
  }
}
