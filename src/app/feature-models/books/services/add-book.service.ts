import { HttpClient } from '@angular/common/http';
import { Injectable, KeyValueDiffers } from '@angular/core';
import { map, Subject } from 'rxjs';
import { MAIN_ENDPOINTS } from 'src/app/constants/endpoints';
import { environment } from 'src/environments/environment';
import { BookModel } from '../models/book.model';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {

  private baseBookUrl = environment.firebase.databaseURL + MAIN_ENDPOINTS.books;

  private addedBookSubject = new Subject<BookModel>();
  
  addedBookAction$ = this.addedBookSubject.asObservable();

  constructor(bookService: BookService, private http:HttpClient) { }
  
  updateBookList(newBook: BookModel){
    this.addedBookSubject.next(newBook);
  }

  public getBooks(){
    const getBooksUrl = `${this.baseBookUrl}${MAIN_ENDPOINTS.json}`;

    return this.http.get<{ [key:string]: BookModel }>(getBooksUrl).pipe(
      map((books) => {
        const booksArray: BookModel[] = [];
        for(const key in books){
          if(books.hasOwnProperty(key)){
            booksArray.push({...books[key], id: key})
          }
        }

        for(let i = 0; i <= booksArray.length - 1; i++){
          this.addedBookSubject.next(booksArray[i]);
        }
      })
    );
  }

  addBook(book: BookModel){
    this.addedBookSubject.next(book);
  }

}
