import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/utility/loading.service';
import { AuthService } from '../../auth/services/auth.service';
import { BookModel } from '../../books/models/book.model';
import { CartModel } from '../model/cart-model';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartBook: CartModel = {
    books: [],
    numberOfProducts: 0,
    subtotalPriceProducts: 0
  };

  books: BookModel[] = [];
  isLoadingData$: Observable<boolean>;

  private products = new BehaviorSubject<CartModel>(this.cartBook);
  public products$ = this.products.asObservable();

  constructor(private shoppingCartService: ShoppingCartService, private loadingService: LoadingService, private authService: AuthService) { }

  public userId = '';

  ngOnInit(): void {
    this.loadingService.show();
    this.isLoadingData$ = this.loadingService.loading$;

    this.authService.users$
      .pipe(switchMap((data) => {
        return this.shoppingCartService.getCartFromDatabase(data.id);
      }))
      .subscribe((data) => {
        this.cartBook = data;
        this.books = Object.values(this.cartBook.books);
        this.loadingService.hide();
      })

  }

  transformFromObjectToArray(val: any){
    return Object.values(val);
  }

  deleteBook(book: BookModel){
    this.shoppingCartService.deleteProduct(book);
    this.books = this.books.filter((book) => book.title !== book.title);
    this.cartBook.books = this.books;
    this.cartBook.subtotalPriceProducts = this.cartBook.subtotalPriceProducts - book.price * +book.quantity;
    this.cartBook.numberOfProducts = this.cartBook.numberOfProducts - +book.quantity;
    this.products.next(this.cartBook);
  }


}
