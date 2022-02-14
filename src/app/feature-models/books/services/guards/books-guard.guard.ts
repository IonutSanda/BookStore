import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BookService } from '../book.service';

@Injectable({
  providedIn: 'root'
})
export class BooksGuardGuard implements CanActivate {

  constructor(private bookService: BookService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const bookId = route.params['id'];
      const book$ = this.bookService.getBookById(bookId);

      return book$.pipe(
        map(data => !!data),
        tap(bookExists => {
          if(!bookExists){
            this.router.navigate(['books']);
          }
        })
      );
  }


  
}
