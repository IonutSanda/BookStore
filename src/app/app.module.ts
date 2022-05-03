import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { BooksListComponent } from './feature-models/books/components/books-list/books-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BookComponent } from './feature-models/books/components/book/book.component';
import { BookDetailsComponent } from './feature-models/books/components/book-details/book-details.component';
import { BookModule } from './feature-models/books/book.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ShoppingCartModule } from './feature-models/books/services/popover-services/shopping-cart.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BookModule,
    ShoppingCartModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
