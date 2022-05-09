import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookModel } from 'src/app/feature-models/books/models/book.model';

@Component({
  selector: 'app-book-cart-popover',
  templateUrl: './book-cart-popover.component.html',
  styleUrls: ['./book-cart-popover.component.scss']
})
export class BookCartPopoverComponent implements OnInit {

  @Input() book: BookModel;
  @Output() deleteBook = new EventEmitter<BookModel>();
  constructor() { }

  ngOnInit(): void {
  }

  emitBook(){
    this.deleteBook.emit(this.book);
  }

}
