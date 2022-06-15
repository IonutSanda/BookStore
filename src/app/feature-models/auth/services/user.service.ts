import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MAIN_ENDPOINTS } from 'src/app/constants/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) { }

  private baseBookUrl = environment.firebase.databaseURL + MAIN_ENDPOINTS.users;

  updateUserProfile(userId: string, userInfo: any){
    const updateUserProfileUrl = `${this.baseBookUrl}/${userId}${MAIN_ENDPOINTS.json}`
    return this.http.put(updateUserProfileUrl, userInfo)
  }


}
