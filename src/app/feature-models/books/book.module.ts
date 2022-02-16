import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookComponent } from './components/book/book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';

@NgModule({
  declarations: [
    BooksListComponent,
    BookComponent,
    BookDetailsComponent,
    BookAddComponent,
    BookEditComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
