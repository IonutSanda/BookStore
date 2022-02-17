import { Injectable, TemplateRef } from '@angular/core';
import { BookModel } from '../models/book.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { BookModule } from '../book.module';
import { BookService } from './book.service';
import { EditBookService } from './edit-book.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  newBook!: BookModel;
  formModalRef: BsModalRef;
  confirmModalRef: BsModalRef;

  private book = new BehaviorSubject(<BookModel>{});
  public bookBehaviorSubject$ = this.book.asObservable();

  constructor(private modalService: BsModalService, private bookService:BookService, private editBookService: EditBookService) { }

  openForm(template: TemplateRef<any>){
    this.formModalRef = this.modalService.show(template);
  }

  closeForm(){
    this.formModalRef.hide();
  }

  openConfirmModal(template: TemplateRef<any>){
    this.confirmModalRef = this.modalService.show(template); 
  }

  closeConfirmModal(){
    this.confirmModalRef.hide();
  }

  setBook(newBook: BookModel){
    this.book.next(newBook);
  }

  updatebook(bookId: string, book: BookModel){
    this.bookService.editBooK(bookId, book).subscribe((data) => {
      this.editBookService.setEditBook(book);
    })
  }
}
