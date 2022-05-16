import { HttpClient } from '@angular/common/http';
import { REFERENCE_PREFIX } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MAIN_ENDPOINTS } from 'src/app/constants/endpoints';
import { environment } from 'src/environments/environment';
import { BookModel } from '../../books/models/book.model';
import { CartModel } from '../model/cart-model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private baseBookUrl = environment.firebase.databaseURL + MAIN_ENDPOINTS.users;

  cartBooks: CartModel = {
    books: [],
    numberOfProducts: 0,
    subtotalPrice: 0
  };

  books: BookModel[] = [];
  bookId: any;
  private userId: string;

  private products = new BehaviorSubject<CartModel>(this.cartBooks);
  public products$ = this.products.asObservable();

  constructor(private http: HttpClient) { }

  setUserId(id: string){
    this.userId = id;
  }

  getDataFromDatabase(data: CartModel){
    if(data.numberOfProducts === 0){
      this.products.next(data);
    } else {
      this.cartBooks = {...data};
      this.products.next(data);
      this.books = Object.values(this.cartBooks.books);
    }
  }

  setCartBehaviourSubject(cartBook: CartModel){
    this.products.next(cartBook);
  }

  addProduct(book: BookModel, id: string){
    book = { ...book, quantity: 1, productId: id};

    if(this.objectExists(book)){
      const key = this.getKeyByValue(this.books, book);
      this.books[key].quantity = this.books[key].quantity + 1;
      this.addBookToCart(book.price, 1).subscribe((res) => {
        console.log('Book has been added');
      });
    }

    this.products.next(this.cartBooks);
  }

  addBookToCart(price: number, product: number){
    const addBookUrl = `${this.baseBookUrl}/${this.userId}${MAIN_ENDPOINTS.cart}${MAIN_ENDPOINTS.json}`

    this.cartBooks = {
      books: {...this.books},
      numberOfProducts: this.cartBooks.numberOfProducts + +product,
      subtotalPrice: this.cartBooks.subtotalPrice + +price
    };
    return this.http.put(addBookUrl, this.cartBooks);
  }

  deleteProduct(product: BookModel){
    this.books = this.books.filter((book) => {
      book.title != product.title;
    });
    this.cartBooks.books = {...this.books};
    this.cartBooks.numberOfProducts = this.cartBooks.numberOfProducts - +product.quantity;
    this.cartBooks.subtotalPrice = this.cartBooks.subtotalPrice - product.price * +product.quantity;
  
    this.updateCart(this.cartBooks).subscribe((res)=> {
      console.log('Book has been deleted');
    });
    this.products.next(this.cartBooks);

  }

  deleteCart(id: string){
    const deleteCartUrl = `${this.baseBookUrl}/${id}${MAIN_ENDPOINTS.cart}${MAIN_ENDPOINTS.json}`;

    this.books = [];
    this.cartBooks = {
      books: [],
      numberOfProducts: 0,
      subtotalPrice: 0
    }

    return this.http.put(deleteCartUrl, {
      cart: [],
      numberOfProducts: 0,
      subtotalPrice: 0
    })
  }

  resetBooksCart(){
    this.cartBooks = {
      books: [],
      numberOfProducts: 0,
      subtotalPrice: 0
    };

    this.products.next(this.cartBooks);
  }

  updateCart(cartBook: CartModel){
    const updateCartUrl = `${this.baseBookUrl}/${this.userId}${MAIN_ENDPOINTS.cart}${MAIN_ENDPOINTS.json}`

    return this.http.put(updateCartUrl, cartBook);
  }

  getCartFromDatabase(id: string){
    const getCartFromDatabaseUrl = `${this.baseBookUrl}/${id}${MAIN_ENDPOINTS.cart}${MAIN_ENDPOINTS.json}`

    return this.http.get<CartModel>(getCartFromDatabaseUrl);
  }

  getKeyByValue(object: any, book: BookModel): any {
    return Object.keys(object).find((key) => object[key].title === book.title);
  }

  objectExists(newbook: BookModel):boolean{
    return Object.values(this.cartBooks?.books).some((book)=> {
      book.title.includes(newbook.title);
    })
  }
}
