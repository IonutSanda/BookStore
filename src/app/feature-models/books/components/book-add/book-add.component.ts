import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookModel } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {

  @Output() bookFormValues = new EventEmitter<any>();

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  addBook(book: BookModel){
    this.bookService.addBook(book).subscribe((bookId) => {
      this.bookFormValues.emit(bookId);
    })
  }

}
