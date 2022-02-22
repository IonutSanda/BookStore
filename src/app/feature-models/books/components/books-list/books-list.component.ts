import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from '../../models/book.model';
import { CategoryModel } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { BookService } from '../../services/book.service';
import { ModalService } from '../../services/modal.service';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({height: AUTO_STYLE, visibility: AUTO_STYLE})),
      state('true', style({height: '0', visibility: 'hidden'})),
      transition('false => true', animate(100 + 'ms ease-in')),
      transition('true => false', animate(200 + 'ms ease-out'))
    ])
  ]
})
export class BooksListComponent implements OnInit {

  booksArray: BookModel[] = [];
  singleBook: BookModel;
  categories$: Observable<CategoryModel[]> = this.categoryService.getCategories();  
  categoriesName: any[] = [];
  categorySelectedArray: string[] = [];
  authors = this.bookService.getAuthors();
  authorsSelectedArray: string[] = [];
  collapsedCategories: boolean = false;
  collapsedAuthors: boolean = false;
  collapsedPrice: boolean = false;

  constructor(private bookService: BookService, private categoryService: CategoryService, private modalService: ModalService) { }

  ngOnInit(): void {

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

  onToggleCategories(){
    this.collapsedCategories = !this.collapsedCategories;
  }

  onToggleAuthors(){
    this.collapsedAuthors = !this.collapsedAuthors;
  }

  onTogglePrice(){
    this.collapsedPrice = !this.collapsedPrice;
  }

  onPropertyCheckboxChange(event: Event, property: string){
    const propertyEvent = event.target as HTMLInputElement;

    if(propertyEvent.checked){
      if(property === 'category'){
        this.categorySelectedArray = [...this.categorySelectedArray, propertyEvent.value];
      } else if (property === 'authors'){
        this.authorsSelectedArray = [...this.authorsSelectedArray, propertyEvent.value];
      }
    } else {
      if(property === 'category'){
        this.categorySelectedArray = this.categorySelectedArray.filter((e) => e !== propertyEvent.value);
      } else if (property === 'authors'){
        this.authorsSelectedArray = this.authorsSelectedArray.filter((e) => e !== propertyEvent.value);
      }
    }
  }

}
