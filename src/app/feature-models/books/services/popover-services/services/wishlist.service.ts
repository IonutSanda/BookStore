import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';
import { MAIN_ENDPOINTS } from 'src/app/constants/endpoints';
import { environment } from 'src/environments/environment';
import { BookModel } from '../../../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  public wishlistBooks: BookModel[] = [];

  private baseBookUrl = environment.firebase.databaseURL + MAIN_ENDPOINTS.users;
  private userId: string;
  private wishlistProducts = new BehaviorSubject<BookModel[]>(this.wishlistBooks);
  public wishlistProducts$ = this.wishlistProducts.asObservable();

  constructor(private http: HttpClient) { }

  public addBookToWishlist(book: BookModel, bookId: string){
    const addBookToWishlistUrl = `${this.baseBookUrl}/${this.userId}/wishlist${MAIN_ENDPOINTS.json}`

    book.productId = bookId;
    this.wishlistBooks = [...this.wishlistBooks, book];
    this.wishlistProducts.next(this.wishlistBooks);

    return this.http.post(addBookToWishlistUrl, book);
  }

  deleteBookFromWishlist(bookId: string){
    const deleteBookFromWishlistUrl = `${this.baseBookUrl}/${this.userId}/wishlist${MAIN_ENDPOINTS.json}`;
    this.wishlistBooks = [...this.wishlistBooks.filter(book => book.productId != bookId)];
    this.wishlistProducts.next(this.wishlistBooks);
    return this.http.put(deleteBookFromWishlistUrl, this.wishlistBooks);
  }

  getBooksFromDatabase(userId: string): Observable<BookModel[]>{
    const getBooksFromDatabaseUrl = `${this.baseBookUrl}/${this.userId}/wishlist${MAIN_ENDPOINTS.json}`;
    return this.http.get<BookModel[]>(getBooksFromDatabaseUrl);
  }

  getBooksFromWishlist():Observable<BookModel[]>{
    const getBooksFromWishlistUrl = `${this.baseBookUrl}/${this.userId}/wishlist${MAIN_ENDPOINTS.json}`;

    return this.http.get<{[key:string]: BookModel}>(getBooksFromWishlistUrl).pipe(
      map((data) => {
        let booksArray: BookModel[] = [];
        for(const key in data){
          if(data.hasOwnProperty(key)){
            booksArray = [...this.wishlistBooks, {...data[key], id: key}];
          }
        }
        return booksArray;
      })
    );
  }

  getBooksFromWishlistArray(books: BookModel[]): Observable<BookModel[]>{
    for(const key in books){
      if(books.hasOwnProperty(key)){
        this.wishlistBooks = [...this.wishlistBooks, {...books[key], id: key}];
        this.wishlistProducts.next(this.wishlistBooks);
      }
    }
    return this.wishlistProducts$;
  }

  clearWishlist(){
    this.wishlistProducts.next([]);
    this.wishlistBooks = [];
  }

  isBookInWishlist(addedBookId: string):boolean{
    if(this.wishlistBooks.length === 0) return false;
    return this.wishlistBooks.some((book) => book.productId === addedBookId);
  }

  setUserId(id: string){
    this.userId = id;
  }
}
