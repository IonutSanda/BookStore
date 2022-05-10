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

  getDataFromFirebase(data: CartModel){
    if(data.numberOfProducts === 0){
      this.products.next(data);
    } else {
      this.cartBooks = {...data};
      this.products.next(data);
      this.books = Object.values(this.cartBooks.books);
    }
  }

  public addProduct(book: BookModel, id: string){
    book = {...book, quantity: 1, productId: id};

    if(this.objectExists(book)){
      const key = this.getKeyByValue(this.books, book);
      this.books[key].quantity = this.books[key].quantity + 1;
      this.addBookToCart(book.price, 1).subscribe((res) => {
        console.log("Book has been added");
      });
    } else {
      this.books.push(book);
      this.addBookToCart(book.price, 1).subscribe((res) => {
        console.log("Book has been added");
      });
    }
  }

  public deleteProduct(product: BookModel){
    this.books = this.books.filter((book) => {
      book.title != product.title
    });
    this.cartBooks.books = {...this.books};
    this.cartBooks.subTotalPrice = this.cartBooks.subTotalPrice - product.price * +product.quantity;
    this.cartBooks.numberOfProducts = this.cartBooks.numberOfProducts - +product.quantity;
    this.updateCart(this.cartBooks).subscribe((res)=>{
      console.log("Book has been deleted");
    });
    this.products.next(this.cartBooks);
  }

  addBookToCart(price: number, product: number){
    const addBookUrl = `${this.baseBookUrl}/${this.userId}${MAIN_ENDPOINTS.cart}${MAIN_ENDPOINTS.json}`

    this.cartBooks = {
      books: {...this.books},
      numberOfProducts: this.cartBooks.numberOfProducts + +product,
      subTotalPrice: this.cartBooks.subTotalPrice + +price
    };
    return this.http.put(addBookUrl, this.cartBooks);
  }

  deleteCart(id: string){
    const cartUrl = `${this.baseBookUrl}/${id}${MAIN_ENDPOINTS.cart}${MAIN_ENDPOINTS.json}`;
    
    this.books = [];
    this.cartBooks = {
      books: [],
      subTotalPrice: 0,
      numberOfProducts: 0
    }

    return this.http.put(cartUrl, {
      cart: [],
      subTotalPrice: 0,
      numberOfProducts: 0
    });
  }
  
  sendCartBehaviourSubject(cartBook: CartModel){
    this.products.next(this.cartBooks);
  }

  resetBooksCart(){
    this.cartBooks = {
      books: [],
      numberOfProducts: 0,
      subTotalPrice: 0
    };
    this.products.next(this.cartBooks);
  }

  updateCart(cartBook: CartModel){
    const updateCartUrl = `${this.baseBookUrl}/${this.userId}${MAIN_ENDPOINTS.cart}${MAIN_ENDPOINTS.json}`
    return this.http.put(updateCartUrl, cartBook);
  }

  objectExists(newBook: BookModel): boolean{
    return Object.values(this.cartBooks?.books).some((book) => {
      book.title.includes(newBook.title);
    })
  }

  getKeyByValue(object: any, book: BookModel): any{
    return Object.keys(object).find((key) => {
      object[key].title === book.title;
    })
  }

  getCartFirebase(id: string){
    const cartUrl = `${this.baseBookUrl}/${id}${MAIN_ENDPOINTS.cart}${MAIN_ENDPOINTS.json}`
    return this.http.get<CartModel>(cartUrl);
  }
}
