import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { WishlistPopoverComponent } from './components/wishlist-popover/wishlist-popover.component';
import { BookCartPopoverComponent } from './components/book-cart-popover/book-cart-popover.component';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    CartItemComponent,
    WishlistPopoverComponent,
    BookCartPopoverComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule
  ],
  exports: [
    BookCartPopoverComponent,
    WishlistPopoverComponent
  ]
})
export class ShoppingCartModule { }
