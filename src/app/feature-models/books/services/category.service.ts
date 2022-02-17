import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MAIN_ENDPOINTS } from 'src/app/constants/endpoints';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseBookUrl = environment.onlineBookStoreServer.databaseURL + MAIN_ENDPOINTS.categories;

  constructor(private http: HttpClient) { }

  public getCategories(){

    const url = `${this.baseBookUrl}${MAIN_ENDPOINTS.json}`

    return this.http.get<{[key: string]: CategoryModel}>(url).pipe(
      map((categories) => {
        const categoryArray: CategoryModel[] = [];
        for(const key in categories){
          if(categories.hasOwnProperty(key)){
            categoryArray.push({...categories[key],id:key});
          }
        }
        return categoryArray;
      })
    )
  }

  public getCategoriesName(){
    
    const url = `${this.baseBookUrl}${MAIN_ENDPOINTS.json}`;

    return this.http.get<{ [key: string]: CategoryModel }>(url).pipe(
      map((categories) => {
        const  categoryArray: String[] = [];
        for (const key in categories) {
          if (categories.hasOwnProperty(key)) {
            categoryArray.push(categories[key].categoryName);
          }
        }
        return categoryArray;
      }))

  }
}
