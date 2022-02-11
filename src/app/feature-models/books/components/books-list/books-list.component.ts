import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  booksArray: any[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {

    this.bookService.getBooks().subscribe((books) => {
      this.booksArray = books;
    });

    console.log(this.booksArray);

  }

}
