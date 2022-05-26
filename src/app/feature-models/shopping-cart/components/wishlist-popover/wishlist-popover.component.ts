import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/feature-models/books/models/book.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-wishlist-popover',
  templateUrl: './wishlist-popover.component.html',
  styleUrls: ['./wishlist-popover.component.scss']
})
export class WishlistPopoverComponent implements OnInit {
  @Input() book: BookModel;
  @Output() emitBook = new EventEmitter<BookModel>();

  constructor(private cartService: ShoppingCartService, private route: Router) { }

  ngOnInit(): void {
  }

  addToCart(event: any){
    event.stopPropagation();
    this.cartService.addProduct(this.book, this.book.productId);
  }

  emitBookDelete(){
    this.emitBook.emit(this.book);
  }

  changeRoute(bookId: string){
    this.route.navigateByUrl(`/books/${bookId}`);
  }



}
