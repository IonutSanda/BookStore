  import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from '../../models/book.model';
import { CategoryModel } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { BookService } from '../../services/book.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  booksArray: BookModel[] = [];
  singleBook: BookModel;
  categories$: Observable<CategoryModel[]> = this.categoryService.getCategories();  
  categoriesName: any[] = [];

  constructor(private bookService: BookService, private categoryService: CategoryService, private modalService: ModalService) { }

  ngOnInit(): void {

    console.log(this.categories$);

    this.bookService.getBooks().subscribe((books) => {
      this.booksArray = books;
    });
  }

  addBook(id: any){
    this.modalService.closeForm();
    this.bookService.getBookById(id.name).subscribe((book) => {
      this.booksArray = [...this.booksArray, book];
    })
  }

  openForm(template: TemplateRef<any>){
    this.modalService.openForm(template);
  }

  closeForm(){
    this.modalService.closeForm();
  }

}
