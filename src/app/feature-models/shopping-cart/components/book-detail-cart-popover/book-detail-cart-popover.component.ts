import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookModel } from 'src/app/feature-models/books/models/book.model';

@Component({
  selector: 'app-book-detail-cart-popover',
  templateUrl: './book-detail-cart-popover.component.html',
  styleUrls: ['./book-detail-cart-popover.component.scss']
})
export class BookDetailCartPopoverComponent implements OnInit {

  @Input() book: BookModel;
  @Output() deleteBook = new EventEmitter<BookModel>();
  constructor() { }

  ngOnInit(): void {
  }

  emitBook(){
    this.deleteBook.emit(this.book);
  }

}
