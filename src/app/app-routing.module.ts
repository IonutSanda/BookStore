import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'books',
    loadChildren: () =>
      import('./feature-models/books/book.module').then((m) => m.BookModule),
  },
  {
    path: 'shoppingcart',
    loadChildren: () =>
      import('./feature-models/books/services/popover-services/shopping-cart.module').then((m) => m.ShoppingCartModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
