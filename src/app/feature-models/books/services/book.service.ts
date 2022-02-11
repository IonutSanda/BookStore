import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAIN_ENDPOINTS } from 'src/app/constants/endpoints';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseBookUrl = environment.onlineBookStoreServer.databaseURL + MAIN_ENDPOINTS.books;

  constructor(private http: HttpClient) { }

  public getBooks(){
    const getBooksUrl = `${this.baseBookUrl}${MAIN_ENDPOINTS.json}`;

    return this.http.get<{ [key: string]: any }>(getBooksUrl).pipe(
      map((books)=>{
        const booksArray: any[] = [];
        for(const key in books){
          if(books.hasOwnProperty(key)){
            booksArray.push({...books[key], id: key});
          }
        }
        return booksArray;
      })
    );
  }

}
