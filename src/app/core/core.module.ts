import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClickOutsideDirective } from './navbar/directives/click-outside.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRoutingModule } from '../feature-models/books/book-routing.module';
import { ShoppingCartModule } from '../feature-models/shopping-cart/shopping-cart.module';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookRoutingModule,
    ShoppingCartModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent
  ]
})
export class CoreModule { }
