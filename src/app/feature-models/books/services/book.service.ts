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

  private baseBookUrl = environment.onlineBookStoreServer.databaseURL + MAIN_ENDPOINTS.books;

  private bookAuthors = new Set<String>();

  constructor(private http: HttpClient) { }

  public getBooks(){
    const getBooksUrl = `${this.baseBookUrl}${MAIN_ENDPOINTS.json}`;

    return this.http.get<{ [key: string]: BookModel }>(getBooksUrl).pipe(
      map((books)=>{
        const booksArray: BookModel[] = [];
        for(const key in books){
          if(books.hasOwnProperty(key)){
            booksArray.push({...books[key], id: key});
          }
        }
        return booksArray;
      })
    );
  }

  public getBookById(bookId: string){
    const url = `${this.baseBookUrl}/${bookId}${MAIN_ENDPOINTS.json}`;

    return this.http.get<BookModel>(url);
  }

  public addBook(book: BookModel){
    const url = `${this.baseBookUrl}/${MAIN_ENDPOINTS.json}`

    return this.http.post<any>(url, book);
  }

  public editBooK(bookId: string, book: BookModel){
    const updateBookUrl = `${this.baseBookUrl}/${bookId}${MAIN_ENDPOINTS.json}`;
    return this.http.put(updateBookUrl, book);
  }

  public getAuthors(): Set<String>{

    const getBooksUrl = `${this.baseBookUrl}${MAIN_ENDPOINTS.json}`;

    this.http
      .get<BookModel>(getBooksUrl)
      .pipe(tap((books) => this.bookAuthors.add(books.authors)));
    return this.bookAuthors;
  }
}
