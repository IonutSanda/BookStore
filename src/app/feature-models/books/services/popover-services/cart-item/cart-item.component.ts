import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookModel } from '../../../models/book.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() book: any;
  @Output() deleteBook = new EventEmitter<BookModel>();
  showMore: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  emitBook(){
    this.deleteBook.emit(this.book);
  }

  toggleShowMore(){
    this.showMore = !this.showMore;
  }

}
