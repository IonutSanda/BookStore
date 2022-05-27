import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserModel } from 'src/app/feature-models/auth/models/user-model';
import { AuthService } from 'src/app/feature-models/auth/services/auth.service';
import { BookModel } from 'src/app/feature-models/books/models/book.model';
import { CartModel } from 'src/app/feature-models/shopping-cart/model/cart-model';
import { ShoppingCartService } from 'src/app/feature-models/shopping-cart/services/shopping-cart.service';
import { WishListService } from 'src/app/feature-models/shopping-cart/services/wish-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isActivatedAccountMenu = false;
  isActivatedCartMenu = false;
  isActivatedWishlist = false;
  isActivatedSearchBar = false;
  isMobileVersion = false;
  isAuthenticated = false;
  isAuthenticatedSubscription: Subscription;
  productsNumber: number;
  searchText: string;
  cartBooks$ = this.addToCartService.products$;
  currentUser: Observable<UserModel> = this.authService.users$;
  wishlistBooks: Observable<BookModel[]>;
  subTotalPrice = 0;
  user: UserModel;
  private userId: string;

  cartBooks: CartModel = {
    books: [],
    numberOfProducts: 0,
    subtotalPriceProducts: 0
  };

  constructor(private wishlistSerivce: WishListService, private authService: AuthService, private addToCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.isAuthenticatedSubscription = this.authService.isUserAuthenticated().subscribe(authStatus => {
      this.isAuthenticated = authStatus;
      console.log(`IsAuth: ${this.isAuthenticated}`);
      console.log(`authStatus: ${authStatus}`);
    });

    this.authService.users$.pipe(
      switchMap((isAuthenticated) => {
        this.userId = isAuthenticated.id;
        this.wishlistSerivce.setUserId(isAuthenticated.id);
        return this.wishlistSerivce.getBooksFromDatabase(isAuthenticated.id);
      })
    ).subscribe(data => {
      if(!!this.userId) { this.wishlistBooks = this.wishlistSerivce.getBooksFromWishlistArray(data);}
    });

    this.authService.users$.pipe(
      switchMap((isAuthenticated)=>{
        this.addToCartService.setUserId(isAuthenticated.id);
        return this.addToCartService.getCartFromDatabase(isAuthenticated.id);
      })
    ).subscribe((data) => this.addToCartService.getDataFromDatabase(data));
  }

  transformFromObjectToArray(val: BookModel[]){
    return Object.values(val);
  }

  subtotalPriceWithFormatCurrency(total:number){
    return total.toLocaleString('ro-RO', {
      style: 'currency',
      currency: 'RON',
    });
  }

  toggleSearchBar(){
    this.isActivatedSearchBar = !this.isActivatedCartMenu;
  }

  toggleAccountMenu(){
    this.isActivatedAccountMenu = !this.isActivatedAccountMenu;
  }

  toggleWishlistMenu(){
    this.isActivatedWishlist = !this.isActivatedWishlist;
  }

  toggleCartMenu(){
    this.isActivatedCartMenu = !this.isActivatedCartMenu;
  }

  toggleHamburgerMenu(){
    this.isMobileVersion = !this.isMobileVersion;
  }

  closeAccountMenu(){
    this.isActivatedAccountMenu = false;
  }

  deleteProduct(product: BookModel){
    this.addToCartService.deleteProduct(product);
  }

  deleteFromWishlist(bookToDelete: BookModel): void{
    this.wishlistSerivce.deleteBookFromWishlist(bookToDelete.productId).subscribe();
  }

  onLogout(){
    this.wishlistSerivce.clearWishlist();
    this.authService.logout();
  }

  ngOnDestroy(){
    this.isAuthenticatedSubscription.unsubscribe();
  }

}
