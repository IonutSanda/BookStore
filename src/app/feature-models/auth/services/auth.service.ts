import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, defer, of, throwError } from 'rxjs';
import { MAIN_ENDPOINTS } from 'src/app/constants/endpoints';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user-model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthResponseModel } from '../models/auth-response-model';
import { tap, map, switchMap } from 'rxjs/operators';
import { roles } from 'src/app/constants/roles';
import { RegisterDataModel } from '../models/register-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseBookUrl = environment.firebase.databaseURL + MAIN_ENDPOINTS.users;
  private users = new BehaviorSubject<UserModel>(<UserModel>{});
  public users$ = this.users.asObservable();

  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string){
    return this.http.post<AuthResponseModel>(MAIN_ENDPOINTS.login, {
      email: email,
      password: password,
      returnSecureToken: true,
    })
    .pipe(
      catchError((errResponse) => {
        console.log(errResponse);
        let errorMessage = "An unknown error occured!";

        if(!errResponse.error || !errResponse.error.error){
          return throwError(()=> new Error(errorMessage));
        } else {
          errorMessage = "Email or password incorrect!";
        }
        return throwError(() => new Error(errorMessage));
      }),
      tap((resData) => {
        this.saveUserData(
          email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  autoLogin(){
    const cookieStorage = document.cookie.split(';');
    let idToken;
    if(cookieStorage.length == 2){
      idToken = cookieStorage[1].split('=')[1];
    } else {
      idToken = cookieStorage[0].split('=')[1];
    }
    if(!idToken){
      return of(<UserModel>{});
    }
    return this.getUserData(idToken);
  }

  getUserData(idToken: string){
    return this.http.post<any>(MAIN_ENDPOINTS.userData, {
      idToken: idToken,
    });
  }

  getUserById(userId: string){
    const getUserByIdUrl = `${this.baseBookUrl}/${userId}${MAIN_ENDPOINTS.json}`
    return this.http.get<RegisterDataModel>(getUserByIdUrl);
  }

  getUserId(){
    const idToken = this.getToken();
    console.log('idToken auth service')
    console.log(idToken);
    this.getUserData(idToken);

  }

  createUser(email: string, password: string, userData: RegisterDataModel){
    return defer(async () => {
      const createUser = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return createUser.user;
    }).pipe(
      switchMap((user) => {
        return this.addUserToDatabase({
          ...userData,
          userId: user?.uid,
          cart: {
            numberOfProducts: 0,
            subtotalPriceProducts: 0
          },
        },
        user?.uid);
      })
    );
  }

  private addUserToDatabase(user: RegisterDataModel, id: string | undefined){
    const addToDatabaseUrl = `${this.baseBookUrl}/${id}${MAIN_ENDPOINTS.json}`;
    return this.http.put(addToDatabaseUrl, user);
  }

  saveUserData(email: string, localId: string, idToken: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const currentUser: UserModel = {
      email: email,
      id: localId,
      token: idToken,
      tokenExpiryDate: expirationDate,
    };
    this.checkUserRole(currentUser).subscribe((admin) => {
      if(admin) { 
        currentUser.role = roles.ADMIN;
      } else {
        currentUser.role = roles.USER;
      }

      this.users.next(currentUser);
    });

    this.autoLogout(expiresIn * 1000);
    document.cookie = 'token' + '=' + idToken + ';';
  }

  checkUserRole(user: UserModel){
    return this.http.get<any>(environment.firebase.databaseURL + MAIN_ENDPOINTS.role + MAIN_ENDPOINTS.json)
      .pipe(
        map((admin) => {
          const isAdmin = user.email == admin.email ? true : false;
          if(isAdmin) return true;
          else return false;
        })
      );
  }

  isUserAuthenticated(){
    return this.users$.pipe(
      map((user) => {
        const isAuthenticated = !!Object.keys(user).length;
        if(isAuthenticated) return true;
        else return false;
      })
    );
  }

  isCurrentUserAdmin(){
    return this.users$.pipe(
      map((user) => {
        const isAdmin = user.role == 'ADMIN' ? true : false;
        if(isAdmin) return true;
        else return false;
      })
    )
  }

  getToken(){
   const cookieStorage = document.cookie.split('=');
   return cookieStorage[0].split('=')[1]; 
  }

  logout(){
    this.users.next(<UserModel>{});
    this.deleteAllCookies();
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/books']);
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  deleteAllCookies(){
    var cookies = document.cookie.split(';');
    
    for(var i = 0; i <= cookies.length; i++){
      var cookie = cookies[i];
      var eqPos = cookie.indexOf('=');
      var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Tue, 01 Jan 1970 00:00:00 GMT';
    }
  }
}
