import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [

  {
    path: 'books',
    loadChildren: () =>
      import('./feature-models/books/book.module').then((m) => m.BookModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./feature-models/auth/auth.module').then((m) => m.AuthModule),
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
