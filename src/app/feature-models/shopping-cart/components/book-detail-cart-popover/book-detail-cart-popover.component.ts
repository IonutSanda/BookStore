import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/feature-models/books/models/book.model';

@Component({
  selector: 'app-book-detail-cart-popover',
  templateUrl: './book-detail-cart-popover.component.html',
  styleUrls: ['./book-detail-cart-popover.component.scss']
})
export class BookDetailCartPopoverComponent implements OnInit {

  @Input() book: BookModel;
  @Output() deleteBook = new EventEmitter<BookModel>();
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  emitBook(){
    this.deleteBook.emit(this.book);
  }

  changeRoute(bookid: string){
    this.route.navigateByUrl(`/books/${bookid}`);
  }
}
