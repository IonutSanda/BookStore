import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookComponent } from './components/book/book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FilterPipe } from './services/pipes/filter.pipe';
import { OrderByPipe } from './services/pipes/order-by.pipe'
import { BookLoaderComponent } from 'src/app/shared/components/book-loader/book-loader.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BooksListComponent,
    BookComponent,
    BookDetailsComponent,
    BookAddComponent,
    BookEditComponent,
    BookFormComponent,
    FilterPipe,
    OrderByPipe
  ],
  imports: [
    SharedModule,
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot()
  ]
})
export class BookModule { }
