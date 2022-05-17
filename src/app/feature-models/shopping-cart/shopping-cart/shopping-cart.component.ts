import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/utility/loading.service';
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
    subtotalPrice: 0,
    numberOfProducts: 0
  };

  books: BookModel[] = [];
  isLoadingData$: Observable<boolean>;

  private products = new BehaviorSubject<CartModel>(this.cartBook);
  public products$ = this.products.asObservable();

  constructor(private shoppingCartService: ShoppingCartService, private loadingService: LoadingService) { }

  public userId = '';

  ngOnInit(): void {
    this.loadingService.show();
    this.isLoadingData$ = this.loadingService.loading$;

  }

}
