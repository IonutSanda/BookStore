import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { BookModule } from '../../book.module';
import { BookModel } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { EditBookService } from '../../services/edit-book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  @ViewChild('booksList') booksListContent: ElementRef;

  productId:string;
  editBook: BookModel;
  editBook$: Observable<BookModel>;
  book: any;
  isShowMore: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: BookService,
    private editBookService: EditBookService
  ) { }

  ngOnInit(): void {

    this.productId = this.route.snapshot.params.id

    this.route.params
      .pipe(
        switchMap((param) => {
          this.productId = param.id;
          return this.service.getBookById(param.id);
        })
      )
      .subscribe((book) => {
        this.book = book;
        this.editBookService.setEditBook(book);
      });
      
      this.editBook$ = this.editBookService.getEditBook();

  }

  showMoreText(){
    this.isShowMore = !this.isShowMore;
  }

}
