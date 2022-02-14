import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksListComponent } from './components/books-list/books-list.component';

const routes: Routes = [

  {
    path: '',
    component: BooksListComponent
  },
  {
    path: 'books',
    component: BooksListComponent
  },
  {
    path: ':id',
    component: BookDetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
