import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookModel } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class EditBookService {

  constructor() { }

  private subject = new BehaviorSubject(<BookModel>{});
  
  setEditBook(book: BookModel){
    this.subject.next(book);
  }

  getEditBook(): Observable<BookModel>{
    return this.subject.asObservable();
  }
  
  clear(){
    this.subject.next(<BookModel>{});
  }
}
