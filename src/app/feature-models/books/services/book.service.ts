import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAIN_ENDPOINTS } from 'src/app/constants/endpoints';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { BookModel } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseBookUrl = environment.firebase.databaseURL + MAIN_ENDPOINTS.books;

  private bookAuthors = new Set<String>();

  constructor(private http: HttpClient) {}

  public getBooks(){
    const getBooksUrl = `${this.baseBookUrl}${MAIN_ENDPOINTS.json}`;

    return this.http.get<{ [key: string]: BookModel }>(getBooksUrl).pipe(
      map((books)=>{
        const booksArray: BookModel[] = [];
        for(const key in books){
          if(books.hasOwnProperty(key)){
            booksArray.push({...books[key], id: key});
            this.bookAuthors.add(books[key].author);
          }
        }
        return booksArray;
      })
    );
  }

  public getBooksAuthors(): Set<String> {
    const getBooksUrl = `${this.baseBookUrl}${MAIN_ENDPOINTS.json}`;
    this.http
      .get<BookModel>(getBooksUrl)
      .pipe(tap((books) => this.bookAuthors.add(books.author)));

    return this.bookAuthors;
  }

  public getBookById(bookId: string){
    const url = `${this.baseBookUrl}/${bookId}${MAIN_ENDPOINTS.json}`;

    return this.http.get<BookModel>(url);
  }

  public addBook(book: BookModel){
    const url = `${this.baseBookUrl}/${MAIN_ENDPOINTS.json}`;
    
    return this.http.post<any>(url, book);
  }
  
  public deleteBook(bookId: string){
    const deleteBookurl = `${this.baseBookUrl}/${bookId}${MAIN_ENDPOINTS.json}`;

    return this.http.delete<any>(deleteBookurl);
  }

  public editBook(bookId: string, book: BookModel){
    const updateBookUrl = `${this.baseBookUrl}/${bookId}${MAIN_ENDPOINTS.json}`;
    return this.http.put(updateBookUrl, book);
  }
}
