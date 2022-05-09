import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MAIN_ENDPOINTS } from 'src/app/constants/endpoints';
import { environment } from 'src/environments/environment';
import { BookModel } from '../../../models/book.model';
import { CartModel } from '../models/cart-model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private baseBookUrl = environment.onlineBookStoreServer + MAIN_ENDPOINTS.users;

  cartBooks: CartModel = {
    books: [],
    numberOfProducts: 0,
    subTotalPrice: 0
  };

  books: BookModel[] = [];
  bookId: any;

  private userId: string;
  private products = new BehaviorSubject<CartModel>(this.cartBooks);
  private products$ = this.products.asObservable();

  constructor(private http: HttpClient) { }

  setUser(id: string){
    this.userId = id;
  }
}
