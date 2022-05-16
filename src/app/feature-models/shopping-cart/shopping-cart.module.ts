import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CartItemComponent } from './cart-item/cart-item/cart-item.component';
import { BookDetailCartPopoverComponent } from './components/book-detail-cart-popover/book-detail-cart-popover.component';
import { WishlistPopoverComponent } from './components/wishlist-popover/wishlist-popover.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    CartItemComponent,
    BookDetailCartPopoverComponent,
    WishlistPopoverComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule
  ]
})
export class ShoppingCartModule { }
