import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookModel } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { EditBookService } from '../../services/edit-book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  @Input() book: BookModel;
  @Output() onEmitValues = new EventEmitter();

  private bookId: string;

  constructor(private bookService: BookService, private editBookService: EditBookService, private route: ActivatedRoute) {
    this.bookId = this.route.snapshot.params.id;
   }


  ngOnInit(): void {
  }

  updateBook(book: BookModel){
    this.bookService.editBook(this.bookId, book).subscribe((data) => {
      this.editBookService.setEditBook(book);
    })
  }

  emitValues(data: BookModel){
    this.onEmitValues.emit(data);
  }
}
