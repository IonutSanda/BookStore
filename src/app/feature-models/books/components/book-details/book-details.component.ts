import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { BookLoadingService } from 'src/app/core/services/utility/book-loading.service';
import { AuthService } from 'src/app/feature-models/auth/services/auth.service';
import { BookModule } from '../../book.module';
import { BookModel } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { EditBookService } from '../../services/edit-book.service';
import { ModalService } from '../../services/modal.service';

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
  editedBookFromForm$: Observable<BookModel>;
  book: BookModel;
  isShowMore: boolean = true;
  currentBook: BookModel;
  isEditMobile: boolean = false;  
  //Change to observables and create them as async in html
  isMobile$: boolean = true;
  authSource: Observable<boolean>;
  isLoadingData$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private editBookService: EditBookService,
    private modalService: ModalService,
    private bookLoadingService: BookLoadingService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.productId = this.route.snapshot.params.id

    this.bookLoadingService.show();
    this.isLoadingData$ = this.bookLoadingService.loading$;

    this.authSource = this.authService.isCurrentUserAdmin();

    this.route.params
      .pipe(
        switchMap((param) => {
          this.productId = param.id;
          return this.bookService.getBookById(param.id);
        })
      )
      .subscribe((book) => {
        this.book = book;
        this.editBookService.setEditBook(book);
        this.bookLoadingService.hide();
      });
      
      this.editBook$ = this.editBookService.getEditBook();
      this.editedBookFromForm$ = this.modalService.bookBehaviorSubject$;

  }

  showMoreText(){
    this.isShowMore = !this.isShowMore;
  }

  onDeleteBook(){
    this.bookService.deleteBook(this.productId).subscribe(() => this.router.navigate(['books']));
  }

  setCurrentBook(book: BookModel){
    this.modalService.setBook(book);
  }

  openConfirmModal(template: TemplateRef<any>){
    this.modalService.openConfirmModal(template);
  }

  getFormValues(data: BookModel){
    this.currentBook = data;
  }

  setEditFormValues(newBook: BookModel){
    this.modalService.setBook(newBook);
  }

  submit(book: BookModel){
    this.modalService.closeConfirmModal();
    this.modalService.updatebook(this.productId,book);
  }

  openForm(template: TemplateRef<any>){
    this.modalService.openForm(template);
  }

  closeForm(){
    this.modalService.closeForm();
  }

  closeConfirmModal(){
    this.modalService.closeConfirmModal();
  }

}
